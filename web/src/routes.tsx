import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Landing from "./pages/Landing"
import OrphanagesMap from "./pages/OrphanagesMap"
import Orphanage from "./pages/Orphanage"
import CreateOrphanage from "./pages/CreateOrphanage"

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />

        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  )
}

/* o exact vai so na primeira rota e para evitar conflitos e so chamar outras rotas for igual a que esta sendo chamada sem ele quando vc entra en outras rotas pode acabar aparencendo conteudo de duas rotas diferents ao mesmo tempo */

/* switch serve para que so uma rota seja chamada ao mesmo tempo */

export default Routes
