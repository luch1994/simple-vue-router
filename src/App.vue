<template>
  <div id="app">
    <s-router-link to="/com1">com1</s-router-link>
    <s-router-link to="/com2">com2</s-router-link>
    <div class="btn" @click="onBroadCast">向所有子组件广播</div>
    <s-router-view></s-router-view>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$on('test1', (args) => {
      console.log('app监听test1');
      console.log(args)
    });

    this.$bus.$on('busEvent', data => {
      console.log('app busEvent');
      console.log(data);
    })
  },
  mounted() {},
  methods: {
    onBroadCast() {
      this.$broadcast('test', 1);
    }
  }
};
</script>

<style>
.btn {
  display: inline-block;
  padding: 5px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px 0;
}
</style>
