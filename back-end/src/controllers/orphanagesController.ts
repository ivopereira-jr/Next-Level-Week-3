import { Request, Response } from "express"
import { getRepository } from "typeorm"
import Orphanage from "../models/Orphanage"
import orphanageView from "../views/orphanages_view"
import * as Yup from "yup"

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    })

    return response.json(orphanageView.renderMany(orphanages))
  },
  async show(request: Request, response: Response) {
    const { id } = request.params

    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    })
    //o findone ele vai buscar pelo elemento com o mesmo id passado na roata akie no caso vai buscar um orfantato caso nao ache ele falha meio q e isso

    return response.json(orphanageView.render(orphanage))
  },
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body

    const orphanagesRepository = getRepository(Orphanage)

    const requestImages = request.files as Express.Multer.File[]
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends == "true",
      images,
    }

    //para validaçoes
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    })

    //akie e para campos que estivem com erros ai ele retorna os erros
    await schema.validate(data, {
      abortEarly: false,
    })

    const orphanage = orphanagesRepository.create(data)

    await orphanagesRepository.save(orphanage)

    return response.status(201).json(orphanage)
  },
}

//0 status 201 e para tiver criando algo e ele retorna como created caso de certo e mais voltado para semantica eh opcional tbm aii vc decide se poe ou nao
