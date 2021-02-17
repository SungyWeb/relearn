import React from 'react'
import { Redirect, Switch } from 'react-router'
import RouteWithSubRoute from '../../base-component/RouteWithSubRoute'
import { MyRoute } from '../../routes'

const Three: React.FC<{routes: MyRoute[]}> = ({routes}) => {
  return (
    <div className="three" style={{height: '100%'}}>
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
