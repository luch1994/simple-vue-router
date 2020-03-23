<template>
  <div>
    <h1>com2</h1>
  </div>
</template>

<script>
export default {
  name: 'component2',
  created() {
    this.$on('test', (a) => {
      console.log('component2监听test');
      console.log(a);
    });

    this.$bus.$on('busEvent', this.onBusEventHandler)
  },
  beforeDestroy() {
    this.$bus.$remove('busEvent', this.onBusEventHandler);
  },
  methods: {
    onBusEventHandler(data) {
      console.log(this);
      console.log('component2 busEvent');
      console.log(data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
