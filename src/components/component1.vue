<template>
  <div>
    <h1>com1</h1>
    <child1/>
  </div>
</template>

<script>
import Child1 from './child1'
export default {
  name: 'component1',
  components: {
    Child1
  },
  created() {
    this.$on('test', (a) => {
      console.log('component1监听test');
      console.log(a);
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
