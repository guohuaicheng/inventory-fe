import { URL } from '../constants/TenantConstants'
export const tenant = (state = { tenants: [] }, action) => {
  switch (action.type) {
    case URL.GET_TENANTS:
      state.tenants = action.tenants;
      return { ...state };
    default:
      return state;
  }
}