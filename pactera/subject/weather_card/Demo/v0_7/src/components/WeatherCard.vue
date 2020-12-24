<template>
  <div id="weather_card" class="_weather_card">
    <div id="card_list" class="cardCompsList">
      <div id="card_names" class="cardNames">
        <div id="country_name" class="displayInlineList">
          <div id="weather_sub_card" class="displayInlineList" v-for="(card,index) in optCards" :key="index">
            <select id="country_opts" v-model="card.city" @change="mdCard(card,index)">
  <!--            <option value=""></option>-->
              <option id="city_opts" v-for="country in optCountries.countries.country" :key="country.cityNo" v-bind:label="country.city" >{{country.city}}</option>
            </select>
            <WeatherCardComp :card="card"/>
<!--            <div>aaa</div>-->
          </div>
          <img :src="imgPath" v-on:click="addCard" :title="'click to add weather card on the card list board'" alt="ADD">
        </div>
        <!--        <div id="country_opt" class="countryOpt" v-for="card in cards" :key="card.country">{{card.country}}</div>-->
      </div>
    </div>
    <div id="add_btn_div" class="addBtnDiv">
      <div id="buttons" class="btnGroup">
        <button id="add_btn" class="ctrlBtn" v-on:click="addCard" :title="'click to add weather card on the card list board'"><i class="material-icons">add</i> Add Cards</button>
        <button id="refresh_btn" class="ctrlBtn" v-on:click="clearLocalStorage" :title="'click to remove all the weather cards'"><i class="material-icons">delete</i> Remove All</button>
<!--        <button id="refresh_btn" class="ctrlBtn" v-on:click="refreshAll" :title="'click to remove all the weather cards'"><i class="material-icons">refresh</i> Reload All</button>-->
      </div>
      <div id="country_list" class="countryNameList">
        <div id="aside_country_name" class="cardCountryName" v-for="(card,index) in cards" :key="index"><i id="delete_icon" class="icon material-icons" v-on:click="removeCard(card,index)">delete</i>{{card.city}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
// import WeatherCardComp from "./WeatherCardComp";
import WeatherCardComp from "./WeatherCardTest";
// import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import weatherRequest from "../datas/req/requests.json";
import imagePath from '../assets/icons/add_gry.png';
import axios from "axios";

// const card = new Vue({
//
// })

// default test hard code, could be not usable.
// eslint-disable-next-line no-unused-vars
const defaultCountries = [{city:"Melbourne",id:String(Date.now())},{city: "Sydney",id:String(Date.now())},{city: "Wollongong",id:String(Date.now())}];
// eslint-disable-next-line no-unused-vars
const defaultArr = [];
const optCountries = require('../local-datas/temp/countries-local.json')
const req_key = 'b7f30cf2ab3c48c988c7d0a8d8d13b53';
const req_lang = 'en';
const cq_urls = '/v2/city/lookup';

export default {
  name: 'WeatherCard',
  components: {
    WeatherCardComp
  },
  props: {
    desc: String,
    test_text: String,
    add_btn_tips: String
  },
  data(){
    return {
      imgPath: imagePath,
      requests: weatherRequest.requests,
      optCountries: optCountries,
      card:{
        id:"",
        city:"",
        cityNo:"",
        up_date:"",
        weather:"",
        temperature: "",
        wind:""
      },
      cards:JSON.parse(localStorage.getItem('cards')) || defaultArr,
      optCards:JSON.parse(localStorage.getItem('cards')) || defaultArr,
      selectedElem: localStorage.getItem('selected-elem') || null,
    }
  },
  created() {
    for(let i = 0; i < this.cards.length; i ++){
      let card = this.cards[i];
      // alert("第"+(i+1)+"次调用")
      WeatherCardComp.methods.queryWeather(card);
    }
  },
  methods: {
    // initialData(){
    //
    // },
    // selectCard (card) {
    //   // This will update the 'selectedCard' computed property
    //   this.selectedElem = card.city
    // },
    addCard(){
      // WeatherCardComp.methods.test();
      // alert("optCards length: "+ this.optCards.length+" & cards length: "+this.cards.length)
      if(this.optCards.length > this.cards.length){
        alert("Please use the new empty dropdown input first. \nThank you.")
        return false;
      }else{
        const time = Date.now();

        // this.card.id = String(time);
        const card = {
          id:String(time),
          city:"",
          cityNo:"",
          up_date:"",
          weather:"",
          temperature: "",
          wind:""
        }
        // alert("city no add: "+card.cityNo)
        this.optCards.push(card);
      }
    },
    mdCard(card,index){
      // alert("add in card1 "+card.city+card.id+" indexOf"+index)

      if(card.city != null || card.city !== ""){
        card.cityNo = this.queryCityNoMock(card);
        // card.cityNo = "1BABF";
        // alert("city no md: "+card.cityNo)
        WeatherCardComp.methods.queryWeather(card);
        this.cards.splice(index,1,card);
      }
      this.storeCard();
    },
    queryCityNoRemote(card){
      const use_url = cq_urls;
      axios.get(use_url,{
        params: {
          key: req_key,
          location: card.city,
          lang : req_lang
        }
      }).then(function(resp){
        const locations = resp.location;
        alert("locations: "+JSON.stringify(locations))
        const location = locations[0];
        alert("location: "+JSON.stringify(location))
        return location.id;
        // console.log(JSON.stringify(resp));
        // console.log(JSON.stringify(nowData.text));

      })
    },
    queryCityNoMock(card){
      let arr = optCountries.countries.country;
      alert("go in mock json")
      for(let i = 0; i < arr.length; i++){
        let tmpobj = arr[i];
        if(card.city === tmpobj.city){
          card.cityNo = tmpobj.cityNo;
          alert("get city no"+card.cityNo)
          break;
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    clearLocalStorage(){
      if(confirm('Caution! \nWould you like to clear all the cards?\nWarning: It may reload this page!')){
        localStorage.clear();
        this.reload();
      }
    },
    storeCard(){
      // Using localStorage from node service to store the cards data permanently, not Vuex, so we must build the node first of all.
      localStorage.setItem('cards',JSON.stringify(this.cards));
    },
    removeCard(card,index){
      // alert("index:"+this.cards.indexOf(card)+" id-index:"+index)
      // let selectedElem = card.id;
      let selectedElem = card.id;
      if (selectedElem && confirm('Delete the card?')) {
        // Remove the note in the notes array
        // const index = this.cards.indexOf(card)
        if (index !== -1) {
          this.cards.splice(index, 1)
          this.optCards.splice(index, 1)
        }
      }
      this.storeCard();
    },
    refreshAll(){
      alert("So sorry, but this function is not available now.")

    },
    send(){

    }
  },
  watch: {
    selectedId (val) {
      localStorage.setItem('selected-id', val)
    }
  },
  computed:{
    selectedCard () {
      // We return the matching note with selectedId
      return this.cards.find(card => card.id === this.selectedElem)
    },
    // eslint-disable-next-line no-unused-vars
    isRepeatCName(countryName) {
      return false;
    }
  }
}


</script>

<style scoped>
#card_list {
  /*float: left;*/
  /*text-align:left;*/
  position: absolute;
  width: 82%;
  /*margin-left: 1%;*/

}
#card_names {
  float: left;
  text-align:left;
  position: absolute;
  /*width: 82%;*/
  margin-left: 1%;
}
#country_list {
  float: bottom;
  position: relative;
  padding-right: 2%;
  z-index: 1;
}
#add_btn_div {
  float: right;
  position: relative;
  text-align: left;
  padding-right: 2%;
  width: 14%;
}
#refresh_btn {
  background: #075ff8;
  text-decoration:line-through;
}
#refresh_btn:hover {
  background: #6da8e3;
  text-decoration:line-through;
}
#country_opts {
  margin: 1% 0% 0% 1%;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  font-size: 14px;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
}

.material-icons {
  font-size: 24px;
  line-height: 1;
  vertical-align: middle;
  margin: -3px;
  padding-bottom: 1px;
}
.cardCountryName{
  padding: 3% 2% 3% 2%;
  cursor: pointer;
}
.cardCountryName:hover {
  background: #ade2ca;
}
.cardCountryName .icon {
  float: right;
}
.displayInlineList {
  /*float: inherit;*/
  display: inline-block;
  margin: 0% 0% 1% 0%;
  width: auto;
  /*display: flex;*/
  /*justify-content: space-around;*/
}
button,.ctrlBtn
{
  background: #40b883;
  color: white;
  margin: 2% 1% 6% 2%;
}
button {
  border-radius: 3px;
  border: none;
  display: inline-block;
  padding: 8px 12px;
  cursor: pointer;
}
button:hover {
  background: #63c89b;
}
</style>
