<template>
  <div id="investigator">
      <div class="row">
        <div class="col-xl-12 mb-30">
            <div class="card-box height-100-p pd-20">
                <div class="row form-group">
                    <div class="col-md-12 text-center">
                        <h5>ผู้ตรวจสอบอนุมัติ</h5>
                    </div>
                </div>
                <hr>

                <form id="frm-inves-approve" autocomplete="off" class="needs-validation" novalidate @submit.prevent="saveInvesApprove">
                <div class="row form-group">
                    <div class="col-md-12 radio-container">
                        <div class="custom-control custom-radio mb-5">
                            <input type="radio" id="ip-inves-app-yes" name="ip-inves-app" class="custom-control-input" value="yes" required v-model="invesApproveType">
                            <label class="custom-control-label" for="ip-inves-app-yes">อนุมัติ</label>
                        </div>
                        <div class="custom-control custom-radio mb-5">
                            <input type="radio" id="ip-inves-app-no" name="ip-inves-app" class="custom-control-input" value="no" required v-model="invesApproveType">
                            <label class="custom-control-label" for="ip-inves-app-no">ไม่อนุมัติ</label>
                        </div>
                    </div>
                    
                    <div class="col-md-12 form-group">
                        <label for=""><b>หมายเหตุ</b></label>
                        <textarea class="form-control" name="ip-inves-memo" id="ip-inves-memo" cols="30" rows="10" v-model="invesMemo"></textarea>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for=""><b>ผู้อนุมัติ</b></label>
                        <input type="text" name="ip-inves-userpost" id="ip-inves-userpost" class="form-control" v-model="invesUserpost" readonly>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for=""><b>รหัสพนักงาน</b></label>
                        <input type="text" name="ip-inves-ecodepost" id="ip-inves-ecodepost" class="form-control" v-model="invesEcodepost" readonly>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for=""><b>วันที่</b></label>
                        <input type="text" name="ip-inves-datetimepost" id="ip-inves-datetimepost" class="form-control" v-model="invesDatetimepost" readonly>
                    </div>
                    <div class="col-md-12 form-group">
                        <button v-if="btnsaveInves == true" type="submit" id="btn-save-inves" class="btn btn-primary"><i class="dw dw-diskette1 mr-2"></i>บันทึก</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"Investigator",
    data() {
      return {
        url:this.getUrl(),
        userData:this.getSessionStorage(),
        invesApproveType:'',
        invesMemo:'',
        invesUserpost:'',
        invesEcodepost:'',
        invesDatetimepost:'',
        btnsaveInves:false,
      }
    },
    methods: {
      
    },
}
</script>

<style>

</style>