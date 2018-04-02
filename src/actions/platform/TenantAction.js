import axios from 'axios'
import { URL } from '../../constants/TenantConstants'
export const getTenants = () => {
  return dispatch => {
    axios.get(URL.GET_TENANTS).then(resp => {
      dispatch({
        type: URL.GET_TENANTS,
        tenants: resp.data
      })
    }).catch(e => {

    })
  }
}