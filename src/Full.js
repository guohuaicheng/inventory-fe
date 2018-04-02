// 登录
export const Login = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('./pages/login/Login').default)
    }, 'Login')
}

export const Login1 = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('./pages/login/Login1').default)
    }, 'Login1')
}

export const Tenant = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('./pages/platform/tenant/Tenant').default)
    }, 'Tenant')
}

export const Datasource = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('./pages/platform/datasource/Datasource').default)
    }, 'Datasource')
}


