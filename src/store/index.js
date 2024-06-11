import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0,
    url:'',
    resultPD:'',
    mixData:[
      {
        timestamp:'',
        type:''
      }
    ],
    filterInput:[
      {
        startdate:'',
        enddate:'',
        prodid:'',
        batchno:'',
        itemno:'',
        worktype:[]
      }
    ]
  },
  mutations: {
    setCount(state , value){
      state.count = value
    },
    setUrl(state , value){
      state.url = value
    },
    setData(state , newData){
      state.resultPD = newData
    }
  },
  getters:{
    getCount(state){
      return state.count
    },
    getUrl(state){
      if(typeof window !== "undefined"){
        return state.url = window.location.protocol+"//"+window.location.hostname+"/";
      }else{
        return state.url = 'test';
      }
    },
    getResultPd(state){
      return state.resultPD
    },
  },
  actions: {
    fetchDataFromDatabase(context){
      const url = context.getters.getUrl + 'intsys/pdl/pdl_backend/mainapi/checkdataworkplan';
      axios.get(url).then(res=>{
        let rsdata = [];
        // let waittime = [];
      

        if(res.data.status == "Select Data Success"){
          rsdata = res.data;

          // check Mix data
          console.log(res.data.result);
          let result = res.data.result;
          for(let i = 0; i < result.length; i++){
            console.log(result[i].resultData);
          }
          
        }
        context.commit('setData', rsdata);
      });
    }
    
  },

  
  modules: {
  }

})


