<template>
  <div id="printpo">
    <iframe id="pdfViewer" width="100%" height="600px" frameborder="0"></iframe>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'
export default {
    name:"Printpo",
    data() {
        return {
            userData:this.getSessionStorage(),
            url:this.getUrl(),
            details:[],
            userSend:'',
            ecodeSend:'',
        }
    },
   props:[
    'podetailItem_prop',
    'areaid_prop',
    'userrequest',
    'datetimereq',
    'executive',
    'formno',
    'datainvest',
    'userpostMgr',
    'datetimepostMgr',
    'memo_pur_prop',
    'userpost_pur',
    'datetime_pur',
    'poemail'
   ],
   methods: {
    getdataDetail()
    {
        if(this.areaid_prop != "" && this.podetailItem_prop.purchid != "" && this.podetailItem_prop.purchaseorderid){
            const formdata = new FormData();
            formdata.append('areaid' , this.areaid_prop);
            formdata.append('pono' , this.podetailItem_prop.purchid);
            formdata.append('purchaseorderid' , this.podetailItem_prop.purchaseorderid);
            axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/getdataDetail' , formdata , {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let result = res.data.result;
                    this.details = result;
                    this.before_sendtovender()
                }
            });
        }
    },
    send_tovender()
    {
        if(this.details && this.podetailItem_prop){
            this.userSend = this.userData.Fname+' '+this.userData.Lname;
            this.ecodeSend = this.userData.ecode;
            const formdata = new FormData();
            formdata.append("details" , JSON.stringify(this.details));
            formdata.append("main" , JSON.stringify(this.podetailItem_prop));
            formdata.append("taxid" , this.getTaxid);
            formdata.append("executive" , JSON.stringify(this.executive));
            formdata.append("userrequest" , this.userrequest);
            formdata.append("datetimereq" , this.datetimereq);
            formdata.append("formno" , this.formno);
            formdata.append("userSend" , this.userSend);
            formdata.append("ecodeSend" , this.ecodeSend);
            formdata.append('userpostMgr' , this.userpostMgr);
            formdata.append('datetimepostMgr' , this.mgrDate);
            formdata.append('memo_pur' , this.memo_pur_prop);
            formdata.append('poemail' , this.poemail);
            formdata.append('dataareaid' , this.areaid_prop);
            axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/pdf/send_po', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            }).then(res => {
                // const base64Data = res.data;
                // const binaryString = window.atob(base64Data);
                // const len = binaryString.length;
                // const bytes = new Uint8Array(len);
                // for (let i = 0; i < len; i++) {
                //     bytes[i] = binaryString.charCodeAt(i);
                // }
                // const pdfBlob = new Blob([bytes], { type: 'application/pdf' });

                // // Create URL for the blob
                // const pdfUrl = URL.createObjectURL(pdfBlob);

                // // Open PDF in a new tab or prompt download
                // window.open(pdfUrl, '_blank');


                if(res.data.status == "Send Data Success"){
                    //code
                    Swal.fire({
                        title: 'ส่งข้อมูลสำเร็จ',
                        icon: 'success',
                        showConfirmButton: false,
                        timer:1000
                    }).then(function(){
                        //
                        location.reload();
                    });
                }
            }).catch(err => {
                console.error('Error downloading PDF:', err);
            });
        }
    },
    before_sendtovender()
    {
        if(this.details && this.podetailItem_prop){
            this.userSend = this.userData.Fname+' '+this.userData.Lname;
            this.ecodeSend = this.userData.ecode;
            const formdata = new FormData();
            formdata.append("details" , JSON.stringify(this.details));
            formdata.append("main" , JSON.stringify(this.podetailItem_prop));
            formdata.append("taxid" , this.getTaxid);
            formdata.append("executive" , JSON.stringify(this.executive));
            formdata.append("userrequest" , this.userrequest);
            formdata.append("datetimereq" , this.datetimereq);
            formdata.append("formno" , this.formno);
            formdata.append("userSend" , this.userSend);
            formdata.append("ecodeSend" , this.ecodeSend);
            formdata.append('userpostMgr' , this.userpostMgr);
            formdata.append('datetimepostMgr' , this.mgrDate);
            formdata.append('memo_pur' , this.memo_pur_prop);
            axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/pdf/send_po_preview', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                const pdfBase64 = response.data;
                const pdfViewer = document.getElementById('pdfViewer');
                pdfViewer.src = 'data:application/pdf;base64,' + pdfBase64;
            })
            .catch(error => {
                console.error('Error fetching PDF:', error);
            });
        }
    }
   },
   created() {

   },
   mounted() {
    // this.getdataDetail();
   },
   computed:{
    getTaxid()
    {
        if(this.areaid_prop == "sln"){
            return "0107551000282"+" "+"( สำนักงานใหญ่ )";
        }else if(this.areaid_prop == "ca"){
            return "0115555007662";
        }else{
            return "";
        }
    },
    mgrDate()
    {
        return moment(this.datetimepostMgr).format('DD-MM-YYYY');
    }
   },
   watch: {
        podetailItem_prop: {
            handler() {
                this.getdataDetail();
            },
            immediate: true,
            deep: true
        },
        // details: {
        //     handler() {
        //         this.before_sendtovender()
        //     },
        //     immediate: true,
        //     deep: true
        // }
    },
}
</script>

<style>

</style>