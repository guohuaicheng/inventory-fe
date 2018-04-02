
import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'
import { Form, Icon, Input, Button } from 'antd'
import './login.css'
// import * as actions from '../../actions/login/login'
import axios from 'axios'

const FormItem = Form.Item

@connect((state, props) => ({
  user: state.user
})
  // ,
  // (dispatch) => ({
  //   actions: bindActionCreators(actions, dispatch)
  // })
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
      tenantName: ""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values);
      } else {
        var _this = this;
        axios({
          url: "/api/user/login",
          methos: "post",
          data: {
            username: values.username,
            password: values.password
          },
          seccess(resp) {
            if (resp && resp.data && resp.data.username) {
              sessionStorage.setItem("token", resp.data.username);
              this.props.dispatch({ type: "userInfo", userInfo: resp.data })
              hashHistory.push('/')
            }
          },
          error(e) {
            debugger;
          }
        })

      }

    });
  }

  componentDidMount() {
    var path = this.props.params.splat;
    // axios({

    // })
    this.setState({ tenantName: "xxx" })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { tenantName } = this.state;
    return (
      <div style={{ display: "table" }}>
        <div style={{ display: "table-cell", height: "100vh", width: "100vw", verticalAlign: "middle" }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('tenantIdd', {
                initialValue: { tenantName },
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input readOnly prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              )}
            </FormItem>
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
      </div>
    );
  }
}
