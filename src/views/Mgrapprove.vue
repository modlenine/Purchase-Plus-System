<template>
  <div id="mgrapprove">
    <div class="row">
        <div class="col-xl-12 mb-30">
            <div class="card-box height-100-p pd-20">
                <div class="row form-group">
                    <div class="col-md-12 text-center">
                        <h5>ผู้จัดการอนุมัติ</h5>
                    </div>
                </div>
                <hr>

                <form id="frm-mgr-approve" autocomplete="off" class="needs-validation" novalidate @submit.prevent="saveMgrApprove">
                <div class="row form-group">
                    <div class="col-md-12 radio-container">
                        <div class="custom-control custom-radio mb-5">
                            <input type="radio" id="ip-mgr-app-yes" name="ip-mgr-app" class="custom-control-input" value="yes" required v-model="mgrApproveType">
                            <label class="custom-control-label" for="ip-mgr-app-yes">อนุมัติ</label>
                        </div>
                        <div class="custom-control custom-radio mb-5">
                            <input type="radio" id="ip-mgr-app-no" name="ip-mgr-app" class="custom-control-input" value="no" required v-model="mgrApproveType">
                            <label class="custom-control-label" for="ip-mgr-app-no">ไม่อนุมัติ</label>
                        </div>
                    </div>

                    <!--group4 -->
                    <div v-if="ctrlG4" class="row form-group">
                        <div class="col-md-12 form-group">
                            <h5>ผู้จัดการท่านที่สอง 1 ท่าน</h5>
                        </div>
                        <div class="col-md-12 form-group">
                            <div id="show_group4" class="checkbox-container"></div>
                        </div>
                    </div>
                    <!--group4 -->

                    <!--group3-->
                    <div v-if="ctrlG3" class="row form-group">
                        <div class="col-md-12 form-group">
                            <h5>รองกรรมการผู้จัดการ 1 ท่าน</h5>
                        </div>
                        <div class="col-md-12 form-group">
                            <div id="show_group3" class="checkbox-container"></div>
                        </div>
                    </div>
                    <!--group3 -->

                    <!--group2-->
                    <div v-if="ctrlG2" class="row form-group">
                        <div class="col-md-12 form-group">
                            <h5>รองกรรมการผู้จัดการ 2 ท่าน</h5>
                        </div>
                        <div class="col-md-12 form-group">
                            <div id="show_group2" class="checkbox-container"></div>
                        </div>
                    </div>
                    <!--group2 -->

                    <!--group1-->
                    <div v-if="ctrlG1" class="row form-group">
                        <div class="col-md-12 form-group">
                            <h5>ประธานบริหาร 1 ท่าน</h5>
                        </div>
                        <div class="col-md-12 form-group">
                            <div id="show_group11" class="checkbox-container"></div>
                        </div>

                        <div class="col-md-12 form-group">
                            <h5>กรรมการผู้จัดการ 1 ท่าน</h5>
                        </div>
                        <div class="col-md-12 form-group">
                            <div id="show_group12" class="checkbox-container"></div>
                        </div>

                        <div class="col-md-12 form-group">
                            <h5>รองกรรมการผู้จัดการ 3 ท่าน</h5>
                        </div>
                        <div class="col-md-12 form-group">
                            <div id="show_group13" class="checkbox-container"></div>
                        </div>
                    </div>
                    <!--group1-->

                    <!--group0-->
                    <div v-if="ctrlG0" class="row form-group">
                        <div class="col-md-12 form-group">
                            <h5>คณะกรรมการบริหาร 6 ท่าน</h5>
                        </div>
                        <div class="col-md-12 form-group">
                            <div id="show_group0" class="checkbox-container"></div>
                        </div>
                    </div>
                    <!--group0 -->
                    
                    <div class="col-md-12 form-group">
                        <label for=""><b>หมายเหตุ</b></label>
                        <textarea class="form-control" name="ip-mgr-memo" id="ip-mgr-memo" cols="30" rows="10" v-model="mgrMemo"></textarea>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for=""><b>ผู้อนุมัติ</b></label>
                        <input type="text" name="ip-mgr-userpost" id="ip-mgr-userpost" class="form-control" v-model="mgrUserpost" readonly>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for=""><b>รหัสพนักงาน</b></label>
                        <input type="text" name="ip-mgr-ecodepost" id="ip-mgr-ecodepost" class="form-control" v-model="mgrEcodepost" readonly>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for=""><b>วันที่</b></label>
                        <input type="text" name="ip-mgr-datetimepost" id="ip-mgr-datetimepost" class="form-control" v-model="mgrDatetimepost" readonly>
                    </div>
                    <div class="col-md-12 form-group">
                        <button v-if="btnsaveMgr == true" type="submit" id="btn-save-mgr" class="btn btn-primary"><i class="dw dw-diskette1 mr-2"></i>บันทึก</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import $ from 'jquery'
export default {
    name:"Mgrapprove",
    data() {
        return {
            url:this.getUrl(),
            userData:this.getSessionStorage(),
            datenow: new Date(),
            mgrApproveType:'',
            mgrMemo:'',
            mgrUserpost:'',
            mgrEcodepost:'',
            mgrDatetimepost:'',
            btnsaveMgr:false,
            ctrlG4:false,
            ctrlG3:false,
            ctrlG2:false,
            ctrlG1:false,
            ctrlG0:false
            
        }
    },
    props:[
        'formno',
        'status',
        'userpostMgr_prop',
        'ecodepostMgr_prop',
        'datetimepostMgr_prop',
        'approveMgr_prop',
        'sumprice_prop',
        'paygroup_prop',
        'datetimenow_prop',
        'dataareaid_prop',
        'userApp_prop',
        'memoMgr'
    ],
    methods: {
        saveMgrApprove()
        {
            $('#btn-save-mgr').prop('disabled' , true);
            const proxy = this;
            //check data null
            if(this.mgrApproveType == ""){
                Swal.fire({
                    title: 'กรุณาเลือกผลการอนุมัติ',
                    icon: 'warning',
                    showConfirmButton: true,
                    // timer:1000
                });
            }else{

                const formdata = new FormData();
                formdata.append('formno' , this.formno);
                formdata.append('approveType' , this.mgrApproveType);
                formdata.append('memoMgr' , this.mgrMemo);
                formdata.append('userpostMgr' , this.userpostMgr);
                formdata.append('ecodepostMgr' , this.userData.ecode);
                formdata.append('paygroup' , this.paygroup_prop);
                formdata.append('dataareaid' , this.dataareaid_prop);

                if(this.paygroup_prop == "4"){
                    $('input[name="g4Check[]"]:checked').each(function() {
                        formdata.append('g4Check[]', $(this).val());
                    });
                }else if(proxy.paygroup_prop == "3"){
                    $('input[name="g3Check[]"]:checked').each(function() {
                        formdata.append('g3Check[]', $(this).val());
                    });
                }else if(proxy.paygroup_prop == "2"){
                    $('input[name="g2Check[]"]:checked').each(function() {
                        formdata.append('g2Check[]', $(this).val());
                    });
                }else if(proxy.paygroup_prop == "1"){
                    $('input[name="g1Check[]"]:checked').each(function() {
                        formdata.append('g1Check[]', $(this).val());
                    });
                }else if(proxy.paygroup_prop == "0"){
                    $('input[name="g0Check[]"]:checked').each(function() {
                        formdata.append('g0Check[]', $(this).val());
                    });
                }

                axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/saveMgrApprove' , formdata , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }).then(res=>{
                    console.log(res.data);
                    $('#btn-save-mgr').prop('disabled' , false);
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
        mgrCheckStatus()
        {
            if(this.status == "Investigator Approved"){
                this.mgrUserpost = this.userpostMgr;
                this.mgrEcodepost = this.userData.ecode;
                this.mgrDatetimepost = this.datetimenow_prop;
                this.btnsaveMgr = true;
            }else{
                this.mgrUserpost = this.userpostMgr_prop;
                this.mgrEcodepost = this.ecodepostMgr_prop;
                this.mgrDatetimepost = this.datetimepostMgr_prop;
                this.mgrMemo = this.memoMgr;
                if(this.approveMgr_prop == "yes"){
                    $('#ip-mgr-app-yes').prop('checked' , true);
                }else if(this.approveMgr_prop == "no"){
                    $('#ip-mgr-app-no').prop('checked' , true);
                }
                $('input[name="ip-mgr-app"]').attr('onclick' , 'return false');
                $('#ip-mgr-memo').prop('readonly' , true);
                this.btnsaveMgr = false;
            }
        },
        getdataG4()
        {
            $('#btn-save-mgr').prop('disabled' , true);
            const formdata = new FormData();
            formdata.append("action" , "getdataG4");
            axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/getdataG4' , formdata , {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    //code
                    let onclickfalse = this.status == "Manager Approved" ? 'onclick="return false"' : '';
                    let result = res.data.result;
                    let html = '';
                    for(const key in result){
                        let checked = this.userApp_prop.includes(result[key].app_ecode) ? 'checked' : '';
                        if(result[key].app_ecode == this.userData.ecode && this.status !== "Manager Approved"){
                            continue;
                        }else{
                            html +=`
                                <div class="checkbox custom-control custom-checkbox mb-2">
                                    <input type="checkbox" value="${result[key].app_ecode}" class="custom-control-input single-checkbox" name="g4Check[]" id="g4Check${key}" ${checked} ${onclickfalse}>
                                    <label class="custom-control-label" for="g4Check${key}">${result[key].app_user}</label>
                                </div>
                            `;
                        }
                    }
                    $('#show_group4').html(html);
                    
                    $('.single-checkbox').change(function() {
                        $('.single-checkbox').not(this).prop('checked', false);
                        if($('.single-checkbox:checked').length == 1){
                            $('#btn-save-mgr').prop('disabled' , false);
                        }else{
                            $('#btn-save-mgr').prop('disabled' , true);
                        }
                    });
                }
            });
        },
        getdataG3()
        {
            $('#btn-save-mgr').prop('disabled' , true);
            const formdata = new FormData();
            formdata.append("action" , "getdataG3");
            axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/getdataG3' , formdata , {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    //code
                    let onclickfalse = this.status == "Manager Approved" ? 'onclick="return false"' : '';
                    let result = res.data.result;
                    let html = '';
                    for(const key in result){
                        let checked = this.userApp_prop.includes(result[key].app_ecode) ? 'checked' : '';
                        html +=`
                            <div class="checkbox custom-control custom-checkbox mb-2">
                                <input type="checkbox" value="${result[key].app_ecode}" class="custom-control-input single-checkbox" name="g3Check[]" id="g3Check${key}" ${checked} ${onclickfalse}>
                                <label class="custom-control-label" for="g3Check${key}">${result[key].app_user}</label>
                            </div>
                        `;
                    }
                    $('#show_group3').html(html);

                    $('.single-checkbox').change(function() {
                        if ($('.single-checkbox:checked').length > 1) {
                            // ยกเลิกการเลือก checkbox อื่นๆ
                            $('.single-checkbox').not(this).prop('checked', false);
                        }else if($('.single-checkbox:checked').length == 1){
                            $('#btn-save-mgr').prop('disabled' , false);
                        }else{
                            $('#btn-save-mgr').prop('disabled' , true);
                        }
                    });
                }
            });
        },
        getdataG2()
        {
            $('#btn-save-mgr').prop('disabled' , true);
            const formdata = new FormData();
            formdata.append("action" , "getdataG2");
            axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/getdataG2' , formdata , {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    //code
                    let onclickfalse = this.status == "Manager Approved" ? 'onclick="return false"' : '';
                    let result = res.data.result;
                    let html = '';
                    for(const key in result){
                        let checked = this.userApp_prop.includes(result[key].app_ecode) ? 'checked' : '';
                        html +=`
                            <div class="checkbox custom-control custom-checkbox mb-2">
                                <input type="checkbox" value="${result[key].app_ecode}" class="custom-control-input multi-checkbox" name="g2Check[]" id="g2Check${key}" ${checked} ${onclickfalse}>
                                <label class="custom-control-label" for="g2Check${key}">${result[key].app_user}</label>
                            </div>
                        `;
                    }
                    $('#show_group2').html(html);

                    $('.multi-checkbox').change(function() {
                        if ($('.multi-checkbox:checked').length > 2) {
                            this.checked = false;
                            Swal.fire({
                                title: 'คุณสามารถเลือกได้ไม่เกิน 2 ท่าน',
                                icon: 'warning',
                                showConfirmButton: true,
                                // timer:1000
                            });
                        }else if($('.multi-checkbox:checked').length == 2){
                            $('#btn-save-mgr').prop('disabled' , false);
                        }else{
                            $('#btn-save-mgr').prop('disabled' , true);
                        }
                    });
                }
            });
        },
        getdataG1()
        {
            const formdata = new FormData();
            formdata.append("action" , "getdataG1");
            axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/getdataG1' , formdata , {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    //code
                    let onclickfalse = this.status !== "Investigator Approved" ? 'onclick="return false"' : '';
                    let result = res.data.result;
                    let html = '';
                    let html1 = '';
                    let html2 = '';
                    for(const key in result){
                        let checked = this.userApp_prop.includes(result[key].app_ecode) ? 'checked' : '';
                        if(result[key].app_posiname == "ประธานบริหาร"){
                            html +=`
                                <div class="checkbox custom-control custom-checkbox mb-2">
                                    <input type="checkbox" value="${result[key].app_ecode}" class="custom-control-input group1-checkbox" name="g1Check[]" id="g1_1Check${key}" ${checked} ${onclickfalse}>
                                    <label class="custom-control-label" for="g1_1Check${key}">${result[key].app_user}</label>
                                </div>
                            `;
                        }else if(result[key].app_posiname == "กรรมการผู้จัดการ"){
                            html1 +=`
                                <div class="checkbox custom-control custom-checkbox mb-2">
                                    <input type="checkbox" value="${result[key].app_ecode}" class="custom-control-input group1-checkbox" name="g1Check[]" id="g1_2Check${key}" ${checked} ${onclickfalse}>
                                    <label class="custom-control-label" for="g1_2Check${key}">${result[key].app_user}</label>
                                </div>
                            `;
                        }else if(result[key].app_posiname == "รองกรรมการผู้จัดการ"){
                            html2 +=`
                                <div class="checkbox custom-control custom-checkbox mb-2">
                                    <input type="checkbox" value="${result[key].app_ecode}" class="custom-control-input group2-checkbox" name="g1Check[]" id="g1_3Check${key}" ${checked} ${onclickfalse}>
                                    <label class="custom-control-label" for="g1_3Check${key}">${result[key].app_user}</label>
                                </div>
                            `;
                        }
                    }
                    $('#show_group11').html(html);
                    $('#show_group12').html(html1);
                    $('#show_group13').html(html2);

                    $('#btn-save-mgr').prop('disabled' , true);
                    $('.group1-checkbox').change(function() {
                        if ($('.group1-checkbox:checked').length > 1) {
                            this.checked = false;
                            alert('คุณสามารถเลือกได้เพียง 1 ท่านนกลุ่มนี้');
                        } else if ($('.group1-checkbox:checked').length == 1) {
                            $('.group2-checkbox').prop('disabled', true);
                            $('#btn-save-mgr').prop('disabled' , false);
                        } else {
                            $('.group2-checkbox').prop('disabled', false);
                            $('#btn-save-mgr').prop('disabled' , true);
                        }
                    });

                    $('.group2-checkbox').change(function() {
                        const checkedCount = $('.group2-checkbox:checked').length;
                        
                        if (checkedCount > 3) {
                            this.checked = false;
                            alert('คุณสามารถเลือกได้ไม่เกิน 3 ท่านในกลุ่มนี้');
                        } else {
                            if (checkedCount > 0) {
                                $('.group1-checkbox').prop('disabled', true);
                            } else {
                                $('.group1-checkbox').prop('disabled', false);
                            }

                            if (checkedCount < 3) {
                                $('#btn-save-mgr').prop('disabled' , true);
                            }else{
                                $('#btn-save-mgr').prop('disabled' , false);
                            }
                        }
                    });
                }
            });
        },
        getdataG0()
        {
            const formdata = new FormData();
            formdata.append("action" , "getdataG0");
            axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/getdataG0' , formdata , {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    //code
                    let result = res.data.result;
                    let html = '';
                    for(const key in result){
                        let checked = this.userApp_prop.includes(result[key].app_ecode) ? 'checked' : '';
                        html +=`
                            <div class="checkbox custom-control custom-checkbox mb-2">
                                <input type="checkbox" value="${result[key].app_ecode}" class="custom-control-input group0-checkbox" name="g0Check[]" id="g0Check${key}" ${checked}>
                                <label class="custom-control-label" for="g0Check${key}">${result[key].app_user}</label>
                            </div>
                        `;
                    }
                    $('#show_group0').html(html);
                    $('#btn-save-mgr').prop('disabled' , true);
                    $('.group0-checkbox').change(function() {
                        if ($('.group0-checkbox:checked').length == 6) {
                            $('#btn-save-mgr').prop('disabled' , false);
                        }else{
                            $('#btn-save-mgr').prop('disabled' , true);
                        }
                    });
                }
            });
        },
    },
    created() {
        this.$store.dispatch('getdata_datetimenow');
    },
    mounted() {
        const proxy = this;
        proxy.mgrCheckStatus();
        $('input:radio[name="ip-mgr-app"]').change(function(){
            if($(this).val() == "yes"){
                if(proxy.paygroup_prop == "4"){
                    //code
                    proxy.getdataG4();
                    proxy.ctrlG4 = true;
                }else if(proxy.paygroup_prop == "3"){
                    proxy.getdataG3();
                    proxy.ctrlG3 = true;
                }else if(proxy.paygroup_prop == "2"){
                    proxy.getdataG2();
                    proxy.ctrlG2 = true;
                }else if(proxy.paygroup_prop == "1"){
                    proxy.getdataG1();
                    proxy.ctrlG1 = true;
                }else if(proxy.paygroup_prop == "0"){
                    proxy.getdataG0();
                    proxy.ctrlG0 = true;
                }
            }else{
                proxy.ctrlG4 = false;
                proxy.ctrlG3 = false;
                proxy.ctrlG2 = false;
                proxy.ctrlG1 = false;
                proxy.ctrlG0 = false;
                $('#btn-save-mgr').prop('disabled' , false);
            }
        });

        if(proxy.approveMgr_prop == "yes"){
            if(proxy.paygroup_prop == "4"){
                //code
                proxy.getdataG4();
                proxy.ctrlG4 = true;
            }else if(proxy.paygroup_prop == "3"){
                proxy.getdataG3();
                proxy.ctrlG3 = true;
            }else if(proxy.paygroup_prop == "2"){
                proxy.getdataG2();
                proxy.ctrlG2 = true;
            }else if(proxy.paygroup_prop == "1"){
                proxy.getdataG1();
                proxy.ctrlG1 = true;
            }else if(proxy.paygroup_prop == "0"){
                proxy.getdataG0();
                proxy.ctrlG0 = true;
            }
        }
    },
    computed: {
        docdatetime() {
            return this.$store.getters.get_datetimeNow;
        },
        userpostMgr()
        {
            return this.userData.Fname+' '+this.userData.Lname;
        }
    },
    watch:{
        status(){
            this.mgrCheckStatus();
        }
    }
}
</script>

<style>

</style>