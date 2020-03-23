class Bus {
  constructor() {
    this.onCache = {};
    this.emitCache = {};
    this.paramCache = {};
  }

  $on(eventName, handler) {
    if (!this.onCache[eventName]) {
      this.onCache[eventName] = [];
    }
    this.onCache[eventName].push(handler);
    if (this.paramCache[eventName]) {
      handler(...this.paramCache[eventName])
    }
  }

  $emit(eventName, ...data) {
    if (this.onCache[eventName]) {
      this.onCache[eventName].forEach(fn => {
        fn(...data);
      });
    }
    this.paramCache[eventName] = data;
  }

  $remove(eventName, fn) {
    if (this.onCache[eventName]) {
      if (fn) {
        for(let i = 0, len = this.onCache[eventName].length; i < len; i++) {
          if (fn === this.onCache[eventName][i]) {
            this.onCache[eventName].splice(i, 1);
            break;
          }
        }
      } else {
        this.onCache[eventName] = undefined;
        this.paramCache[eventName] = undefined;
        this.$emitCache[eventName] = undefined;
      }
    }
  } 

}

Bus.install = function(Vue) {
  Vue.prototype.$bus = new Bus();
}

export default Bus;