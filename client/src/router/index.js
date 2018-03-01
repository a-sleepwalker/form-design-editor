import Vue from 'vue';
import Router from 'vue-router';
// import store from '../store';

Vue.use(Router);

const routes = {
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/home',
      name: 'home'
    }
  ]
};
const router = new Router(routes);
router.beforeEach((to, from, next) => {
  next();
});
router.afterEach(route => {

});
export default router;
