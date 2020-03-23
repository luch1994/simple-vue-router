<template>
  <div>
    <h1>child</h1>
    <div class="btn" @click="onDispatch">向所有祖辈dispatch</div>
    <div class="btn" @click="onBusEvent">事件总线触发事件</div>
  </div>
</template>

<script>
export default {
  name: 'child1',
  created() {
    this.$on('test', (a) => {
      console.log('child1监听test');
      console.log(a);
    })
  },
  methods: {
    onDispatch() {
      this.$dispatch('test1', '123', '254')
    },
    onBusEvent() {
      this.$bus.$emit('busEvent', 456)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
