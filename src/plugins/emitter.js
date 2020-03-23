
function broadcast() {
  if (this.$children && this.$children.length) {
    const args = Array.from(arguments);
    const eventName = args[0];
    const data = args.slice(1);
    this.$children.forEach(child => {
      child.$emit(eventName, ...data);
      broadcast.apply(child, args);
    })
  }
}


export default {
  // 注册插件
  install(Vue) {
    
    Vue.prototype.$dispatch = function (eventName, data) {
      let parent = this.$parent;
      while (parent) {
        parent.$emit(eventName, data);
        parent = parent.$parent;
      }
    }

    Vue.prototype.$broadcast = function () {
      broadcast.apply(this, Array.from(arguments));
    }

  }
}

