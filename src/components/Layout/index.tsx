import { Result, Button, Layout, Menu } from 'antd'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons'
import './index.css'
import ReactMarkdown from 'react-markdown'
import { useRequest } from 'ahooks'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import routes from '../../routes'
import RouteWithSubRoute from '../../bas-component/RouteWithSubRoute'

const { Header, Content, Sider } = Layout
export default function BasicLayout() {
  const {data} = useRequest(() => fetch('/md/01.md').then(res => {
    return res.text()
  }))
  return (
    <BrowserRouter>
      <Layout className="h100">
        <Sider>
          <div className="logo">
            <Link to="/">
              <img height={32} style={{margin: 16}} src="https://www.leiue.com/uploads/2019/06/ECMAScript.png" alt="logo"/>
              <span className="logo-text">ReLearn JS</span>
            </Link>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.SubMenu key="three" icon={<UserOutlined />} title="THREE.JS">
              <Menu.Item key="1">
                <Link to="/three/1">第一章</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/three/2">第二章</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="/" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            {/* <ReactMarkdown>{data || ''}</ReactMarkdown> */}
            <Switch>
              {
                routes.map((v, i) => {
                  return <RouteWithSubRoute key={i} {...v} />
                })
              }
              <Route component={() => (
                <Result
                  status="404"
                  title="404"
                  subTitle="页面不存在"
                  extra={<Button type="primary" href="/">回到首页</Button>}
                />
              )} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}
