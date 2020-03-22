# simple-vue-router

### 一个简单的vue的路由实现

### 1. 声明类
```js
class SimpleVueRouter {}
```

### 2. 注册install方法，接收Vue类
```js
SimpleVueRouter.install = function(_Vue) {
  // Vue是js内部的变量，_Vue是真正的Vue类
  Vue = _Vue;
}
```

### 3. 写SimpleVueRouter的构造函数，保存传进来的路由配置options，声明一个路由对应关系，声明一个Vue的实例对象用于响应式
```js

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
}
```

### 4. 在SimpleVueRouter类里新增init方法，在install方法里给Vue注册mixin，给Vue加上$router和执行init方法

```js
// 添加install方法，在Vue.use的时候会执行
SimpleVueRouter.install = function(_Vue) {
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
```

### 5. 监听浏览器的hashChange和load方法事件，当监听到的时候，修改this.app.current
```js
  initEvent() {
    // 监听浏览器的hashchange和load事件，使用bind改变this指向
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    window.addEventListener('load', this.handleHashChange.bind(this));
  }

  handleHashChange() {
    // 获取#后面的部分赋值给app的current
    this.app.current = location.hash.slice(1);
  }
```

### 6. 注册路由对应关系
```js
  initRouteMap() {
    this.$options.routes.forEach(item => {
      this.routeMap[item.path] = item;
    });
  }
```

### 7. 注册s-router-link和s-router-view组件
```js
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
```

### 8. 在init方法里分别初始化事件、路由和组件
```js
init() {
    this.initEvent();
    this.initRouteMap();
    this.registerComponents();
  }
```

### 9. 使用方法
```js
import SimpleVueRouter from './simple-vue-router';
import Vue from 'vue';
import Com1 from './components/com1';
import Com2 from './components/com2';
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

```
```html
<template>
  <div id="app">
    <s-router-link to="/com1">com1</s-router-link>
    <s-router-link to="/com2">com2</s-router-link>
    <s-router-view></s-router-view>
  </div>
</template>

<script>

export default {
  
}
</script>

<style>

</style>

```

### 整个思路流程就是，注册插件，监听浏览器的hash改变事件，当hash改变的时候，修改某个vue实例的某个属性，利用vue的响应式，使用到的地方也会改变，从而去更新router-view显示的地方
### 需要准备的知识包括：
+ 如何注册Vue插件
+ 如何注册组件
+ Vue的mixin
+ render函数的用法

### 本例只实现了使用hash的方式的实现简单的路由跳转和显示，其他方法读者有兴趣的话可以自己实现

### <a href="https://github.com/luch1994/simple-vue-router" target="_blank">github地址</a>

## 运行演示
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
