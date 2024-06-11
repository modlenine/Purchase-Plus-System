import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'popper.js';
import 'bootstrap';

import 'datatables.net-bs4';
import 'moment';

import "zebra_datepicker/dist/css/default/zebra_datepicker.min.css";
import "zebra_datepicker/dist/zebra_datepicker.min.js";




import 'highcharts';
// import 'highcharts/modules/drilldown.js';


Vue.config.productionTip = false

Vue.mixin({
  methods: {
    getUrl(){
      if(typeof window !== "undefined"){
          return window.location.protocol+"//"+window.location.hostname+"/";
      }
    },
    baseUrl(){
      switch (process.env.NODE_ENV) {
          case 'production': return '/intsys/purchaseplus/'
          case 'development': return '/'
          default: return ''
      }
    },
    formValidate()
    {
      window.addEventListener('click', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
            Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                }, false);
            });
        }, false);
    },
    conMonth(i)
    {
      let monthName = '';
      switch(i){
        case "01":
          monthName = "มกราคม";
          break;
        case "02":
          monthName = "กุมภาพันธ์";
          break;
        case "03":
          monthName = "มีนาคม";
          break;
        case "04":
          monthName = "เมษายน";
          break;
        case "05":
          monthName = "พฤษภาคม";
          break;
        case "06":
          monthName = "มิถุนายน";
          break;
        case "07":
          monthName = "กรกฎาคม";
          break;
        case "08":
          monthName = "สิงหาคม";
          break;
        case "09":
          monthName = "กันยายน";
          break;
        case "10":
          monthName = "ตุลาคม";
          break;
        case "11":
          monthName = "พฤศจิกายน";
          break;
        case "12":
          monthName = "ธันวาคม";
          break;
      }

      return monthName;
    },
    numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    conAreaidToFullname(dataareaid){
      if(dataareaid != ""){
        let fullname = '';
        switch(dataareaid){
          case "sln":
              fullname = "Salee Colour";
              break;
          case "ca":
              fullname = "Composite Asia";
              break;
          case "st":
              fullname = "Subterra";
              break;
          case "tbb":
              fullname = "The bubbles";
              break;
        }

        return fullname;
      }
    },
    
  },
  
});


new Vue({
  router,
  store,
  VueSweetalert2,
  render: h => h(App)
}).$mount('#app')
