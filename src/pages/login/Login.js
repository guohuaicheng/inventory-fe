
import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory, Link, browserHistory } from 'react-router'
import { Form, Icon, Input, Button, message } from 'antd'
import './login.css'
// import * as actions from '../../actions/login/login'
import ajax from '../../utils'

const FormItem = Form.Item

@connect((state, props) => ({
})
)
@Form.create({
  onFieldsChange(props, items) {
  },
})
export default class Login extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      tenantName: "",
      tenantId: ""
    }
    this.path = "";
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values);
      } else {
        var _this = this;
        ajax({
          url: "/api/login",
          method: "post",
          data: { ...values },
          success(resp) {
            if (resp && resp.data && resp.data.username) {
              // sessionStorage.setItem("token", resp.data.username);
              _this.props.dispatch({ type: "userInfo", userInfo: resp.data })
              browserHistory.push('/')
            } else {
              message.error("用户名或密码不正确");
            }
          },
          error(e) {
            message.error("用户名或密码不正确: " + e);
          }
        })

      }

    });
  }

  componentDidMount() {
    // let isTenant = false;
    // if (this.path && this.path !== "/login") {
    //   var _this = this;
    //   ajax({
    //     url: "/api/platform/tenants/" + this.path,
    //     success(resp) {

    //     }, error(e) {
    //       _this.setState({
    //         tenantName: _this.path,
    //         tenantId: "1"
    //       })
    //     }
    //   })
    // }
  }
  render() {
    this.path = this.props.routeParams.splat;
    let isTenant = false;
    if (this.path && this.path !== "/login") {
      isTenant = true;
    }
    const { getFieldDecorator } = this.props.form;
    if (this.props.children) {
      return (
        <div>{this.props.children})</div>)
    } else {
      return (
        <div style={{ display: "table" }}>
          <div style={{ display: "table-cell", height: "100vh", width: "100vw", verticalAlign: "middle" }}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              {isTenant ? (
                <div>  <FormItem>
                  {getFieldDecorator('tenantName', {
                    initialValue: this.path,
                    rules: [{ required: true, message: '请输入用户名!' }],
                  })(
                    <Input disabled={true} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                  )}
                </FormItem>
                  <FormItem style={{ display: 'none' }}>
                    {getFieldDecorator('domainUrl', {
                      initialValue: this.path,
                    })(
                      <Input type="hidden" disabled={true} />
                    )}
                  </FormItem></div>) : ""
              }
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                )}
              </FormItem>
              <FormItem>
                {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
          </Button>
              </FormItem>
            </Form>
          </div>
        </div>)
    }
  }
}
