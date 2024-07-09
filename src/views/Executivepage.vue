<template>
  <div id="excutivepage">
    <!-- Group 4 -->
    <div id="show_executiveGroup4" v-if="showExeGroup4">
        <div class="row">
            <div class="col-xl-12 mb-30">
                <div class="card-box height-100-p pd-20">
                    <div class="row form-group">
                        <div class="col-md-12 text-center">
                            <h5 id="executiveText">ผู้จัดการท่านที่ 2 อนุมัติ</h5>
                        </div>
                        <hr>
                    </div>

                    <form id="frm-exeG4-approve" autocomplete="off" class="needs-validation" novalidate @submit.prevent="saveExecutiveG4">
                    <div class="row form-group">
                        <div class="col-md-12 radio-container">
                            <div class="custom-control custom-radio mb-5">
                                <input type="radio" id="ip-exeG4-app-yes" name="ip-exeG4-app" class="custom-control-input" value="yes" required v-model="exedataGroup4.appType" :onclick="exedataGroup4.appClick">
                                <label class="custom-control-label" for="ip-exeG4-app-yes">อนุมัติ</label>
                            </div>
                            <div class="custom-control custom-radio mb-5">
                                <input type="radio" id="ip-exeG4-app-no" name="ip-exeG4-app" class="custom-control-input" value="no" required v-model="exedataGroup4.appType" :onclick="exedataGroup4.appClick">
                                <label class="custom-control-label" for="ip-exeG4-app-no">ไม่อนุมัติ</label>
                            </div>
                        </div>
                        <div class="col-md-12 form-group">
                            <label for=""><b>หมายเหตุ</b></label>
                            <textarea class="form-control" name="ip-exeG4-memo" id="ip-exeG4-memo" cols="30" rows="10" v-model="exedataGroup4.appMemo" :readonly="exedataGroup4.isReadonly"></textarea>
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>ผู้อนุมัติ</b></label>
                            <input type="text" name="ip-exeG4-userpost" id="ip-exeG4-userpost" class="form-control" readonly v-model="exedataGroup4.appUser">
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>รหัสพนักงาน</b></label>
                            <input type="text" name="ip-exeG4-ecodepost" id="ip-exeG4-ecodepost" class="form-control" readonly v-model="exedataGroup4.appEcode">
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>วันที่</b></label>
                            <input type="text" name="ip-exeG4-datetimepost" id="ip-exeG4-datetimepost" class="form-control" readonly v-model="exedataGroup4.appDatetime">
                        </div>
                        <div class="col-md-12 form-group">
                            <button v-if="exedataGroup4.appBtn4" type="submit" id="btn-save-exeG4" class="btn btn-primary">บันทึก</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Group 4 -->

    <!-- Group 3 -->
    <div id="show_executiveGroup3" v-if="showExeGroup3">
        <div class="row">
            <div class="col-xl-12 mb-30">
                <div class="card-box height-100-p pd-20">
                    <div class="row form-group">
                        <div class="col-md-12 text-center">
                            <h5 id="executiveText">รองกรรมการผู้จัดการ</h5>
                        </div>
                        <hr>
                    </div>

                    <form id="frm-exeG3-approve" autocomplete="off" class="needs-validation" novalidate @submit.prevent="saveExecutiveG3">
                    <div class="row form-group">
                        <div class="col-md-12 radio-container">
                            <div class="custom-control custom-radio mb-5">
                                <input type="radio" id="ip-exeG3-app-yes" name="ip-exeG3-app" class="custom-control-input" value="yes" required v-model="exedataGroup3.appType" :onclick="exedataGroup3.appClick">
                                <label class="custom-control-label" for="ip-exeG3-app-yes">อนุมัติ</label>
                            </div>
                            <div class="custom-control custom-radio mb-5">
                                <input type="radio" id="ip-exeG3-app-no" name="ip-exeG3-app" class="custom-control-input" value="no" required v-model="exedataGroup3.appType" :onclick="exedataGroup3.appClick">
                                <label class="custom-control-label" for="ip-exeG3-app-no">ไม่อนุมัติ</label>
                            </div>
                        </div>
                        <div class="col-md-12 form-group">
                            <label for=""><b>หมายเหตุ</b></label>
                            <textarea class="form-control" name="ip-exeG3-memo" id="ip-exeG3-memo" cols="30" rows="10" v-model="exedataGroup3.appMemo" :readonly="exedataGroup3.isReadonly"></textarea>
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>ผู้อนุมัติ</b></label>
                            <input type="text" name="ip-exeG3-userpost" id="ip-exeG3-userpost" class="form-control" readonly v-model="exedataGroup3.appUser">
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>รหัสพนักงาน</b></label>
                            <input type="text" name="ip-exeG3-ecodepost" id="ip-exeG3-ecodepost" class="form-control" readonly v-model="exedataGroup3.appEcode">
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>วันที่</b></label>
                            <input type="text" name="ip-exeG3-datetimepost" id="ip-exeG3-datetimepost" class="form-control" readonly v-model="datetimenow_prop">
                        </div>
                        <div class="col-md-12 form-group">
                            <button v-if="exedataGroup3.appBtn3" type="submit" id="btn-save-exeG3" class="btn btn-primary">บันทึก</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Group 3 -->

    <!-- Group 2 -->
    <div id="show_executiveGroup2" v-if="showExeGroup2">
        <div class="row" v-for="(item , index) in exedataGroup2" :key="index">
            <div class="col-xl-12 mb-30">
                <div class="card-box height-100-p pd-20">
                    <div class="row form-group">
                        <div class="col-md-12 text-center">
                            <h5 id="executiveText">รองกรรมการผู้จัดการ</h5>
                        </div>
                        <hr>
                    </div>

                    <form autocomplete="off" class="needs-validation" novalidate @submit.prevent="saveExecutiveG2(index , item)">
                    <div class="row form-group">
                        <div class="col-md-12 radio-container">
                            <div class="custom-control custom-radio mb-5">
                                <input type="radio" :id="'ip-exeG2-app-yes-'+index" name="ip-exeG2-app" class="custom-control-input" value="yes" required v-model="item.apv_approve">
                                <label class="custom-control-label" :for="'ip-exeG2-app-yes-'+index">อนุมัติ</label>
                            </div>
                            <div class="custom-control custom-radio mb-5">
                                <input type="radio" :id="'ip-exeG2-app-no-'+index" name="ip-exeG2-app" class="custom-control-input" value="no" required v-model="item.apv_approve">
                                <label class="custom-control-label" :for="'ip-exeG2-app-no-'+index">ไม่อนุมัติ</label>
                            </div>
                        </div>
                        
                        <div class="col-md-12 form-group">
                            <label for=""><b>หมายเหตุ</b></label>
                            <textarea class="form-control" name="ip-exeG2-memo" id="ip-exeG2-memo" cols="30" rows="10" v-model="item.apv_approve_memo"></textarea>
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>ผู้อนุมัติ</b></label>
                            <input type="text" name="ip-exeG2-userpost" id="ip-exeG2-userpost" class="form-control" readonly :value="item.apv_user">
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>รหัสพนักงาน</b></label>
                            <input type="text" name="ip-exeG2-ecodepost" id="ip-exeG2-ecodepost" class="form-control" readonly :value="item.apv_ecode">
                        </div>
                        <div v-if="item.apv_approve === null" class="col-md-4 form-group">
                            <label for=""><b>วันที่</b></label>
                            <input type="text" name="ip-exeG2-datetimepost" id="ip-exeG2-datetimepost" class="form-control" readonly :value="datetimenow_prop">
                        </div>
                        <div v-else class="col-md-4 form-group">
                            <label for=""><b>วันที่</b></label>
                            <input type="text" name="ip-exeG2-datetimepost" id="ip-exeG2-datetimepost" class="form-control" readonly v-model="item.apv_approve_datetime">
                        </div>
                        <div class="col-md-12 form-group">
                            <button v-if="item.apv_approve_user === null" type="submit" id="btn-save-exeG2" class="btn btn-primary">บันทึก</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Group 2 -->

    <!-- Group 1 -->
    <div id="show_executiveGroup1" v-if="showExeGroup1">
        <div class="row" v-for="(item , index) in exedataGroup1" :key="index">
            <div class="col-xl-12 mb-30">
                <div class="card-box height-100-p pd-20">
                    <div class="row form-group">
                        <div class="col-md-12 text-center">
                            <h5 id="executiveText">{{item.apv_posiname}}</h5>
                        </div>
                        <hr>
                    </div>

                    <form autocomplete="off" class="needs-validation" novalidate @submit.prevent="saveExecutiveG1(index , item)">
                    <div class="row form-group">
                        <div class="col-md-12 radio-container">
                            <div class="custom-control custom-radio mb-5">
                                <input type="radio" :id="'ip-exeG1-app-yes-'+index" name="ip-exeG1-app" class="custom-control-input" value="yes" required v-model="item.apv_approve">
                                <label class="custom-control-label" :for="'ip-exeG1-app-yes-'+index">อนุมัติ</label>
                            </div>
                            <div class="custom-control custom-radio mb-5">
                                <input type="radio" :id="'ip-exeG1-app-no-'+index" name="ip-exeG1-app" class="custom-control-input" value="no" required v-model="item.apv_approve">
                                <label class="custom-control-label" :for="'ip-exeG1-app-no-'+index">ไม่อนุมัติ</label>
                            </div>
                        </div>
                        
                        <div class="col-md-12 form-group">
                            <label for=""><b>หมายเหตุ</b></label>
                            <textarea class="form-control" name="ip-exeG1-memo" id="ip-exeG1-memo" cols="30" rows="10" v-model="item.apv_approve_memo"></textarea>
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>ผู้อนุมัติ</b></label>
                            <input type="text" name="ip-exeG1-userpost" id="ip-exeG1-userpost" class="form-control" readonly :value="item.apv_user">
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>รหัสพนักงาน</b></label>
                            <input type="text" name="ip-exeG1-ecodepost" id="ip-exeG1-ecodepost" class="form-control" readonly :value="item.apv_ecode">
                        </div>
                        <div v-if="item.apv_approve === null" class="col-md-4 form-group">
                            <label for=""><b>วันที่</b></label>
                            <input type="text" name="ip-exeG1-datetimepost" id="ip-exeG1-datetimepost" class="form-control" readonly :value="datetimenow_prop">
                        </div>
                        <div v-else class="col-md-4 form-group">
                            <label for=""><b>วันที่</b></label>
                            <input type="text" name="ip-exeG1-datetimepost" id="ip-exeG1-datetimepost" class="form-control" readonly v-model="item.apv_approve_datetime">
                        </div>
                        <div class="col-md-12 form-group">
                            <button v-if="item.apv_approve_user === null" type="submit" id="btn-save-exeG1" class="btn btn-primary">บันทึก</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Group 1 -->

    <!-- Group 0 -->
    <div id="show_executiveGroup0" v-if="showExeGroup0">
        <div class="row" v-for="(item , index) in exedataGroup0" :key="index">
            <div class="col-xl-12 mb-30">
                <div class="card-box height-100-p pd-20">
                    <div class="row form-group">
                        <div class="col-md-12 text-center">
                            <h5 id="executiveText">{{item.apv_posiname}}</h5>
                        </div>
                    </div>
                    <hr>

                    <form autocomplete="off" class="needs-validation" novalidate @submit.prevent="saveExecutiveG0(index , item)">
                    <div class="row form-group">
                        <div class="col-md-12 radio-container">
                            <div class="custom-control custom-radio mb-5">
                                <input type="radio" :id="'ip-exeG0-app-yes-'+index" name="ip-exeG0-app" class="custom-control-input" value="yes" required v-model="item.apv_approve" @click="handleClick($event , item.apv_approve_user)">
                                <label class="custom-control-label" :for="'ip-exeG0-app-yes-'+index">อนุมัติ</label>
                            </div>
                            <div class="custom-control custom-radio mb-5">
                                <input type="radio" :id="'ip-exeG0-app-no-'+index" name="ip-exeG0-app" class="custom-control-input" value="no" required v-model="item.apv_approve" @click="handleClick($event , item.apv_approve_user)">
                                <label class="custom-control-label" :for="'ip-exeG0-app-no-'+index">ไม่อนุมัติ</label>
                            </div>
                        </div>
                        
                        <div class="col-md-12 form-group">
                            <label for=""><b>หมายเหตุ</b></label>
                            <textarea class="form-control" name="ip-exeG0-memo" id="ip-exeG0-memo" cols="30" rows="10" v-model="item.apv_approve_memo" :disabled="item.apv_approve_user !== null"></textarea>
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>ผู้อนุมัติ</b></label>
                            <input type="text" name="ip-exeG0-userpost" id="ip-exeG0-userpost" class="form-control" readonly :value="item.apv_user" :disabled="item.apv_approve_user !== null">
                        </div>
                        <div class="col-md-4 form-group">
                            <label for=""><b>รหัสพนักงาน</b></label>
                            <input type="text" name="ip-exeG0-ecodepost" id="ip-exeG0-ecodepost" class="form-control" readonly :value="item.apv_ecode" :disabled="item.apv_approve_user !== null">
                        </div>
                        <div v-if="item.apv_approve_user === null" class="col-md-4 form-group">
                            <label for=""><b>วันที่</b></label>
                            <input type="text" name="ip-exeG0-datetimepost" id="ip-exeG0-datetimepost" class="form-control" readonly :value="datetimenow_prop" :disabled="item.apv_approve_user !== null">
                        </div>
                        <div v-else class="col-md-4 form-group">
                            <label for=""><b>วันที่</b></label>
                            <input type="text" name="ip-exeG0-datetimepost" id="ip-exeG0-datetimepost" class="form-control" readonly v-model="item.apv_approve_datetime" :disabled="item.apv_approve_user !== null">
                        </div>
                        <div class="col-md-12 form-group">
                            <button v-if="item.apv_approve_user === null && item.apv_ecode === userData.ecode" type="submit" id="btn-save-exeG0" class="btn btn-primary">บันทึก</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Group 0 -->
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import $ from 'jquery'
export default {
    name:"Excutivepage",
    data() {
        return {
            url:this.getUrl(),
            userData:this.getSessionStorage(),

            showExeGroup4:false,
            showExeGroup3:false,
            showExeGroup2:false,
            showExeGroup1:false,
            showExeGroup0:false,
            exedataGroup4:{
                appType:'',
                appUser:'',
                appEcode:'',
                appDatetime:'',
                appMemo:'',
                appBtn4:true,
                appCheck:'',
                appClick:'',
                isReadonly:false
            },
            exedataGroup3:{
                appType:'',
                appUser:'',
                appEcode:'',
                appDatetime:'',
                appMemo:'',
                appBtn:true,
                appCheck:'',
                appBtn3:true,
                appClick:'',
                isReadonly:false
            },
            exedataGroup2:[],
            exedataGroup1:[],
            exedataGroup0:[]
        }
    },
    props:[
        'paygroup_prop',
        'datetimenow_prop',
        'formno',
        'status',
        'dataareaid_prop',
        'userApp_prop'
    ],
    methods: {
        getExecutiveData()
        {
            const proxy = this;
            if(proxy.userApp_prop.length != 0){
                const formdata = new FormData();
                formdata.append('formno' , proxy.formno);
                formdata.append('action' , 'getExecutiveData');
                axios.post(proxy.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/getExecutiveData' , formdata , {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        let result = res.data.result;
                        if(proxy.paygroup_prop == "4"){
                            proxy.showExeGroup4 = true;
                            if(result[0].apv_approve == "yes" || result[0].apv_approve == "no"){
                                proxy.exedataGroup4.appBtn4 = false;
                                proxy.exedataGroup4.appUser = result[0].apv_approve_user;
                                proxy.exedataGroup4.appEcode = result[0].apv_ecode;
                                proxy.exedataGroup4.appDatetime = result[0].apv_approve_datetime;
                                proxy.exedataGroup4.appType = result[0].apv_approve;
                                proxy.exedataGroup4.appMemo = result[0].apv_approve_memo;
                                if(proxy.exedataGroup4.appType == "yes"){
                                    $('#ip-exeG4-app-yes').prop('checked' , true);
                                }else if(proxy.exedataGroup4.appType == "no"){
                                    $('#ip-exeG4-app-no').prop('checked' , true);
                                }
                                this.exedataGroup4.appClick = 'return false';
                                                                this.exedataGroup4.isReadonly = true;
                            }else{
                                if(this.userData.ecode == result[0].apv_ecode){
                                    this.exedataGroup4.appBtn4 = true;
                                }else{
                                    this.exedataGroup4.appBtn4 = false;
                                    this.exedataGroup4.appClick = 'return false';
                                }
                                proxy.exedataGroup4.appUser = result[0].apv_user;
                                proxy.exedataGroup4.appEcode = result[0].apv_ecode;
                                proxy.exedataGroup4.appDatetime = proxy.datetimenow_prop
                            }
                        }else if(proxy.paygroup_prop == "3"){
                            proxy.showExeGroup3 = true;
                            if(result[0].apv_approve == "yes" || result[0].apv_approve == "no"){
                                proxy.exedataGroup3.appBtn3 = false;
                                proxy.exedataGroup3.appUser = result[0].apv_approve_user;
                                proxy.exedataGroup3.appEcode = result[0].apv_ecode;
                                proxy.exedataGroup3.appDatetime = result[0].apv_approve_datetime;
                                proxy.exedataGroup3.appType = result[0].apv_approve;
                                proxy.exedataGroup3.appMemo = result[0].apv_approve_memo;
                                if(proxy.exedataGroup3.appType == "yes"){
                                    $('#ip-exeG3-app-yes').prop('checked' , true);
                                }else if(proxy.exedataGroup3.appType == "no"){
                                    $('#ip-exeG3-app-no').prop('checked' , true);
                                }
                                this.exedataGroup3.appClick = 'return false';
                                this.exedataGroup3.isReadonly = true;
                            }else{
                                if(this.userData.ecode == result[0].apv_ecode){
                                    this.exedataGroup3.appBtn3 = true;
                                }else{
                                    this.exedataGroup3.appBtn3 = false;
                                    this.exedataGroup3.appClick = 'return false';
                                }
                                proxy.exedataGroup3.appUser = result[0].apv_user;
                                proxy.exedataGroup3.appEcode = result[0].apv_ecode;
                                proxy.exedataGroup3.appDatetime = proxy.datetimenow_prop
                            }
                        }else if(proxy.paygroup_prop == "2"){
                            proxy.showExeGroup2 = true;
                            proxy.exedataGroup2 = result;
                        }else if(proxy.paygroup_prop == "1"){
                            proxy.showExeGroup1 = true;
                            proxy.exedataGroup1 = result;
                        }else if(proxy.paygroup_prop == "0"){
                            this.showExeGroup0 = true;
                            this.exedataGroup0 = result;
                        }
                    }
                });
            }
        },
        saveExecutiveG4()
        {
            $('#btn-save-exeG4').prop('disabled' , true);
            const proxy = this;
            const formdata = new FormData();
            formdata.append('appType' , this.exedataGroup4.appType);
            formdata.append('appUser' , this.exedataGroup4.appUser);
            formdata.append('appEcode' , this.exedataGroup4.appEcode);
            formdata.append('appDatetime' , this.datetimenow_prop);
            formdata.append('appMemo' , this.exedataGroup4.appMemo);
            formdata.append('formno' , this.formno);
            formdata.append('action' , 'saveExecutiveG4');
            axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/saveExecutiveG4' , formdata , {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                console.log(res.data);
                $('#btn-save-exeG4').prop('disabled' , false);
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
        },
        saveExecutiveG3()
        {
            $('#btn-save-exeG3').prop('disabled' , true);
            const proxy = this;
            const formdata = new FormData();
            formdata.append('appType' , this.exedataGroup3.appType);
            formdata.append('appUser' , this.exedataGroup3.appUser);
            formdata.append('appEcode' , this.exedataGroup3.appEcode);
            formdata.append('appDatetime' , this.datetimenow_prop);
            formdata.append('appMemo' , this.exedataGroup3.appMemo);
            formdata.append('formno' , this.formno);
            formdata.append('action' , 'saveExecutiveG3');
            axios.post(this.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/saveExecutiveG3' , formdata , {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                console.log(res.data);
                $('#btn-save-exeG3').prop('disabled' , false);
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
        },
        saveExecutiveG2(index , item)
        {
            const proxy = this;
            const formdata = new FormData();
            formdata.append('formno', proxy.formno);
            formdata.append('approval', item.apv_approve);
            formdata.append('memo', item.apv_approve_memo);
            formdata.append('userpost', item.apv_user);
            formdata.append('ecodepost', item.apv_ecode);
            formdata.append('datetimepost', proxy.datetimenow_prop);
            formdata.append('action', 'saveExecutiveG2');
            axios.post(proxy.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/saveExecutiveG2', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res=>{
                console.log(res.data);
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
            })
        },
        saveExecutiveG1(index , item)
        {
            const proxy = this;
            const formdata = new FormData();
            formdata.append('formno', proxy.formno);
            formdata.append('approval', item.apv_approve);
            formdata.append('memo', item.apv_approve_memo);
            formdata.append('userpost', item.apv_user);
            formdata.append('ecodepost', item.apv_ecode);
            formdata.append('datetimepost', proxy.datetimenow_prop);
            formdata.append('action', 'saveExecutiveG1');
            axios.post(proxy.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/saveExecutiveG1', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res=>{
                console.log(res.data);
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
            })
        },
        saveExecutiveG0(index , item)
        {
            const proxy = this;
            const formdata = new FormData();
            formdata.append('formno', proxy.formno);
            formdata.append('approval', item.apv_approve);
            formdata.append('memo', item.apv_approve_memo);
            formdata.append('userpost', item.apv_user);
            formdata.append('ecodepost', item.apv_ecode);
            formdata.append('datetimepost', proxy.datetimenow_prop);
            formdata.append('action', 'saveExecutiveG0');
            axios.post(proxy.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/saveExecutiveG0', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res=>{
                console.log(res.data);
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
            })
        },
        executiveCheckStatus()
        {
            if(this.status == "Executive Group 4 Approved"){
                $("input[name='ip-exeG4-app']").attr('onclick' , 'return false');
            }else if(this.status == "Executive Group 3 Approved"){
                $('#ip-exeG3-memo').prop('readonly' , true);
            }
        },
        handleClick(event , userApp)
        {
            if(userApp !== null){
                event.preventDefault();
            }else{
                return true;
            }
        }
    },
    created() {

    },
    mounted() {
        this.getExecutiveData();
        this.executiveCheckStatus();
    },
    computed: {
        
    },
    watch:{
        datetimenow_prop: {
            handler() {
                this.getExecutiveData();
            },
            immediate: true,
            deep: true
        }
    }
}
</script>

<style>

</style>