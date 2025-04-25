<template>
    <div id="viewdata">

        <div class="main-container">
            <div class="pd-ltr-20">

                <div class="row">
                    <div class="col-xl-12 mb-30">
                        <div class="card-box pd-20">
                            <div class="row">
                                <div class="col-md-12">
                                    <router-link v-if="btncontrol === true && btncontrol_edit === true"
                                        :to="{ name: 'Editpr', params: { formno: formno } }" type="button" id="btn-editpr"
                                        class="btn btn-warning mr-2"><i
                                            class="dw dw-edit-file mr-2"></i>แก้ไข</router-link>
                                    <button type="button" id="btn-printpr" class="btn btn-warning"
                                        @click="openPreviewModal"><i class="dw dw-print mr-2"></i>ปริ้น PR</button>
                                    <PreviewModal :dataprintpr="dataprintpr" ref="previewModal" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xl-12 mb-30">

                        <div class="card-box height-100-p pd-20">

                            <div class="row form-group">
                                <div class="col-md-12 form-group">
                                    <h4 style="text-align:center;">หน้าแสดงข้อมูล เอกสารเลขที่ : {{ formno }}</h4>
                                    <span class="textStatusHead">สถานะ : {{ status }}</span>
                                </div>
                            </div>
                            <hr>

                            <div class="row form-group">
                                <div class="col-md-12 form-group">
                                    <label for=""><b>เอกสาร Compare Vendor</b></label>
                                    <router-link v-if="compare_formno"
                                        :to="{ name: 'Compare_vendor_viewfull', params: { formno: compare_formno , deptcodecreate:department } }"
                                        target="_blank" class="ml-2">
                                        <i class="dw dw-zoom-in1 compareDocIcon"></i>
                                    </router-link>
                                    <input type="text" class="form-control" v-model="compare_formno" readonly />
                                </div>
                                <div class="col-md-4 form-group">
                                    <label for=""><b>สังกัดบริษัท</b></label>
                                    <select name="ip-cpr-areaid" id="ip-cpr-areaid" class="form-control"
                                        v-model="dataareaid" disabled>
                                        <option value="">กรุณาเลือกบริษัท</option>
                                        <option value="sln">Salee Colour Public Co.,Ltd.</option>
                                        <option value="poly">Poly Meritasia Co.,Ltd.</option>
                                        <option value="ca">Composite Asia Co.,Ltd.</option>
                                        <option value="st">Subterra Co.,Ltd.</option>
                                        <option value="tbb">The bubbles Co.,Ltd.</option>
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label for=""><b>หมวดหมู่เอกสาร</b></label>
                                    <select class="form-control" name="ip-cpr-reqplan" id="ip-cpr-reqplan"
                                        v-model="plantype" disabled>
                                        <option value="">กรุณาเลือกรายการ</option>
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label for=""><b>หมวดหมู่สินค้า</b></label>
                                    <select class="form-control" name="ip-cpr-itemcategory" id="ip-cpr-itemcategory"
                                        v-model="itemcategory" disabled>
                                        <option value="">กรุณาเลือกรายการ</option>
                                        <option value="raw_materials">วัตถุดิบ</option>
                                        <option value="expenses">ค่าใช้จ่าย</option>
                                        <option value="assets">ทรัพย์สิน</option>
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label for=""><b>Cost Center</b></label>
                                    <select class="form-control" name="ip-cpr-costcenter" id="ip-cpr-costcenter"
                                        v-model="costcenter" disabled>
                                        <option value="">กรุณาเลือกรายการ</option>
                                    </select>
                                </div>
                                <div class="col-md-4 form-group">
                                    <label for=""><b>แผนก</b></label>
                                    <select class="form-control" name="ip-cpr-department" id="ip-cpr-department"
                                        v-model="department" disabled>
                                        <option value="">กรุณาเลือกรายการ</option>
                                    </select>
                                </div>
                                <div class="col-md-4 fo">
                                    <label for=""><b>ผู้ขอซื้อ</b></label>
                                    <select class="form-control" name="ip-cpr-ecodereq" id="ip-cpr-ecodereq"
                                        v-model="ecode" disabled>
                                        <option value="">กรุณาเลือกผู้ขอซื้อ</option>
                                    </select>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label for=""><b>เลขที่ PR</b></label>
                                    <input type="text" name="ip-cpr-prno" id="ip-cpr-prno" class="form-control"
                                        v-model="prno" disabled>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label for=""><b>เลขที่ PO</b></label>
                                    <input type="text" name="ip-cpr-pono" id="ip-cpr-pono" class="form-control"
                                        v-model="pono" disabled>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label for=""><b>รหัสผู้ขาย</b></label>
                                    <input type="text" name="ip-cpr-vendid" id="ip-cpr-vendid" class="form-control"
                                        v-model="vendid" disabled>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label for=""><b>ชื่อผู้ขาย</b></label>
                                    <input type="text" name="ip-cpr-vendname" id="ip-cpr-vendname" class="form-control"
                                        disabled v-model="vendname">
                                </div>
                                <div class="col-md-12 form-group">
                                    <label for=""><b>อีเมล</b></label>
                                    <input type="text" name="ip-cpr-vendemail" id="ip-cpr-vendemail"
                                        class="form-control" disabled v-model="vendemail">
                                </div>
                                <div class="col-md-6 form-group">
                                    <label for=""><b>สกุลเงิน</b></label>
                                    <input type="text" name="ip-cpr-currency" id="ip-cpr-currency" class="form-control"
                                        readonly v-model="currency">
                                </div>
                                <div class="col-md-6 form-group">
                                    <label for=""><b>อัตราแลกเปลี่ยน</b></label>
                                    <input type="text" name="ip-cpr-currency" id="ip-cpr-currency" class="form-control"
                                        readonly v-model="currencyrate">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label for=""><b>วันที่เอกสาร</b></label>
                                    <input type="text" name="ip-cpr-docDatetime" id="ip-cpr-docDatetime"
                                        class="form-control" disabled :value="datetimecreate">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label for=""><b>วันที่ขอซื้อ</b></label>
                                    <input type="text" name="ip-cpr-reqDatetime" id="ip-cpr-reqDatetime"
                                        class="form-control" disabled :value="datetimereq">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label for=""><b>วันที่ส่งของ</b></label>
                                    <input type="text" name="ip-cpr-recDatetime" id="ip-cpr-recDatetime"
                                        class="form-control" disabled :value="datetimedelivery">
                                </div>
                                <div class="col-md-12 form-group">
                                    <label for=""><b>หมายเหตุ</b></label>
                                    <textarea name="ip-cpr-memo" id="ip-cpr-memo" cols="30" rows="10"
                                        class="form-control" v-model="memo" disabled></textarea>
                                </div>
                            </div>
                            <hr>
                            <div class="card card-box">
                                <div class="card-header bgItemCard">
                                    <span>รายการสินค้า</span>
                                </div>
                                <div class="card-body">
                                    <Itemlistview ref="itemlistcom" :itemdataProp="this.itemData"
                                        :currencyrate="this.currencyrate" :currency="this.currency" />
                                </div>
                            </div>
                            <hr>
                            <div class="row form-group">
                                <Showfile :files="this.files" :url="this.url" :showtype="'view'"
                                    :formno="this.formno" />
                            </div>
                            <hr>
                            <div class="row form-group">
                                <div class="col-md-12">
                                    <label for=""><b>ผู้ตรวจสอบข้อมูล</b></label>
                                    <select class="form-control" name="ip-cpr-invesEcode" id="ip-cpr-invesEcode"
                                        required v-model="m_invest_ecodefix" disabled>
                                        <option value="">กรุณาเลือกผู้ตรวจสอบ</option>
                                    </select>
                                </div>
                            </div>
                            <hr>
                            <div class="row form-group">
                                <div class="col-md-4 form-group">
                                    <label for=""><b>ผู้บันทึกข้อมูล</b></label>
                                    <input type="text" name="ip-cpr-userpost" id="ip-cpr-userpost" class="form-control"
                                        disabled :value="userpost">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label for=""><b>รหัสพนักงาน</b></label>
                                    <input type="text" name="ip-cpr-userecode" id="ip-cpr-userecode"
                                        class="form-control" disabled :value="ecodepost">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label for=""><b>วันที่</b></label>
                                    <input type="text" name="ip-cpr-userdatetime" id="ip-cpr-userdatetime"
                                        class="form-control" disabled :value="datetimepost">
                                </div>
                                <div class="col-md-12 form-group">
                                    <button v-if="btncontrol === true && btncontrol_send === true" type="button"
                                        class="btn btn-primary mr-2" @click="sendData" :disabled="isclickSend"><i
                                            class="dw dw-mail mr-2"></i>ส่งข้อมูล</button>
                                    <button v-if="btncontrol === true && btncontrol_cancel === true" type="button"
                                        id="btn-cancelData" class="btn btn-danger mr-2" @click="saveCancel" :disabled="isclickCancel"><i
                                            class="dw dw-cancel mr-2"></i>ยกเลิกเอกสาร</button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                <div v-if="showinvespage">
                    <Investigator :formno="this.formno" :status="this.status" :datetimenow_prop="this.datetimenow"
                        :dataareaid_prop="this.dataareaid" :m_approve_invest="this.m_approve_invest"
                        :m_userpost_invest="this.m_userpost_invest" :m_ecodepost_invest="this.m_ecodepost_invest"
                        :m_datetimepost_invest="this.m_datetimepost_invest" :m_memo_invest="this.m_memo_invest" />
                </div>

                <div v-if="showmgrpage">
                    <Mgrpage :formno="this.formno" :status="this.status" :userpostMgr_prop="this.userpostMgr"
                        :ecodepostMgr_prop="this.ecodepostMgr" :datetimepostMgr_prop="this.datetimepostMgr"
                        :approveMgr_prop="this.approveMgr" :sumprice_prop="this.sumprice" :paygroup_prop="this.paygroup"
                        :datetimenow_prop="this.datetimenow" :dataareaid_prop="this.dataareaid"
                        :userApp_prop="this.userApp" :memoMgr="this.memoMgr" />
                </div>

                <div v-if="showExecutivePage">
                    <Executivepage :paygroup_prop="this.paygroup" :datetimenow_prop="this.datetimenow"
                        :formno="this.formno" :status="this.status" :dataareaid_prop="this.dataareaid"
                        :userApp_prop="this.userApp" />
                </div>

                <div v-if="showPurPage">
                    <Purpage :formno_prop="this.formno" :status="this.status" :datetimenow_prop="this.datetimenow"
                        :approve_pur_prop="this.approve_pur" :memo_pur_prop="this.memo_pur"
                        :userpost_pur_prop="this.userpost_pur" :ecodepost_pur_prop="this.ecodepost_pur"
                        :datetime_pur_prop="this.datetime_pur" :paygroup_prop="this.paygroup" />
                </div>

                <div v-if="showPoPage">
                    <Popage :pono_prop="this.pono" :prno_prop="this.prno" :areaid_prop="this.dataareaid"
                        :department_prop="this.department" :formno="this.formno" :ecode="this.ecode"
                        :datetimereq="this.datetimereq" :userpostMgr="this.userpostMgr"
                        :datetimepostMgr="this.datetimepostMgr" :memo_pur_prop="this.memo_pur"
                        :userpost_pur="this.userpost_pur" :datetime_pur="this.datetime_pur" />
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import Itemlistview from '@/components/Itemlist_view.vue'
import Swal from 'sweetalert2'
import Mgrpage from '@/views/Mgrapprove.vue'
import Purpage from '@/views/Purchase.vue'
import Executivepage from '@/views/Executivepage.vue'
import Popage from '@/views/Popage.vue'
import Investigator from '@/views/Investigator.vue'
import Showfile from '@/components/Showfile.vue'
// import html2pdf from 'html2pdf.js';
import PreviewModal from '@/components/PreviewPrModal.vue';
import { Modal } from 'bootstrap'; // นำเข้าเฉพาะ Modal component จาก Bootstrap

export default {
    name: "Viewdata",
    components: {
        Itemlistview,
        Mgrpage,
        Purpage,
        Executivepage,
        PreviewModal,
        Popage,
        Investigator,
        Showfile
    },
    data() {
        return {
            dataprintpr: {
                message: "นี่คือข้อความที่จะปริ้น",
                companyfullname: '',
                vendid: '',
                vendname: '',
                vendemail: '',
                paymtermid: '',
                prno: '',
                datetimenow: '',
                datetimecreate: '',
                datetimepost: '',
                department: '',
                userrequest: '',
                datetimedelivery: '',
                memo: '',
                itemData: [],
                userpostInvest: '',
                datepostInvest: '',
                userpostMgr: '',
                datetimepostMgr: '',
                formisono: '',
                executive: []
            },
            userData: this.getSessionStorage(),
            url: this.getUrl(),
            dataareaid: '',
            plantype: '',
            itemcategory: '',
            costcenter: '',
            prno: '',
            compare_formno: '',
            pono: '',
            department: '',
            ecode: '',
            vendid: '',
            vendname: '',
            vendemail: '',
            datetimereq: '',
            datetimedelivery: '',
            memo: '',
            datetimecreate: '',
            userpost: '',
            ecodepost: '',
            datetimepost: '',
            status: '',
            itemData: [],
            btncontrol: false,
            btncontrol_edit: true,
            btncontrol_send: false,
            btncontrol_cancel: true,
            sumprice: 0,
            paygroup: '',
            datetimenow: '',
            formisono_po: '',
            files: [],
            currency: '',
            currencyrate: 0,

            // Investigator zone
            showinvespage: false,
            m_invest_ecodefix: '',
            m_approve_invest: '',
            m_memo_invest: '',
            m_userpost_invest: '',
            m_ecodepost_invest: '',
            m_datetimepost_invest: '',


            //mgrzone
            showmgrpage: false,
            userpostMgr: '',
            ecodepostMgr: '',
            datetimepostMgr: '',
            approveMgr: '',
            memoMgr: '',
            userApp: [],

            // purzone
            approve_pur: '',
            memo_pur: '',
            userpost_pur: '',
            ecodepost_pur: '',
            datetime_pur: '',


            //Executivepage
            showExecutivePage: false,

            //Purpage
            showPurPage: false,

            //Po Comfirmed
            showPoPage: false,

            //control btn
            isclickSend:false,
            isclickCancel:false
        }
    },
    methods: {
        getdata_viewfull() {
            if (this.formno != "") {
                const formdata = new FormData();
                formdata.append('formno', this.formno);
                formdata.append('action', "getdata_viewfull");
                axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/getdata_viewfull', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    // console.log(res.data);
                    if (res.data.status == "Select Data Success") {

                        console.log(res.data);
                        let resultMain = res.data.maindata;
                        let resultDetails = res.data.details;
                        let resultFiles = res.data.files;
                        let vendtable = res.data.vendtable;
                        this.compare_formno = resultMain.m_compare_formno;
                        this.dataareaid = resultMain.m_dataareaid;
                        this.plantype = resultMain.m_plantype;
                        this.itemcategory = resultMain.m_itemcategory;
                        this.costcenter = resultMain.m_costcenter;
                        this.department = resultMain.m_department;
                        this.ecode = resultMain.m_ecode;
                        this.vendid = resultMain.m_vendid;
                        this.vendname = vendtable.name;
                        this.vendemail = vendtable.email;
                        this.datetimecreate = resultMain.m_datetime_create;
                        this.datetimereq = resultMain.m_date_req;
                        this.datetimedelivery = resultMain.m_date_delivery;
                        this.memo = resultMain.m_memo;
                        this.userpost = resultMain.m_userpost;
                        this.ecodepost = resultMain.m_ecodepost;
                        this.datetimepost = resultMain.m_datetimepost;
                        this.prno = resultMain.m_prno;
                        this.pono = resultMain.m_pono;
                        this.formisono_po = resultMain.m_formisono_po;
                        this.status = resultMain.m_status;
                        this.sumprice = res.data.pricesum;
                        this.paygroup = res.data.paygroup;
                        this.datetimenow = res.data.datetimenow;
                        this.files = resultFiles;
                        this.currency = resultMain.m_currency;

                        if (resultMain.m_currencyrate !== "" && resultMain.m_currencyrate !== null) {
                            this.currencyrate = parseFloat(resultMain.m_currencyrate).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
                        } else {
                            this.currencyrate = null;
                        }

                        this.getReqplan();
                        this.getCostcenter();
                        this.getDepartment();
                        this.getUserEcode();
                        this.getInvestigator();

                        this.controlBtn();

                        this.itemData = resultDetails;

                        // Investigator zone
                        this.m_invest_ecodefix = resultMain.m_invest_ecodefix;
                        this.m_approve_invest = resultMain.m_approve_invest;
                        this.m_userpost_invest = resultMain.m_userpost_invest;
                        this.m_ecodepost_invest = resultMain.m_ecodepost_invest;
                        this.m_datetimepost_invest = resultMain.m_datetimepost_invest;
                        this.m_memo_invest = resultMain.m_memo_invest;


                        //manager zone
                        this.userpostMgr = resultMain.m_userpost_mgr;
                        this.ecodepostMgr = resultMain.m_ecodepost_mgr;
                        this.datetimepostMgr = resultMain.m_datetimepost_mgr;
                        this.approveMgr = resultMain.m_approve_mgr;
                        this.userApp = res.data.userApp;
                        this.memoMgr = resultMain.m_memo_mgr;

                        // purchase zone
                        this.approve_pur = resultMain.m_approve_pur;
                        this.memo_pur = resultMain.m_memo_pur;
                        this.userpost_pur = resultMain.m_userpost_pur;
                        this.ecodepost_pur = resultMain.m_ecodepost_pur;
                        this.datetime_pur = resultMain.m_datetimepost_pur;

                    }
                })
            }
        },
        getReqplan() {
            if (this.dataareaid != "") {
                axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/getReqplan', {
                    action: "getReqplan",
                    areaid: this.dataareaid
                }).then(res => {
                    // console.log(res.data);
                    if (res.data.status == "Select Data Success") {
                        let result = res.data.result;
                        console.log(result);
                        let html = `
                        <option value="">กรุณาเลือกรายการ</option>
                        `;
                        for (let key in result) {
                            let selected = this.plantype == result[key].bpc_numbersequence ? 'selected' : '';
                            html += `
                            <option value="${result[key].bpc_numbersequence}" ${selected}>${result[key].reqplanid} | ${result[key].name}</option>
                            `;
                        }
                        $('#ip-cpr-reqplan').html(html);
                    }
                });
            } else {
                $('#ip-cpr-reqplan').html('<option value="">กรุณาเลือกรายการ</option>');
            }
        },
        getCostcenter() {
            if (this.dataareaid != "") {
                axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/getCostcenter', {
                    action: "getCostcenter",
                    areaid: this.dataareaid
                }).then(res => {
                    if (res.data.status == "Select Data Success") {
                        let result = res.data.result;
                        let html = ``;
                        for (let key in result) {
                            let selected = this.costcenter == result[key].num ? 'selected' : '';
                            html += `
                            <option value="${result[key].num}" ${selected}>${result[key].num} | ${result[key].description}</option>
                            `;
                        }
                        $('#ip-cpr-costcenter').append(html);
                    }
                });
            } else {
                $('#ip-cpr-costcenter').html('<option value="">กรุณาเลือกรายการ</option>');
            }
        },
        getDepartment() {
            if (this.dataareaid != "") {
                axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/getDepartment', {
                    action: "getDepartment",
                    areaid: this.dataareaid
                }).then(res => {
                    if (res.data.status == "Select Data Success") {
                        let result = res.data.result;
                        let html = ``;
                        for (let key in result) {
                            let selected = this.department == result[key].num ? 'selected' : ''
                            html += `
                            <option value="${result[key].num}" ${selected}>${result[key].num} | ${result[key].description}</option>
                            `;
                        }
                        $('#ip-cpr-department').append(html);
                    }
                });
            } else {
                $('#ip-cpr-department').html('<option value="">กรุณาเลือกรายการ</option>');
            }
        },
        getUserEcode() {
            if (this.department != "") {
                axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/getUserEcode', {
                    action: "getUserEcode",
                    department: this.department
                }).then(res => {
                    if (res.data.status == "Select Data Success") {
                        let result = res.data.result;
                        let html = ``;
                        for (let key in result) {
                            let selected = this.ecode == result[key].ecode ? 'selected' : ''
                            html += `
                            <option value="${result[key].ecode}" ${selected}>${result[key].Fname} ${result[key].Lname}</option>
                            `;
                        }
                        $('#ip-cpr-ecodereq').append(html);
                    }
                });
            } else {
                $('#ip-cpr-ecodereq').html('<option value="">กรุณาเลือกรายการ</option>');
            }
        },
        getInvestigator() {
            axios.get(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/getInvestigator').then(res => {
                console.log(res.data);
                if (res.data.status == "Select Data Success") {
                    let html = '<option value="">กรุณาเลือกผู้ตรวจสอบ</option>';
                    let result = res.data.result;
                    for (let key in result) {
                        let selected = this.m_invest_ecodefix == result[key].inve_ecode ? 'selected' : '';
                        html += `
                            <option value="${result[key].inve_ecode}" ${selected}>${result[key].inve_fullname}</option>
                        `;
                    }
                    $('#ip-cpr-invesEcode').html(html);
                }
            });
        },
        saveCancel() {
            const proxy = this;
            proxy.isclickCancel = true;
            if (this.formno != "") {
                Swal.fire({
                    title: 'ต้องการยกเลิกเอกสาร ใช่หรือไม่',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText: 'ยกเลิก',
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                }).then((result) => {
                    if (result.value === true) {
                        const formdata = new FormData();
                        formdata.append('formno', this.formno);
                        formdata.append('compare_formno' , this.compare_formno);
                        formdata.append('action', 'saveCancel');
                        axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/saveCancel', formdata, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(res => {
                            console.log(res.data);
                            proxy.isclickCancel = false;
                            if (res.data.status == "Update Data Success") {

                                Swal.fire({
                                    title: 'บันทึกข้อมูลสำเร็จ',
                                    icon: 'success',
                                    showConfirmButton: false,
                                    timer: 1000
                                }).then(function () {
                                    proxy.$router.replace({ name: 'Prlist' });
                                });
                            }
                        });
                    }
                });
            }
        },
        sendData() {
            const proxy = this;
            proxy.isclickSend = true;
            Swal.fire({
                title: 'ต้องการส่งข้อมูล ใช่หรือไม่',
                text: 'กรุณาตรวจสอบความถูกต้องของข้อมูลให้ครบถ้วน เนื่องจากหลังกดส่งข้อมูลแล้วท่านจะไม่สามารถกลับมาแก้ไขรายละเอียดได้',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก',
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.value === true) {
                    const formdata = new FormData();
                    formdata.append('action', 'sendData');
                    formdata.append('formno', proxy.formno);
                    axios.post(proxy.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/sendData', formdata, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        console.log(res.data);
                        proxy.isclickSend = false;
                        if (res.data.status == "Update Data Success") {
                            Swal.fire({
                                title: 'บันทึกข้อมูลสำเร็จ',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1000
                            }).then(function () {
                                proxy.$router.replace({ name: 'Prlist' });
                            });
                        }
                    });
                }
            });
        },
        controlBtn() {
            //control with status
            if (this.status === "User Cancel" || this.status == "New PR" || this.status == "Investigator Approved" || this.status == "Investigator Not Approve" || this.status == "Manager Approved" || this.status == "Manager Not Approve" || this.status == "Executive Group 4 Approved" || this.status == "Executive Group 3 Approved" || this.status == "Executive Group 2 Approved" || this.status == "Executive Group 1 Approved" || this.status == "Executive Group 0 Approved" || this.status == "Purchase Verified" || this.status == "Purchase Not Approve" || this.status == "PO confirmed" || this.status == "Executive Group 4 Not Approve" || this.status == "Executive Group 3 Not Approve" || this.status == "Executive Group 2 Not Approve" || this.status == "Executive Group 1 Not Approve" || this.status == "Executive Group 0 Not Approve") {
                this.btncontrol = false;
            } else if (this.status == "Wait Send Data") {
                if (this.userData.ecode == this.ecodepost || this.userData.ecode == this.ecode) {
                    if (this.userData.DeptCode == "1010" || this.userData.DeptCode == "1013") {
                        this.btncontrol_send = false;
                        this.btncontrol = true;
                    } else {
                        this.btncontrol_send = true;
                        this.btncontrol = true;
                    }
                } else if (this.userData.DeptCode == "1004" || this.userData.DeptCode == "1002") {
                    this.btncontrol_send = true;
                    this.btncontrol = true;
                }
            } else {
                this.btncontrol = true;
            }
        },
        openPreviewModal() {

            if (this.dataareaid != "" && this.formno != "") {
                const formdata = new FormData();
                formdata.append('formno', this.formno);
                axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/getDataforprint', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res.data);
                    if (res.data.status == "Select Data Success") {
                        let resultMain = res.data.maindata;
                        let resultDetails = res.data.detailsdata;
                        let resultExecutive = res.data.approveuser;

                        this.dataprintpr.companyfullname = resultMain.companyfullname;
                        this.dataprintpr.vendid = resultMain.m_vendid;
                        this.dataprintpr.vendname = resultMain.m_vendname;
                        this.dataprintpr.paymtermid = resultMain.m_paymtermid;
                        this.dataprintpr.prno = resultMain.m_prno;
                        this.dataprintpr.datetimenow = res.data.datetimenow;
                        this.dataprintpr.datetimecreate = resultMain.m_datetime_create;
                        this.dataprintpr.datetimepost = resultMain.m_datetimepost;
                        this.dataprintpr.department = resultMain.m_department;
                        this.dataprintpr.memo = resultMain.m_memo;
                        this.dataprintpr.userrequest = res.data.userRequest;
                        this.dataprintpr.userpostMgr = resultMain.m_userpost_mgr;
                        this.dataprintpr.datetimepostMgr = resultMain.m_datetimepost_mgr;
                        this.dataprintpr.formisono = resultMain.m_formisono;
                        this.dataprintpr.datetimedelivery = resultMain.m_date_delivery;
                        this.dataprintpr.userpostInvest = resultMain.m_userpost_invest;
                        this.dataprintpr.datepostInvest = resultMain.m_datetimepostinvest;

                        this.dataprintpr.itemData = resultDetails;
                        this.dataprintpr.executive = resultExecutive;
                    }
                });
            }

            const myModal = new Modal(document.getElementById('previewModal'), {
                keyboard: false,
                backdrop: 'static'
            });
            myModal.show();
        },
        checkstatus() {
            if (this.status == "New PR") {
                if (this.m_invest_ecodefix == this.userData.ecode) {
                    this.showinvespage = true;
                }
            } else if (this.status == "Investigator Approved") {
                this.showinvespage = true;
                if (this.department == this.userData.DeptCode && this.userData.posi > 15) {
                    this.showmgrpage = true;
                } else if (this.department == "1007" && this.userData.ecode == "M0040") {
                    this.showmgrpage = true;
                } else if (this.department == "1001" && this.userData.ecode == "M0963") {//M0963 adirek
                    this.showmgrpage = true;
                } else if (this.department == "1008" && this.userData.ecode == "M0112" ||
                    this.department == "1014" && this.userData.ecode == "M0112" ||
                    this.department == "1015" && this.userData.ecode == "M0112"
                ) {
                    this.showmgrpage = true;
                } else if (this.department == "1012" && this.userData.ecode == "M0025") {
                    this.showmgrpage = true;
                }
            } else if (this.status == "Investigator Not Approve") {
                this.showinvespage = true;
            } else if (this.status == "Manager Approved") {
                this.showinvespage = true;
                this.showmgrpage = true;
                if (this.paygroup == "5") {
                    this.showPurPage = true;
                } else if (this.paygroup == "4") {
                    this.showExecutivePage = true;
                } else if (this.paygroup == "3") {
                    this.showExecutivePage = true;
                } else if (this.paygroup == "2") {
                    this.showExecutivePage = true;
                } else if (this.paygroup == "1") {
                    this.showExecutivePage = true;
                } else if (this.paygroup == "0") {
                    this.showExecutivePage = true;
                }
            } else if (this.status == "Manager Not Approve") {
                this.showinvespage = true;
                this.showmgrpage = true;
            } else if (this.status == "Executive Group 4 Approved") {
                this.showinvespage = true;
                this.showmgrpage = true;
                this.showExecutivePage = true;
                this.showPurPage = true;
            } else if (this.status == "Executive Group 3 Approved") {
                this.showinvespage = true;
                this.showmgrpage = true;
                this.showExecutivePage = true;
                this.showPurPage = true;
            } else if (this.status == "Executive Group 2 Approved") {
                this.showinvespage = true;
                this.showmgrpage = true;
                this.showExecutivePage = true;
                this.showPurPage = true;
            } else if (this.status == "Executive Group 1 Approved") {
                this.showinvespage = true;
                this.showmgrpage = true;
                this.showExecutivePage = true;
                this.showPurPage = true;
            } else if (this.status == "Executive Group 0 Approved") {
                this.showinvespage = true;
                this.showmgrpage = true;
                this.showExecutivePage = true;
                this.showPurPage = true;
            } else if (this.status == "Purchase Verified") {
                this.showinvespage = true;
                this.showmgrpage = true;
                this.showExecutivePage = true;
                this.showPurPage = true;
            } else if (this.status == "Purchase Not Approve") {
                this.showinvespage = true;
                this.showmgrpage = true;
                this.showExecutivePage = true;
                this.showPurPage = true;
            } else if (this.status == "PO confirmed") {
                this.showinvespage = true;
                this.showmgrpage = true;
                this.showExecutivePage = true;
                this.showPurPage = true;
                this.showPoPage = true;
            }
        },
    },
    created() {
        this.getdata_viewfull();
    },
    watch: {
        // status(){
        //     if(this.status == "New PR"){
        //         if(this.m_invest_ecodefix == this.userData.ecode){
        //             this.showinvespage = true;
        //         }
        //     }else if(this.status == "Investigator Approved"){
        //         this.showinvespage = true;
        //         if(this.department == this.userData.DeptCode && this.userData.posi > 15){
        //             this.showmgrpage = true;
        //         }else if(this.department == "1007" && this.userData.ecode == "M0040"){
        //             this.showmgrpage = true;
        //         }
        //     }else if(this.status == "Manager Approved"){
        //         this.showinvespage = true;
        //         this.showmgrpage = true;
        //         if(this.paygroup == "5"){
        //             this.showPurPage = true;
        //         }else if(this.paygroup == "4"){
        //             this.showExecutivePage = true;
        //         }else if(this.paygroup == "3"){
        //             this.showExecutivePage = true;
        //         }else if(this.paygroup == "2"){
        //             this.showExecutivePage = true;
        //         }else if(this.paygroup == "1"){
        //             this.showExecutivePage = true;
        //         }else if(this.paygroup == "0"){
        //             this.showExecutivePage = true;
        //         }
        //     }else if(this.status == "Executive Group 4 Approved"){
        //         this.showinvespage = true;
        //         this.showmgrpage = true;
        //         this.showExecutivePage = true;
        //         this.showPurPage = true;
        //     }else if(this.status == "Executive Group 3 Approved"){
        //         this.showinvespage = true;
        //         this.showmgrpage = true;
        //         this.showExecutivePage = true;
        //         this.showPurPage = true;
        //     }else if(this.status == "Executive Group 2 Approved"){
        //         this.showinvespage = true;
        //         this.showmgrpage = true;
        //         this.showExecutivePage = true;
        //         this.showPurPage = true;
        //     }else if(this.status == "Executive Group 1 Approved"){
        //         this.showinvespage = true;
        //         this.showmgrpage = true;
        //         this.showExecutivePage = true;
        //         this.showPurPage = true;
        //     }else if(this.status == "Executive Group 0 Approved"){
        //         this.showinvespage = true;
        //         this.showmgrpage = true;
        //         this.showExecutivePage = true;
        //         this.showPurPage = true;
        //     }else if(this.status == "Purchase Verified"){
        //         this.showinvespage = true;
        //         this.showmgrpage = true;
        //         this.showExecutivePage = true;
        //         this.showPurPage = true;
        //     }else if(this.status == "PO confirmed"){
        //         this.showinvespage = true;
        //         this.showmgrpage = true;
        //         this.showExecutivePage = true;
        //         this.showPurPage = true;
        //         this.showPoPage = true;
        //     }
        // },
        status: {
            handler() {
                this.checkstatus();
            },
            immediate: true,
            deep: true
        },
        userpermission1() {
            //code
        }
    },
    mounted() {

    },
    computed: {
        formno() {
            return this.$route.params.formno;
        },
    },
}
</script>

<style scoped>
.btnAddItem {
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 24px;
    font-weight: 800;
    color: #ffffff;
    transition: transform .2s;
}

.btnAddItem:hover {
    transform: scale(1.1);
}

.bgItemCard {
    background-color: #0093E9;
    background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

    border-bottom: 1px solid #ccc;
}

.bgItemCard span {
    color: #ffffff;
}

.modal {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0s linear 0.3s;
}

.modal.show {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
}

#ip-cpr-memo {
    height: 100px;
}

.itemListDel {
    display: none !important;
}

.compareDocIcon {
    font-size: 20px;
    transition: transform .2s;
    color: #eaa000;
}

.compareDocIcon:hover {
    cursor: pointer;
    transform: scale(1.1);
}
</style>