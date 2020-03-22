let Vue;

class SimpleVueRouter {
  constructor(options) {
    this.$options = options;

    this.routeMap = {};

    this.app = new Vue({
      data() {
        return {
          current: '/'
        }
      }
    });

  }

  init() {
    this.initEvent();
    this.initRouteMap();
    this.registerComponents();
  }

  initEvent() {
    // 监听浏览器的hashchange和load事件，使用bind改变this指向
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    window.addEventListener('load', this.handleHashChange.bind(this));
  }

  handleHashChange() {
    // 获取#后面的部分赋值给app的current
    this.app.current = location.hash.slice(1) || '/';
  }

  initRouteMap() {
    this.$options.routes.forEach(item => {
      this.routeMap[item.path] = item;
    });
  }

  registerComponents() {
    Vue.component('s-router-link', {
      props: {
        to: String
      },
      render: function (h) {
        return h('a', { attrs: { href: `#${this.to}` } }, this.$slots.default);
      }
    });

    Vue.component('s-router-view', {
      render: h => {
        // 此处使用箭头函数，为了让this指向当前router实例而不是vue实例
        const com = this.routeMap[this.app.current].component;
        return h(com)
      }
    });
  }

}

// 添加install方法，在Vue.use的时候会执行
SimpleVueRouter.install = function (_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      /**
       * this是Vue的实例对象
       * this.$options是new Vue()的时候传入的参数
       * 只有main.js才会有router这个项，所以if只会进入一次
       *  */
      if (this.$options.router) {
        this.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  });
}



export default SimpleVueRouter;