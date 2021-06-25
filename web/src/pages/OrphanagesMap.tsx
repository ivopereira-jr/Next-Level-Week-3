import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FiArrowRight, FiPlus } from "react-icons/fi"
import { Map, Marker, Popup, TileLayer } from "react-leaflet"

import mapMarkerImg from "../images/map-marker.svg"
import "../styles/pages/orphanages-map.css"
import mapIcon from "../utils/mapIcon"
import api from "../services/api"

interface Orphanage {
  id: number
  name: string
  latitude: number
  longitude: number
}

function OrphanagesMap() {
  //quando tiver uma variavel que precisa ser alterada pelo proprio componete usar o useState

  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get("orphanages").then(response => {
      setOrphanages(response.data)
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>São paulo</strong>
          <span>São jose dos campos</span>
        </footer>
      </aside>

      <Map
        center={[-23.2208413, -45.9104873]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              {/* quando fizer um map como esse usar o key e passar uma informaçao do elemento que seja unica o id e um exemplo */}
              <Popup
                closeButon={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={28} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap
