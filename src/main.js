import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import 'popper.js';
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
    numberToThaiText(number) {
      // ข้อความของตัวเลขภาษาไทย
      const thaiNumberText = ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
      // หน่วยของตัวเลขภาษาไทย
      const thaiUnitText = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];

      // แปลงตัวเลขเป็นสตริง
      let numberStr = number.toFixed(2).toString();

      // แยกส่วนที่เป็นบาทและสตางค์
      let [baht, satang] = numberStr.split(".");

      let thaiText = '';

      // แปลงส่วนที่เป็นบาท
      for (let i = 0; i < baht.length; i++) {
          let digit = parseInt(baht.charAt(i));
          if (digit !== 0) {
              if (i === baht.length - 1 && digit === 1 && baht.length > 1 && baht.charAt(baht.length - 2) !== '0') {
                  thaiText += "เอ็ด";
              } else if (i === baht.length - 2 && digit === 2) {
                  thaiText += "ยี่";
              } else if (i === baht.length - 2 && digit === 1) {
                  thaiText += "";
              } else {
                  thaiText += thaiNumberText[digit];
              }
              thaiText += thaiUnitText[baht.length - i - 1];
          }
      }

      // เพิ่ม "บาท" หลังจากแปลงส่วนที่เป็นบาทแล้ว
      thaiText += "บาท";

      // แปลงส่วนที่เป็นสตางค์
      if (satang && parseInt(satang) > 0) {
          let satangText = '';
          for (let i = 0; i < satang.length; i++) {
              let digit = parseInt(satang.charAt(i));
              if (digit !== 0) {
                  if (i === satang.length - 1 && digit === 1 && satang.length > 1 && satang.charAt(satang.length - 2) !== '0') {
                      satangText += "เอ็ด";
                  } else if (i === satang.length - 2 && digit === 2) {
                      satangText += "ยี่";
                  } else if (i === satang.length - 2 && digit === 1) {
                      satangText += "";
                  } else {
                      satangText += thaiNumberText[digit];
                  }
                  satangText += thaiUnitText[satang.length - i - 1];
              }
          }
          thaiText += satangText + "สตางค์";
      } else {
          thaiText += "ถ้วน";
      }

      return thaiText.trim();
    },
  //   numberToThaiText(number) {
  //     const thaiNumberText = ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
  //     const thaiUnitText = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน", "สิบล้าน", "ร้อยล้าน"];
  
  //     // แปลงตัวเลขเป็นสตริง
  //     let numberStr = number.toFixed(2).toString();
  
  //     // แยกส่วนที่เป็นบาทและสตางค์
  //     let [baht, satang] = numberStr.split(".");
  
  //     let thaiText = '';
  
  //     // แปลงส่วนที่เป็นบาท
  //     for (let i = 0; i < baht.length; i++) {
  //         let digit = parseInt(baht.charAt(i));
  //         let position = baht.length - i - 1;
  //         if (digit !== 0) {
  //             if (position === 0 && digit === 1 && baht.length > 1 && baht.charAt(baht.length - 2) !== '0') {
  //                 thaiText += "เอ็ด";
  //             } else if (position === 1 && digit === 2) {
  //                 thaiText += "ยี่";
  //             } else if (position === 1 && digit === 1) {
  //                 thaiText += "";
  //             } else {
  //                 thaiText += thaiNumberText[digit];
  //             }
  
  //             if (position === 7) {
  //                 thaiText += "ล้าน";
  //             } else if (position === 8) {
  //                 thaiText += "สิบ";
  //             } else if (position === 9) {
  //                 thaiText += "ร้อย";
  //             } else {
  //                 thaiText += thaiUnitText[position];
  //             }
  //         }
  //     }
  
  //     // เพิ่ม "บาท" หลังจากแปลงส่วนที่เป็นบาทแล้ว
  //     thaiText += "บาท";
  
  //     // แปลงส่วนที่เป็นสตางค์
  //     if (satang && parseInt(satang) > 0) {
  //         let satangText = '';
  //         for (let i = 0; i < satang.length; i++) {
  //             let digit = parseInt(satang.charAt(i));
  //             if (digit !== 0) {
  //                 if (i === satang.length - 1 && digit === 1 && satang.length > 1 && satang.charAt(satang.length - 2) !== '0') {
  //                     satangText += "เอ็ด";
  //                 } else if (i === satang.length - 2 && digit === 2) {
  //                     satangText += "ยี่";
  //                 } else if (i === satang.length - 2 && digit === 1) {
  //                     satangText += "";
  //                 } else {
  //                     satangText += thaiNumberText[digit];
  //                 }
  //                 satangText += thaiUnitText[satang.length - i - 1];
  //             }
  //         }
  //         thaiText += satangText + "สตางค์";
  //     } else {
  //         thaiText += "ถ้วน";
  //     }
  
  //     return thaiText.trim();
  // },
    getSessionStorage(){
      const getUserData = localStorage.getItem("userData");
      return getUserData ? JSON.parse(getUserData) : null;
    },
    keynumberOnly(str){
      return /^[0-9,.]*$/.test(str);
    },
    
  },
  
});


new Vue({
  router,
  store,
  VueSweetalert2,
  render: h => h(App)
}).$mount('#app')
