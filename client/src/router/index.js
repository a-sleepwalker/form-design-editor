import Vue from 'vue';
import Router from 'vue-router';
// import store from '../store';

Vue.use(Router);

const routes = {
  mode: 'history',
  base: '/',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/home'
    // },
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['../components/Editor.vue'], resolve)
    },
    {
      path: '/editor',
      name: 'Editor',
      component: resolve => require(['../components/Editor.vue'], resolve)
    }
  ]
};
const router = new Router(routes);
router.beforeEach((to, from, next) => {
  // console.log(to.path);
  // if (to.path.indexOf('') > -1) {
  //   if (store.state.auth.username === '') {
  //     next('/home');
  //   } else {
  //     next();
  //   }
  // }
  next();
});
router.afterEach(route => {

});
export default router;
