<template>
  <div id="Popage">
        <div class="modal fade" id="showPoDetail_modal" tabindex="-1" role="dialog" aria-labelledby="previewModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="previewModalLabel">Preview</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeShowPoDetail">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <Printpo
                        ref="printpoComponent"
                        :podetailItem_prop="this.podetailItem"
                        :areaid_prop="this.areaid_prop"
                        :userrequest="this.userrequest"
                        :datetimereq="this.datetimereq"
                        :datainvest="this.datainvest"
                        :executive="this.executive"
                        :formno="this.formno"
                        :userpostMgr="this.userpostMgr"
                        :datetimepostMgr="this.datetimepostMgr"
                        :memo_pur_prop="this.memo_pur_prop"
                        :userpost_pur="this.userpost_pur"
                        :datetime_pur="this.datetime_pur"
                        :poemail="this.poemail"
                    />
                </div>
                <div class="modal-body">
                    <div class="row form-gro">
                        <div class="col-md-12 form-group">
                            <label for=""><b>PO Vendor Email : </b></label>
                            <input type="tel" name="" id="" class="form-control" v-model="poemail">
                            <p v-if="poemail == ''" class="textRequest mt-2">กรุณาระบุ Email ที่ต้องการส่ง PO</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeShowPoDetail">Close</button>
                    <button type="button" class="btn btn-info" @click="getSendToVendorHistory(podetailItem.purchid , podetailItem.purchorderdocnum , formno)">ประวัติการส่ง Email</button>
                    <button v-if="poindex === 0 && poemail != ''" type="button" class="btn btn-warning" @click="printPo">ส่ง Po</button>
                </div>
            </div>
            </div>
        </div>

        <div class="modal fade" id="showSendEmailHistory_modal" tabindex="-1" role="dialog" aria-labelledby="previewModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="previewModalLabel">Send Email History</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeShowEmailHistory">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <div class="row form-group">
                        <div class="col-md-">
                            <div class="list-group ulDiv_emailHis"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    
                </div>
            </div>
            </div>
        </div>

    <div class="row">
        <div class="col-xl-12 mb-30">
            <div class="card-box height-100-p pd-20">
                <div class="row form-group">
                    <div class="col-md-12 text-center">
                        <h5>ข้อมูล PO</h5>
                    </div>
                </div>
                <hr>
                <div class="row form-group" v-for="(item , index) in podataList" :key="index">
                    <div class="col-md-12 d-flex justify-content-center form-group">
                        <div class="card card-box poCard" @click="getdata_detailPo(item , index)"  :class="{ 'highlight-card': index === 0}">
							<div class="card-body">
								<h5 class="card-title">เลขที่ PO : {{item.purchid}}</h5>
								<p class="card-text">เวอร์ชั่น : {{item.purchorderdocnum}} <span class="ml-3" v-if="item.bpc_purchasereqno != ''"><b>เลขที่ PR : </b>{{item.bpc_purchasereqno}}</span></p>
                                <div class="row">
                                    <div class="col-md-6">
                                        <span><b>Document Data : </b>{{item.bpc_documentdate}}</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span><b>Date : </b>{{item.purchorderdate}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <span><b>Amount Currency : </b>{{Number(item.amount).toLocaleString(undefined , {minimumFractionDigits:2 , maximumFractionDigits:2})}}</span>
                                    </div>
                                </div>
                                <!-- ✅ แสดงสถานะที่ดึงจาก API -->
                                <div class="email-status" v-if="sendEmailStatuses[index]">
                                    <span>
                                        {{ sendEmailStatuses[index] }}
                                    </span>
                                    <!-- <span v-else>⏳ Checking...</span> -->
                                </div>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {Modal} from 'bootstrap'; // นำเข้าเฉพาะ Modal component จาก Bootstrap
import Printpo from '@/components/Printpo.vue'
import Swal from 'sweetalert2'
export default {
    name:"popage",
    data() {
        return {
            userData:this.getSessionStorage(),
            url:this.getUrl(),
            pono:this.pono_prop,
            areaid:this.areaid_prop,
            prno:this.prno_prop,
            department:this.department_prop,
            podataList:[],
            podetailItem:[],
            userrequest:'',
            executive:[],
            poindex:0,
            datainvest:'',
            poemail:'',
            sendEmailStatuses:{}
        }
    },
    components:{
        Printpo
    },
    props:[
        'pono_prop',
        'prno_prop',
        'areaid_prop',
        'department_prop',
        'formno',
        'ecode',
        'datetimereq',
        'userpostMgr',
        'datetimepostMgr',
        'memo_pur_prop',
        'userpost_pur',
        'datetime_pur'
    ],
    methods: {
        async getdata_po()
        {
            if(this.pono != "" && this.areaid != "" && this.prno != "" && this.department != ""){
                const formdata = new FormData();
                formdata.append('pono' , this.pono);
                formdata.append('prno' , this.prno);
                formdata.append('areaid' , this.areaid);
                formdata.append('department' , this.department);
                axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/getdata_po' , formdata , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        this.podataList = res.data.resultPoMain;

                        // ✅ เรียก checkSendEmailHistory สำหรับแต่ละ PO
                        this.podataList.forEach((item, index) => {
                            this.checkSendEmailHistory(item.purchid, item.purchorderdocnum, this.formno, index);
                        });
                    }
                });
            }
        },
        getdata_detailPo(item , index)
        {
            this.podetailItem = item;
            this.poindex = index;
            this.getUserRequest();
            this.poemail = item.email;
            //code
            const myModal = new Modal(document.getElementById('showPoDetail_modal'), {
                keyboard: false,
                backdrop: 'static'
            });
            myModal.show();
        },
        closeShowPoDetail()
        {
            const myModalEl = document.getElementById('showPoDetail_modal');
            const modal = Modal.getInstance(myModalEl);
            modal.hide();
        },
        getUserRequest()
        {
            if(this.ecode != "" && this.formno != ""){
                const formdata = new FormData();
                formdata.append('ecode' , this.ecode);
                formdata.append('formno' , this.formno);
                axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/getUserRequest' , formdata , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        let result = res.data.result;
                        let approveUser = res.data.approveUser;
                        let invest = res.data.invest;
                        console.log(result);
                        this.userrequest = result;
                        this.executive = approveUser;
                        this.datainvest = invest;
                    }
                });
            }
        },
        printPo() {
            let resultCheckEmail = this.validateEmails(this.poemail);
            if(resultCheckEmail == false){
                Swal.fire({
                    title: 'กรุณาตรวจสอบ Email ',
                    icon: 'error',
                    showConfirmButton: true,
                    // timer:1000
                });
            }else{
                this.$refs.printpoComponent.send_tovender();
            }
            console.log(resultCheckEmail);
        },
        validateEmails(emailString) {
            // Regular Expression สำหรับตรวจสอบอีเมล
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            // แยกอีเมลโดยใช้เครื่องหมายจุลภาค (,) และตัดช่องว่างออก
            const emails = emailString.split(",").map(email => email.trim());

                // ตรวจสอบแต่ละอีเมล
            for (const email of emails) {
                if (!emailRegex.test(email)) {
                    return false; // เจออีเมลผิด ออกจากลูปและคืนค่า false ทันที
                }
            }

            return true;
        },
        getSendToVendorHistory(pono , ponoDocnum , formno)
        {
            if(pono && ponoDocnum && formno){
                const formdata = new FormData();
                formdata.append("pono" , pono);
                formdata.append("ponoDocnum" , ponoDocnum);
                formdata.append("formno" , formno);
                axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/getSendToVendorHistory' , formdata).then(res=>{
                    console.log(res);
                    if(res.data.status == "Select Data Success"){
                        let result = res.data.result;
                        let html = result.map(results =>`
                            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start liDiv_emailHis">
                                <h5 class="mb-1 h5"><b>เวอร์ชั่น : </b>${ponoDocnum}</h5>
                                <p class="mb-1 font-14">
                                    <span><b>ส่งถึง : </b>${results.sp_mailto}</span>
                                </p>
                                <small class="text-muted"><b>ผู้ส่ง : </b>${results.sp_userpost}</small>
                                <small class="text-muted"><b>วันที่ส่ง : </b>${results.sp_datetime}</small>
                            </a>
                        `).join('');
         
                        document.querySelector(".ulDiv_emailHis").innerHTML = html;

                        const myModal = new Modal(document.getElementById('showSendEmailHistory_modal'), {
                            keyboard: false,
                            backdrop: 'static',
                        });
                        myModal.show();
                        this.closeShowPoDetail();
                    }
                });
            }
        },
        closeShowEmailHistory()
        {
            const myModalEl = document.getElementById('showSendEmailHistory_modal');
            const modal = Modal.getInstance(myModalEl);
            modal.hide();

            const myModal = new Modal(document.getElementById('showPoDetail_modal'), {
                keyboard: false,
                backdrop: 'static'
            });
            myModal.show();
        },
        async checkSendEmailHistory(pono , ponoDocnum , formno , index)
        {
            if(pono && ponoDocnum && formno){
                const formdata = new FormData();
                formdata.append('pono' , pono);
                formdata.append('ponoDocnum' , ponoDocnum);
                formdata.append('formno' , formno);

                try {
                    const res = await axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/checkSendEmailHistory', formdata);
                    if (res.data.status === "Select Data Success" && res.data.result > 0) {
                        this.$set(this.sendEmailStatuses, index, "✅ Sent"); // Vue ตรวจจับการเปลี่ยนแปลง
                    } else {
                        // this.$set(this.sendEmailStatuses, index, "❌ Not Sent");
                        // this.$set(this.sendEmailStatuses, index, "❌ Not Sent");
                    }
                } catch (error) {
                    console.error("❌ Error:", error);
                    this.$set(this.sendEmailStatuses, index, "⚠️ Error");
                }
            }else {
                this.$set(this.sendEmailStatuses, index, "❌ No Data");
            }
        }
    },
    mounted() {
        // this.getdata_po();
    },
    watch: {
        pono_prop: {
            handler() {
                this.getdata_po();
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
    .email-status {
        margin-top: 10px;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: #f0f0f0;
        font-weight: bold;
        text-align: center;
    }
</style>