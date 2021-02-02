import { RouteProps } from 'react-router'
import Three from '../pages/Three'
import Three01 from '../pages/Three/01'
import Three02 from '../pages/Three/02'
import Welcome from "../pages/Welcome"

export interface MyRoute extends RouteProps {
  routes?: MyRoute[]
}

const routes: MyRoute[] = [
  {
    path: '/',
    component: Welcome,
    exact: true,
  },
  {
    path: '/three',
    component: Three,
    routes: [
      {
        path: '/three/1',
        component: Three01,
      },
      {
        path: '/three/2',
        component: Three02,
      },
    ]
  },

]

export default routes