import { Table, Icon, Divider, Button, message } from 'antd'
import axios from 'axios'

export default (options) => {

  let success = resp => {
    if (resp.headers.token) {
      sessionStorage.setItem("token", resp.headers.token)
      resp.data.token = resp.headers.token;
    }
    options.success && options.success(resp);
  }

  let error = options.error || (e => {
    message.error("server error");
  })

  if (sessionStorage.getItem("token")) {
    options.headers = {
      token: sessionStorage.getItem("token")
    }
  }
  axios(options).then(success).catch(error);
}
