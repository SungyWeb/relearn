import React from 'react'
import { Redirect, Switch } from 'react-router'
import RouteWithSubRoute from '../../bas-component/RouteWithSubRoute'
import { MyRoute } from '../../routes'

const Three: React.FC<{routes: MyRoute[]}> = ({routes}) => {
  console.log(routes)
  return (
    <div className="three">
      <h1>Three</h1>
      <Switch>
        {
          routes.map((route, i) => <RouteWithSubRoute key={i} {...route} />)
        }
        <Redirect to="/three/1" />
      </Switch>
    </div>
  )
}

export default Three
