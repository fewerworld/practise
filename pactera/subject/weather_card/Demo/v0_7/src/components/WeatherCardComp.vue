<!-- Without the components using temporarily -->
<template>
  <div id="cList" class="wea_c">
    <!--    <h1 v-for="i in items">{{ test_text }}</h1>-->
    <div id="cList1">TestComponent</div>
    <card-component></card-component>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "WeatherCardComp",
  components:{

  },
  props: {
    desc: String,
    test_text: String
  },
  template: '<div><text>Building Weather Card Component</text></div>'
}

Vue.component('card-component',{
  el:"#cards",
  template: '<div><text>Building Weather Card Component</text></div>',
  methods:{
    funcTest(){
      alert("comp aaa")
    }
  }
});

// new Vue({
//   el:"#cList"
// })


</script>

<style scoped>
#cList {
  float: left;
  text-align: left;
  /*margin-left: 1%;*/
  margin: 0% 1% 1% 1%;
}
</style>
