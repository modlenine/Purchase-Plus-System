<template>
  <div id="purchase">
    <div class="row">
        <div class="col-xl-12 mb-30">
            <div class="card-box height-100-p pd-20">
                <div class="row form-group">
                    <div class="col-md-12 text-center">
                        <h5>หน่วยงานจัดซื้อตรวจสอบข้อมูล</h5>
                    </div>
                </div>
                <hr>

                <form id="frm-mgr-approve" autocomplete="off" class="needs-validation" novalidate @submit.prevent="savePurchase">
                <div class="row form-group">
                    <div class="col-md-12 radio-container">
                        <div class="custom-control custom-radio mb-5">
                            <input type="radio" id="ip-pur-app-yes" name="ip-pur-app" class="custom-control-input" value="yes" required v-model="purApproveType">
                            <label class="custom-control-label" for="ip-pur-app-yes">อนุมัติ</label>
                        </div>
                        <div class="custom-control custom-radio mb-5">
                            <input type="radio" id="ip-pur-app-no" name="ip-pur-app" class="custom-control-input" value="no" required v-model="purApproveType">
                            <label class="custom-control-label" for="ip-pur-app-no">ไม่อนุมัติ</label>
                        </div>
                    </div>
                    
                    
                    <div class="col-md-12 form-group">
                        <label for=""><b>หมายเหตุ</b></label>
                        <textarea class="form-control" name="ip-pur-memo" id="ip-pur-memo" cols="30" rows="10"></textarea>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for=""><b>ผู้อนุมัติ</b></label>
                        <input type="text" name="ip-pur-userpost" id="ip-pur-userpost" class="form-control" readonly>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for=""><b>รหัสพนักงาน</b></label>
                        <input type="text" name="ip-pur-ecodepost" id="ip-pur-ecodepost" class="form-control" readonly>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for=""><b>วันที่</b></label>
                        <input type="text" name="ip-pur-datetimepost" id="ip-pur-datetimepost" class="form-control" readonly>
                    </div>
                    <div class="col-md-12 form-group">
                        <button v-if="purBtn" type="submit" id="btn-save-pur" class="btn btn-primary">บันทึก</button>
                    </div>
                </div>
                </form>
                <router-link :to="{name:'Editprpurchase' , params:{formno:this.formno_prop}}" v-if="purBtnEdit" class="btn btn-warning purEditBtn">แก้ไขรายการ</router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    name:"Purchase",
    data() {
        return {
            url:this.getUrl(),
            userData:this.getSessionStorage(),
            purApproveType:'',
            purUserpost:'',
            purEcodepost:'',
            purDatetimepost:'',
            purBtn:false,
            purBtnEdit:false

        }
    },
    props:[
        'formno_prop',
        'datetimenow_prop',
        'approve_pur_prop',
        'memo_pur_prop',
        'userpost_pur_prop',
        'ecodepost_pur_prop',
        'datetime_pur_prop',
        'status',
        'paygroup_prop'
    ],
    methods: {
        savePurchase()
        {
            $('#btn-save-pur').prop('disabled' , true);
            const proxy = this;
            if(this.purApproveType == ""){
                Swal.fire({
                    title: 'กรุณาเลือกผลการอนุมัติ',
                    icon: 'warning',
                    showConfirmButton: true,
                    // timer:1000
                });
            }else{
                const formdata = new FormData();
                formdata.append('m_approve_pur' , this.purApproveType);
                formdata.append('m_memo_pur' , $('#ip-pur-memo').val())
                formdata.append('m_userpost_pur' , $('#ip-pur-userpost').val());
                formdata.append('m_ecodepost_pur' , $('#ip-pur-ecodepost').val());
                formdata.append('action' , 'savePurchase');
                formdata.append('formno' , this.formno_prop);
                formdata.append('paygroup' , this.paygroup_prop);

                axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/savePurchase' , formdata , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }).then(res=>{
                    console.log(res.data);
                    $('#btn-save-pur').prop('disabled' , false);
                    if(res.data.status == "Update Data Success"){
                        Swal.fire({
                            title: 'บันทึกข้อมูลสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.replace({name:'Prlist'});
                        });
                    }
                });
            }
        },
        checkStatusPur()
        {
            const proxy = this;
            if(proxy.status == "Purchase Verified" || proxy.status == "PO confirmed"){
                proxy.purApproveType = proxy.approve_pur_prop;
                $('#ip-pur-memo').val(proxy.memo_pur_prop).prop('readonly' , true);
                $('#ip-pur-userpost').val(proxy.userpost_pur_prop);
                $('#ip-pur-ecodepost').val(proxy.ecodepost_pur_prop);
                $('#ip-pur-datetimepost').val(proxy.datetime_pur_prop);
                $('input[name="ip-pur-app"]').attr('onclick' , 'return false');
                proxy.purBtn = false;
                proxy.purBtnEdit = false;
            }else{
                $('#ip-pur-memo').val();
                $('#ip-pur-userpost').val(proxy.userpostPur);
                $('#ip-pur-ecodepost').val(proxy.userData.ecode);
                $('#ip-pur-datetimepost').val(proxy.datetimenow_prop);
                if(this.userData.DeptCode == "1004" || this.userData.DeptCode == "1002"){
                    this.purBtn = true;
                    this.purBtnEdit = true;
                }
            }
        }
    },
    computed:{
        userpostPur()
        {
            return this.userData.Fname+' '+this.userData.Lname;
        }
    },
    mounted() {
        this.checkStatusPur();
    },
}
</script>

<style scoped>
.purEditBtn{
    position:absolute;
    top:15px !important;
    right:30px;
}
</style>