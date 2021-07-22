// ref: https://umijs.org/config/
const config = {
  base: '/form-making/',
  publicPath: '/form-making/',
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [{ path: '/', component: '../pages/index' }],
    },
  ],
  dva: {},
  antd: {},
};

export default config;
