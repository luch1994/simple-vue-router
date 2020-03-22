import SimpleVueRouter from './simple-vue-router';
import Vue from 'vue';
import Com1 from './components/component1';
import Com2 from './components/component2';
import Home from './components/home';

Vue.use(SimpleVueRouter);

export default new SimpleVueRouter({
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/com1',
    component: Com1
  }, {
    path: '/com2',
    component: Com2
  }]
});
