
import React, { Component } from 'react'
import { Link } from 'react-router'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import Aside from "../aside/Aside"
import './main.css'

export default class App extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      collapsed: false, // 左侧导航菜单是否mini模式
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {

  }

  componentWillMount() {

  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { location, children } = this.props
    const pathname = location.pathname;
    var breadcrumbs = [];
    if (pathname === "") {
      breadcrumbs.push(<Breadcrumb.Item key="main">
        首页
      </Breadcrumb.Item>);
    } else {
      breadcrumbs.push(<Breadcrumb.Item key="main">
        <Link to="/">
          首页
        </Link>
      </Breadcrumb.Item>);
    }

    if (pathname !== "") {
      var paths = pathname.split("\/");
      for (var i = 0, l = paths.length; i < l; i++) {
        var path = "/";
        if (i === 0) {
          path += paths[i];
        } else {
          for (var m = 0, ml = i; m < ml; m++) {
            path += paths[m] + "/";
          }
          path.substring(0, path.length - 2);
        }
        if (i === paths.length - 1) {
          breadcrumbs.push(
            <Breadcrumb.Item key={i}>
              {paths[i]}
            </Breadcrumb.Item>);
        } else {
          breadcrumbs.push(
            <Breadcrumb.Item key={i}>
              <Link to={path}>
                {paths[i]}
              </Link>
            </Breadcrumb.Item>);
        }

      }
    }

    const contentLayout = this.state.collapsed ? { marginLeft: 80 } : { marginLeft: 256 };
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Aside collasped={this.state.collapsed} pathname={pathname} />
        <Layout className="app-animation" style={contentLayout}>
          <Header style={{ position: 'fixed', width: '100%', background: '#fff', padding: 0 }}>
            <Icon
              className="sider-trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Layout style={{ padding: '0 24px 24px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {
                breadcrumbs
              }
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout >
    )
  }
}
