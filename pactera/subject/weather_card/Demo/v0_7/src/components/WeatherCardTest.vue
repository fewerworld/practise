<!-- Without the components using temporarily -->
<template>
  <div id="cList" class="wea_c">
    <pre id="pre_weather_card">
      <div id="weather_card_display" v-bind="card" :key="card.cityNo">
<!--        <div id="error_msg"></div>-->

        City :        {{card.city}}
        Update Time : {{card.up_date}}
        Weather :     {{card.weather}}
        Temperature : {{card.temperature}}°C
        Wind : {{card.wind}}km/h
      </div>
      <hr style="height:1px;
               border:none;
               border-top:1px dashed #0066CC;
               margin: 0% 0% 0% 0%"/>
    </pre>
  </div>
</template>

<script>
import axios from 'axios';

// No better way over the hardcode of request url.
// eslint-disable-next-line no-unused-vars
// const urls = '/v7/weather/now';
const urls = 'https://devapi.qweather.com/v7/weather/now';

const req_key = 'b7f30cf2ab3c48c988c7d0a8d8d13b53';
const req_lang = 'en';

export default {
  name: "WeatherCardComp",
  props: {
    card:Object,
    error_msg: String,
  },
  methods:{
    // eslint-disable-next-line no-unused-vars
    queryWeather(card){
      const use_url = urls;
      axios.get(use_url,{
        params: {
          key: req_key,
          location: card.cityNo,
          lang : req_lang
        }
      }).then(resp => {
        const _data = resp.data;
        const nowData = _data.now;
        // card.up_date = this.dateFormat("W HH:MM:SS",_data["updateTime"]);
        card.up_date = _data["updateTime"];
        card.weather = nowData["text"];
        card.temperature = nowData["temp"];
        card.wind = nowData["windSpeed"];
        console.log(JSON.stringify(resp));
      }).catch(err=>{
        console.log("Caught the error: "+err)
      })
    },
    dateFormat(format,date){
      let we = date.getDay();
      const opt = {
        "Y+":date.getFullYear().toString(),
        "m+":(date.getMonth()+1).toString(),
        "d+":date.getDate().toString(),
        "H+":date.getHours().toString(),
        "M+":date.getMinutes().toString(),
        "S+":date.getSeconds().toString()
      };
      const week = {
        "0":"Sunday",
        "1":"Monday",
        "2":"Tuesday",
        "3":"Wednesday",
        "4":"Thursday",
        "5":"Friday",
        "6":"Saturday"
      };
      if(/(W+)/.test(format)){
        format = format.replace(RegExp.$1,(RegExp.$1.length >1 ? (RegExp.$1.length >2 ? '星期'+week[we] : '周'+week[we]) : week[we]))
      }
      for(let k in opt){
        let r = new RegExp("("+k+")").exec(format);
        if(r){

          format = format.replace(r[1],(RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length,'0')))
        }
      }
      return format;
    }
  },
}

</script>

<style scoped>
#cList {
  float: left;
  text-align: left;
  display: flex;
  /*margin-left: 1%;*/
  margin: 0% 1% 1% 1%;
}
#pre_weather_card {
  /*border: 1px #00050a solid;*/
}
#weather_card_display {
  /*border: 1px #00050a solid;*/
}
/*#comps {
  float: left;
  text-align: left;
  !*position: absolute;*!
  width: 82%;
  !*margin-left: 1%;*!
  margin: 0% 1% 1% 1%;
}*/
</style>
