import React from "react"
import { Route } from "react-router"
import { MyRoute } from "../routes"

const RouteWithSubRoute: React.FC<MyRoute> = route => {
  const Comp = route.component
  return (
    <Route
      exact={!!route.exact}
      path={route.path}
      render={routeProps => {
        // @ts-ignore
        return <Comp {...routeProps} routes={route.routes} />
      }}
    />
  )
}
export default RouteWithSubRoute