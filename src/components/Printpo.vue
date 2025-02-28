<template>
  <div id="printpo">
    <!-- <div class="row">
        <div class="col-md-6 text-left">
            <h6>{{podetailItem_prop.deliveryname}}</h6>
            <p>
                {{podetailItem_prop.deliveryaddress}}
            </p>
            <p>
                Tel : (66)0-23232601-8
            </p>
        </div>
        <div class="col-md-6 text-right">
            
            <h6>PC-F-002-02-25-03-67</h6>
            <h3 class="mt-3">ใบสั่งซื้อ</h3>
            <h5>Purchase Order</h5>
        </div>
        <div class="col-md-12 text-center">
            <span>เลขประจำตัวผู้เสียภาษี / Taxid. {{getTaxid}}</span>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-md-6">
            <p><b>ผู้จำหน่าย / Vender : </b>{{podetailItem_prop.vendid}}</p>
            <p>
                <span>{{podetailItem_prop.vendname}}&nbsp;{{podetailItem_prop.vendaddress}}</span><br>
                <span>Tel. {{podetailItem_prop.vendphone}}&nbsp;&nbsp;{{podetailItem_prop.vendfax}}</span>
            </p>
        </div>
        <div class="col-md-6">
            <p><b>เลขที่ใบสั่งซื้อ / No. : </b>{{podetailItem_prop.purchid}}</p>
            <p><b>วันที่ / Date : </b>{{podetailItem_prop.bpc_documentdate}}</p>
            <p><b>เครดิต / Credit : </b>{{podetailItem_prop.payment}}</p>
            <p><b>วันที่รับของ / Delivery Date : </b>{{podetailItem_prop.deliverydate}}</p>
            <p><b>แผนกที่สั่งซื้อ / Request Dept : </b>{{podetailItem_prop.description}}</p>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8">
            <p><b>หมายเหตุ / Remark : </b>กรุณาเซ็นต์ยืนยันแล้วส่งกลับมาที่ purchase@saleecolour.com</p>
        </div>
        <div class="col-md-4 text-right">
            <p><b>PR No. </b>{{podetailItem_prop.bpc_purchasereqno}}</p>
        </div>
    </div>
    <hr>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>ลำดับ</th>
                <th>รหัสสินค้า</th>
                <th>รายการสินค้า</th>
                <th>จำนวน</th>
                <th>ราคาต่อหน่วย</th>
                <th>ส่วนลด</th>
                <th>จำนวนเงิน</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item , index) in details" :key="index">
                <td>{{index+1}}</td>
                <td>{{item.itemid}}</td>
                <td>{{item.name}}</td>
                <td>{{Number(item.qty)}}</td>
                <td>{{Number(item.purchprice).toLocaleString(undefined,{minimumFractionDigits:2 , maximumFractionDigits:2})}}</td>
                <td>{{Number(item.discamount)}}</td>
                <td>{{Number(item.lineamount).toLocaleString(undefined,{minimumFractionDigits:2 , maximumFractionDigits:2})}}</td>
            </tr>
        </tbody>
    </table>
    <div class="row">
        <div class="col-md-12">
            {{podetailItem_prop.bpc_remark}}
        </div>
        <div class="col-md-12">
            <b>ระเบียบการวางบิล-รับเช็ค และวันหยุดประจำปี : https://intranet.saleecolour.com/intranet/holidaylastyear.html</b>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-md-6">
            <p>
                กรุณายืนยันการจัดส่งสินค้ามายังบริษัทฯ เมื่อได้รับใบสั่งซื้อฉบับนี้ และแนบหลักฐานฉบับนี้ มาพร้อมกับใบแจ้งหนี้เพื่อเรียกเก็บเงินจากบริษัทฯ
            </p>
            <p>
                Please confirm your delevery schedule to us when this order and attach this P.O. with your invoice for collection.
            </p>
            <div>
                {{podetailItem_prop.slc_amtintext}}
            </div>
        </div>
        <div class="col-md-6">
            <div class="row">
                <div class="col-md-6 text-right">
                    <span><b>รวมเงิน / Sub Toal</b></span>
                </div>
                <div class="col-md-6 text-right">{{Number(podetailItem_prop.salesorderbalance).toLocaleString(undefined , {minimumFractionDigits:2 , maximumFractionDigits:2})}}</div>
            </div>
            <div class="row mt-1">
                <div class="col-md-6 text-right">
                    <span><b>ส่วนลด / Discount</b></span>
                </div>
                <div class="col-md-6 text-right">{{Number(podetailItem_prop.sumlinedisc).toLocaleString(undefined , {minimumFractionDigits:2 , maximumFractionDigits:2})}}</div>
            </div>
            <div class="row mt-1">
                <div class="col-md-6 text-right">
                    <span><b>ยอดคงเหลือ / Balance</b></span>
                </div>
                <div class="col-md-6 text-right">{{Number(podetailItem_prop.salesorderbalance).toLocaleString(undefined , {minimumFractionDigits:2 , maximumFractionDigits:2})}}</div>
            </div>
            <div class="row mt-1">
                <div class="col-md-6 text-right">
                    <span><b>ภาษีมูลค่าเพิ่ม / Vat</b></span><span v-if="Number(podetailItem_prop.sumtax) !== 0" class="ml-2">7.0%</span>
                </div>
                <div class="col-md-6 text-right">{{Number(podetailItem_prop.sumtax).toLocaleString(undefined , {minimumFractionDigits:2 , maximumFractionDigits:2})}}</div>
            </div>
            <div class="row mt-1">
                <div class="col-md-6 text-right">
                    <span><b>เป็นเงินทั้งสิ้น / Grand Total</b></span>
                </div>
                <div class="col-md-6 text-right">{{Number(podetailItem_prop.amount).toLocaleString(undefined , {minimumFractionDigits:2 , maximumFractionDigits:2})}}</div>
            </div>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-md-4 text-center">
            <span>ผู้ขาย</span><br>
            <span>Vender Acknowledgement</span>
            <div class="mt-5">
                ______________________________________
            </div>
            <div class="mt-2">วันที่ / Date :________________________________</div>
        </div>
        <div class="col-md-4 text-center">
            <span>ผู้ขอซื้อ</span><br>
            <span>Verify Signature</span>
            <div class="h-50 d-flex justify-content-center align-items-center">
                {{userrequest}}
            </div>
            <div class="mt-2">วันที่ / Date : {{datetimereq}}</div>
        </div>
        <div class="col-md-4 text-center">
            <span>ผู้มำอำนาจลงนาม</span><br>
            <span>Authorize Signature</span><br>
            <span>{{userpostMgr}} ( {{mgrDate}} )</span>
            <div class="mt-2" v-for="(item , index) in executive" :key="index">
                <span>{{item.apv_approve_user}}&nbsp;( {{item.apv_approve_datetime}} )</span><br>
            </div>
        </div>
    </div>
    <hr> -->
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