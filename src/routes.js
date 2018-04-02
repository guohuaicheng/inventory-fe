import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import hashHistory from './history'

import * as Pages from './Full'
import App from '../src/components/main/Main'
import Welcome from './pages/welcome'


/* 进入路由的判断 */
function isLogin(nextState, replaceState) {
  const token = sessionStorage.getItem('token')
  if (!token) {
    replaceState('/login')
    // hashHistory.push('/login')
  }
}

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={isLogin}>
      <IndexRoute component={Welcome} />
      <Route path="/tenant" getComponent={Pages.Tenant}></Route>
      <Route path="/datasource" getComponent={Pages.Datasource}></Route>
    </Route>
    <Route path="/login" getComponent={Pages.Login}>
      <Route path="/shop*" getComponent={Pages.Login} />
    </Route>
    {/* <Route path="/aaa" getComponent={Pages.Login1}>
    </Route> */}
  </Router>
)

// export default routes
