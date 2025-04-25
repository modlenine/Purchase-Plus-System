<template>
  <div id="compare_confirm">
    <div class="row">
      <div class="col-md-12 mb-30">
        <div class="card-box height-100-p pd-20">
          <h3 class="text-center">ผู้จัดการอนุมัติ</h3>
          <hr />
          <div class="row justify-content-center text-center">
            <div class="col-md-12 form-group">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input radioChooseVendor"
                  type="radio"
                  id="approve"
                  value="yes"
                  v-model="approvalStatus"
                  :disabled="defaultStatus"
                />
                <label class="form-check-label ml-1" for="approve"
                  >อนุมัติ</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input radioChooseVendor"
                  type="radio"
                  id="reject"
                  value="no"
                  v-model="approvalStatus"
                  :disabled="defaultStatus"
                />
                <label class="form-check-label ml-1" for="reject"
                  >ไม่อนุมัติ</label
                >
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-group">
              <label for=""><b>หมายเหตุ</b></label>
              <textarea
                name="app-memo"
                id="app-memo"
                class="form-control app-memo"
                v-model="approvalMemo"
                :disabled="defaultStatus"
              ></textarea>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 form-group">
              <label for=""><b>ผู้อนุมัติ</b></label>
              <input
                type="text"
                name="app-userApp"
                id="app-userApp"
                class="form-control"
                :value="user_approval || userData.Fname + ' ' + userData.Lname"
                readonly
              />
            </div>
            <div class="col-md-4 form-group">
              <label for=""><b>รหัสพนักงาน</b></label>
              <input
                type="text"
                name="app-ecodeApp"
                id="app-ecodeApp"
                class="form-control"
                :value="ecode_approval || userData.ecode"
                readonly
              />
            </div>
            <div class="col-md-4 form-group">
              <label for=""><b>วันที่</b></label>
              <input
                type="text"
                name="app-datetimeApp"
                id="app-datetimeApp"
                class="form-control"
                :value="datetime_approval || docdatetime"
                readonly
              />
            </div>
          </div>

          <div class="row" v-if="btnApp">
            <div class="col-md-4"></div>
            <div class="col-md-4 form-group">
                <button type="button" class="btn btn-primary btn-block" @click="saveManagerApprove" :disabled="isClick">บันทึกข้อมูล</button>
            </div>
            <div class="col-md-4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: "Compare_confirm",
  props: ["userData", "formno", "compare_id", "last_updated" , "btnApp" , "defaultStatus" , "defaultMemo" , "user_approval" , "ecode_approval" , "datetime_approval" , "compare_status"],
  data() {
    return {
      approvalStatus: this.defaultStatus || "",
      approvalMemo: this.defaultMemo || "",
      url: this.getUrl(),
      isClick:false
    };
  },
  methods: {
    async saveManagerApprove() {
      let fullname = this.userData.Fname + " " + this.userData.Lname;
      this.isClick = true;
      if(!this.approvalStatus){
        Swal.fire('กรุณาเลือกการอนุมัติ', '', 'error');
        this.isClick = false;
        return;
      }
      try {
        const formdata = new FormData();
        formdata.append("formno", this.formno);
        formdata.append("compare_id", this.compare_id);
        formdata.append("approvalStatus", this.approvalStatus);
        formdata.append("approvalMemo", this.approvalMemo);
        formdata.append("userApprove", fullname);
        formdata.append("ecodeApprove", this.userData.ecode);
        formdata.append("last_updated", this.last_updated);
        const res = await axios.post(
          this.url +
            "intsys/purchaseplus/purchaseplus_backend/compareapi/saveManagerApprove",
          formdata
        );
        if (res.data.status === "success") {
          //code
          Swal.fire("บันทึกข้อมูลสำเร็จ", "", "success").then(() => {
            this.$router.push({ 
                name: "Comparevendorlist",
                params: { reloadKey: Date.now() }
            });
          });
        }
      } catch (error) {
        console.error(error);
      }finally{
        this.isClick = false;
      }
    },
  },
  mounted() {
    this.$store.dispatch("setDatetimeNow");
  },
  computed: {
    docdatetime() {
      return this.$store.getters.get_datetimeNow;
    },
  },
};
</script>

<style scoped>
.radioChooseVendor {
  width: 20px;
  height: 20px;
  border-color: blue;
}
.radioChooseVendor:hover {
  cursor: pointer;
}
.app-memo {
  height: 100px;
}
</style>