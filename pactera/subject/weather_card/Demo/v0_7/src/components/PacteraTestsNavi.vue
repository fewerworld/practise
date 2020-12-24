<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="copy_content" class="copyContent">
      <div class="auther_desc">{{auther_desc}}</div>
<!--      <div id="read_me" class="naviReadMe">ReadMe</div>-->
    </div>
    <hr style="height:1px;
               border:none;
               border-top:1px dashed #0066CC;
               margin: 1% 1% 2% 1%"/>
  </div>
</template>

<script>
export default {
  name: "PacteraTestsNavi",
  props: {
    msg: String,
    auther_desc: String,
    read_me: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /*display: inline-block;*/
  margin: 40px 10px;
  /*text-align: left;*/
}
a {
  color: #42b983;
}
.auther_desc {
  text-align: right;
  padding-right: 10%;
  font-style: italic;
  font-weight: bold;
  font-size: small;
}

#read_me, .naviReadMe {
  text-align: right;
  display: inline-block;

}
</style>
