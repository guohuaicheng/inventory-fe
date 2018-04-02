import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { Link } from 'react-router'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collasped: props.collapsed,
      menus: [
        {
          id: "1",
          path: "/",
          name: "首页"
        },
        {
          id: "2",
          name: "租户管理",
          children: [
            {
              parentId: "2",
              id: "3",
              path: "/tenant",
              name: "租户管理"
            },
            {
              parentId: "2",
              id: "4",
              path: "/datasource",
              name: "数据源管理"
            }
          ]
        }
      ]
    }
  }

  toggleCollapsed = () => {
    this.setState({
      collasped: !this.state.collapsed,
    });
  }

  buildMenu(menu) {
    if (menu.children) {
      var cd = [];
      for (var i = 0, l = menu.children.length; i < l; i++) {
        cd.push(this.buildMenu(menu.children[i]));
      }
      return <SubMenu key={menu.id} title={<span><Icon type="appstore" /><span>{menu.name}</span></span>}>
        {cd}
      </SubMenu>
    } else {
      return <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type="desktop" />
          <span>{menu.name}</span>
        </Link>
      </Menu.Item>
    }
  }

  buildMenus(menus) {
    var ms = [];
    for (var i = 0, l = menus.length; i < l; i++) {
      ms.push(this.buildMenu(menus[i]));
    }
    return ms;
  }

  findParentMenuIdByPath(menus, path) {
    for (var i = 0, l = menus.length; i < l; i++) {
      var menu = menus[i];
      if (menu.path === path) {
        return menu.parentId;
      } else if (menu.children) {
        return this.findParentMenuIdByPath(menu.children, path);
      }
    }
    return;
  }

  render() {
    var pathname = this.props.pathname;
    var openKeys = [];
    var parentKey = this.findParentMenuIdByPath(this.state.menus, pathname);
    if (parentKey !== undefined && parentKey !== null) {
      openKeys.push(String(parentKey));
    }
    return (
      <Sider
        width='256'
        breakpoint="lg"
        collapsedWidth="80"
        trigger={null}
        collapsible
        collapsed={this.props.collasped}
        style={{ position: 'fixed', height: '100vh', left: 0 }}
      >
        <div className="app-logo" />
        <Menu
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={[pathname]}
          selectedKeys={[pathname]}
          mode="inline"
          theme="dark"
        >
          {
            this.buildMenus(this.state.menus)
          }
        </Menu>
      </Sider>
    );
  }
}

export default App