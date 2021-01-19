import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons'
import './index.css'
import ReactMarkdown from 'react-markdown'
import { useRequest } from 'ahooks'
import X6 from '../X6'

const { Header, Content, Sider } = Layout
export default function BasicLayout() {
  const {data, loading, error} = useRequest(() => fetch('/md/01.md').then(res => {
    return res.text()
  }))
  return (
    <Layout className="h100">
      <Sider>
        <div className="logo">
          <img height={32} style={{margin: 16}} src="https://www.leiue.com/uploads/2019/06/ECMAScript.png" alt="logo"/>
          <span className="logo-text">ReLearn JS</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>

        </Header>
        <Content>
          <ReactMarkdown>{data || ''}</ReactMarkdown>
          {/* <X6 /> */}
        </Content>
      </Layout>
    </Layout>
  )
}
