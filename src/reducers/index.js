import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { user } from "./UserReducer"
import { tenant } from "./TenantReducer"

const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  user,
  tenant
});

export default rootReducer;
