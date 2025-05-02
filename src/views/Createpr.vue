<template>
  <div id="createpr">
    <div class="modal fade bs-example-modal-lg" id="addItem_modal" tabindex="-1" role="dialog"
      aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="myLargeModalLabel">
              หน้าเพิ่มรายการสินค้า <b>[ สกุลเงิน {{ currency }} ]</b>
            </h6>
            <button type="button" class="close btn-close-additem" data-dismiss="modal" aria-hidden="true"
              @click="closeModal">
              ×
            </button>
          </div>
          <form id="frm-insert-item" autocomplete="off" class="needs-validation" novalidate
            @submit.prevent="insertItemdata">
            <div class="modal-body">
              <div class="row form-group">
                <div class="col-md-6 form-group">
                  <label for=""><b>รหัสสินค้า</b></label>
                  <input type="text" name="ipmd-cpr-itemid" id="ipmd-cpr-itemid" class="form-control" v-model="itemid"
                    @keyup="getItemid" required />
                  <div id="show_itemidDetail"></div>
                </div>
                <div class="col-md-6 form-group">
                  <label for=""><b>ชื่อสินค้า</b></label>
                  <input type="text" name="ipmd-cpr-itemname" id="ipmd-cpr-itemname" class="form-control"
                    v-model="itemname" readonly />
                </div>
                <div class="col-md-12 form-group">
                  <label for=""><b>รายละเอียด</b></label>
                  <textarea name="ipmd-cpr-itemdetail" id="ipmd-cpr-itemdetail" cols="30" rows="10" class="form-control"
                    v-model="itemdetail" required></textarea>
                </div>
                <div class="col-md-6 form-group">
                  <label for=""><b>จำนวน</b></label>
                  <input type="number" name="ipmd-cpr-itemqty" id="ipmd-cpr-itemqty" class="form-control"
                    v-model="itemqty" required @keyup="calcPrice" />
                </div>
                <div class="col-md-6 form-gro">
                  <label for=""><b>ราคาต่อหน่วย</b></label>
                  <input type="number" name="ipmd-cpr-itemprice" id="ipmd-cpr-itemprice" class="form-control"
                    v-model="itemprice" required @keyup="calcPrice" />
                </div>
                <div class="col-md-6 form-group">
                  <label for=""><b>ส่วนลด</b></label>
                  <input type="number" name="ipmd-cpr-itemdiscount" id="ipmd-cpr-itemdiscount" class="form-control"
                    v-model="itemdiscount" @keyup="calcPrice" />
                </div>
                <div class="col-md-6 form-group">
                  <label for=""><b>ราคารวม</b></label>
                  <input type="number" name="ipmd-cpr-itempriceSum" id="ipmd-cpr-itempriceSum" class="form-control"
                    readonly v-model="itempricesum" />
                </div>
                <div class="col-md-12 form-group">
                  <label for=""><b>หน่วยนับ</b></label>
                  <input type="text" name="ipmd-cpr-unit" id="ipmd-cpr-unit" class="form-control" v-model="itemunit" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
              <button type="submit" class="btn btn-primary">
                <i class="dw dw-diskette1 mr-2"></i>บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="pd-ltr-20">
        <div class="row">
          <div class="col-xl-12 mb-30">
            <form id="frm_main" autocomplete="off" class="needs-validation" novalidate @submit.prevent="saveDataAll">
              <div class="card-box height-100-p pd-20">
                <div class="row form-group">
                  <div class="col-md-12 form-group">
                    <h4 style="text-align: center">
                      หน้าสร้างรายการ PR
                    </h4>
                  </div>
                </div>
                <hr />

                <div class="row form-group">
                  <div class="col-md-12 form-group">
                    <label for=""><b>เอกสาร Compare Vendor</b></label>
                    <input type="text" class="form-control" v-model="searchCompareText" @input="searchCompareVendor"
                      placeholder="กรอกชื่อผู้ขาย, รหัสผู้ขาย , ชื่อสินค้า หรือเลขที่ฟอร์ม" />
                    <ul v-if="compareSuggestions.length > 0" class="list-group mt-2">
                      <li class="list-group-item" v-for="(item, index) in compareSuggestions" :key="index"
                        @click="selectCompare(item)" style="cursor: pointer">
                        {{ item.formno }} - {{ item.vendor_name }} ({{
                          item.accountnum
                        }}) - ({{ item.itemdetails }})
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-4 form-group">
                    <label for=""><b>สังกัดบริษัท</b></label>
                    <select name="ip-cpr-areaid" id="ip-cpr-areaid" class="form-control" v-model="dataareaid"
                      @change="getdataByAreaid" required>
                      <option value="">กรุณาเลือกบริษัท</option>
                      <option value="sln">
                        Salee Colour Public Company Limited.
                      </option>
                      <!-- <option value="poly">Poly Meritasia Co.,Ltd.</option> -->
                      <option value="ca">Composite Asia Co.,Ltd.</option>
                      <!-- <option value="st">Subterra Co.,Ltd.</option>
                      <option value="tbb">The bubbles Co.,Ltd.</option> -->
                    </select>
                  </div>
                  <div class="col-md-4 form-group">
                    <label for=""><b>หมวดหมู่เอกสาร</b></label>
                    <select class="form-control" name="ip-cpr-reqplan" id="ip-cpr-reqplan" v-model="plantype" required>
                      <option value="">กรุณาเลือกรายการ</option>
                    </select>
                  </div>
                  <div class="col-md-4 form-group">
                    <label for=""><b>หมวดหมู่สินค้า</b></label>
                    <select class="form-control" name="ip-cpr-itemcategory" id="ip-cpr-itemcategory"
                      v-model="itemcategory" required @change="getPayGroup">
                      <option value="">กรุณาเลือกรายการ</option>
                      <option value="raw_materials">วัตถุดิบ</option>
                      <option value="expenses">ค่าใช้จ่าย</option>
                      <option value="assets">ทรัพย์สิน</option>
                    </select>
                  </div>
                  <div class="col-md-4 form-group">
                    <label for=""><b>Cost Center</b></label>
                    <select class="form-control" name="ip-cpr-costcenter" id="ip-cpr-costcenter" v-model="costcenter"
                      required>
                      <option value="">กรุณาเลือกรายการ</option>
                    </select>
                  </div>
                  <div class="col-md-4 form-group">
                    <label for=""><b>แผนก</b></label>
                    <select class="form-control" name="ip-cpr-department" id="ip-cpr-department" v-model="department"
                      required @change="getUserEcode(department)">
                      <option value="">กรุณาเลือกรายการ</option>
                    </select>
                  </div>
                  <div class="col-md-4 form-group">
                    <label for=""><b>ผู้ขอซื้อ</b></label>
                    <select class="form-control" name="ip-cpr-ecodereq" id="ip-cpr-ecodereq" v-model="ecode">
                      <option value="">กรุณาเลือกผู้ขอซื้อ</option>
                    </select>
                  </div>
                  <div class="col-md-6 form-group">
                    <label for=""><b>รหัสผู้ขาย</b></label>
                    <input type="text" name="ip-cpr-vendid" id="ip-cpr-vendid" class="form-control" v-model="vendid"
                      @keyup="getVendID" @keydown="alertVendidnull" required />
                    <div id="show_accountnum"></div>
                  </div>
                  <div class="col-md-6 form-group">
                    <label for=""><b>ชื่อผู้ขาย</b></label>
                    <input type="text" name="ip-cpr-vendname" id="ip-cpr-vendname" class="form-control" readonly
                      v-model="vendname" />
                  </div>
                  <div class="col-md-12 form-group">
                    <label for=""><b>อีเมล</b></label>
                    <input type="text" name="ip-cpr-vendemail" id="ip-cpr-vendemail" class="form-control" readonly
                      v-model="vendemail" />
                    <div id="show_alertLastEmail" class="mt-2"></div>
                  </div>
                  <div class="col-md-6 form-group">
                    <label for=""><b>สกุลเงิน</b></label>
                    <input type="text" name="ip-cpr-currency" id="ip-cpr-currency" class="form-control" readonly
                      v-model="currency" />
                  </div>
                  <div class="col-md-6 form-group">
                    <label for=""><b>อัตราแลกเปลี่ยน</b></label>
                    <input type="text" name="ip-cpr-currency" id="ip-cpr-currency" class="form-control" readonly
                      v-model="currencyrate" />
                  </div>
                  <div class="col-md-4 form-group">
                    <label for=""><b>วันที่เอกสาร</b></label>
                    <input type="text" name="ip-cpr-docDatetime" id="ip-cpr-docDatetime" class="form-control" readonly
                      v-model="docdatetime" />
                  </div>
                  <div class="col-md-4 form-group">
                    <label for=""><b>วันที่ขอซื้อ</b></label>
                    <input type="text" name="ip-cpr-reqDatetime" id="ip-cpr-reqDatetime" class="form-control"
                      required />
                  </div>
                  <div class="col-md-4 form-group">
                    <label for=""><b>วันที่ส่งของ</b></label>
                    <input type="text" name="ip-cpr-recDatetime" id="ip-cpr-recDatetime" class="form-control"
                      required />
                  </div>
                  <div class="col-md-12 form-group">
                    <label for=""><b>หมายเหตุ</b></label>
                    <textarea name="ip-cpr-memo" id="ip-cpr-memo" cols="30" rows="10" class="form-control"
                      v-model="memo"></textarea>
                  </div>
                </div>
                <hr />
                <div class="card card-box">
                  <div class="card-header bgItemCard">
                    <span>รายการสินค้า</span>
                    <a href="javascript:void(0)" class="btn-clickadd" @click="openModal"><i
                        class="dw dw-add btnAddItem"></i></a>
                  </div>
                  <div class="card-body">
                    <Itemlist ref="itemlistcom" :key="this.renderkey" :itemdata.sync="itemData"
                      :currencyrate="this.currencyrate" :currency="this.currency" />
                  </div>
                </div>
                <hr />
                <div class="row form-group">
                  <div class="col-md-12">
                    <label for=""><b>เอกสารแนบ</b></label>
                    <input id="ip-cpr-file" name="ip-cpr-file[]" type="file" class="file" multiple
                      data-show-upload="false" data-show-caption="true" data-show-preview="true"
                      accept=".pdf , .jpg , .png" ref="fileInput" />

                    <div id="scripts">
                      <script type="application/javascript" defer src="assets/fileupload/bs-filestyle.js"></script>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row form-group">
                  <div class="col-md-12 form-group">
                    <label for=""><b>ผู้ตรวจสอบข้อมูล</b></label>
                    <select class="form-control" name="ip-cpr-invesEcode" id="ip-cpr-invesEcode" required
                      v-model="m_invest_ecodefix">
                      <option value="">กรุณาเลือกผู้ตรวจสอบ</option>
                    </select>
                  </div>
                </div>
                <hr />
                <div class="row form-group">
                  <div class="col-md-4 form-group">
                    <label for=""><b>ผู้บันทึกข้อมูล</b></label>
                    <input type="text" name="ip-cpr-userpost" id="ip-cpr-userpost" class="form-control" readonly
                      :value="userData.Fname + ' ' + userData.Lname" />
                  </div>
                  <div class="col-md-4 form-group">
                    <label for=""><b>รหัสพนักงาน</b></label>
                    <input type="text" name="ip-cpr-userecode" id="ip-cpr-userecode" class="form-control" readonly
                      :value="userData.ecode" />
                  </div>
                  <div class="col-md-4 form-group">
                    <label for=""><b>วันที่</b></label>
                    <input type="text" name="ip-cpr-userdatetime" id="ip-cpr-userdatetime" class="form-control" readonly
                      v-model="docdatetime" />
                  </div>
                  <div class="col-md-12 form-group">
                    <button type="submit" class="btn btn-primary" id="btn-saveData">
                      <i class="dw dw-diskette1 mr-2"></i>บันทึกข้อมูล
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "bootstrap"; // นำเข้าเฉพาะ Modal component จาก Bootstrap

import Itemlist from "@/components/Itemlist.vue";

export default {
  name: "Createpr",
  components: {
    Itemlist,
  },
  data() {
    return {
      url: this.getUrl(),
      dataareaid: "",
      plantype: "",
      itemcategory: "",
      costcenter: "",
      department: "",
      ecode: "",
      vendid: "",
      vendname: "",
      vendemail: "",
      paymtermid: "",
      currency: "",
      currencyrate: 0,
      datetimereq: "",
      datetimedelivery: "",
      memo: "",
      payGroupMaxprice: "",
      m_invest_ecodefix: "",
      renderkey: 0,

      itemid: "",
      itemname: "",
      itemdetail: "",
      itemqty: 0,
      itemprice: 0,
      itemdiscount: 0,
      itempricesum: 0,
      itemunit: "",
      itemmemo: "",
      itemgroupid: "",
      itemData: [],
      searchCompareText: "",
      compareSuggestions: [],

      userData: this.getSessionStorage(),
    };
  },
  methods: {
    getdataByAreaid() {
      return Promise.all([
        this.getReqplan(),
        this.getCostcenter(),
        this.getDepartment(),
        this.getInvestigator(),
      ]);
    },
    getReqplan() {
      if (this.dataareaid !== "") {
        return axios
          .post(
            this.url +
            "intsys/purchaseplus/purchaseplus_backend/mainapi/getReqplan",
            {
              action: "getReqplan",
              areaid: this.dataareaid,
            }
          )
          .then((res) => {
            if (res.data.status === "Select Data Success") {
              let result = res.data.result;
              let html = `
          <option value="">กรุณาเลือกรายการ</option>
        `;
              for (let key in result) {
                html += `
            <option value="${result[key].bpc_numbersequence}">
              ${result[key].reqplanid} | ${result[key].name}
            </option>
          `;
              }
              html += `
          <option value="PRA53">Asset | แผนการจัดซื้อทรัพย์สิน</option>
        `;
              $("#ip-cpr-reqplan").html(html);
            }
          });
      } else {
        // คืน Promise ทันที เพื่อไม่ให้ await ค้าง
        $("#ip-cpr-reqplan").html('<option value="">กรุณาเลือกรายการ</option>');
        return Promise.resolve();
      }
    },
    getCostcenter() {
      if (this.dataareaid != "") {
        return axios
          .post(
            this.url +
            "intsys/purchaseplus/purchaseplus_backend/mainapi/getCostcenter",
            {
              action: "getCostcenter",
              areaid: this.dataareaid,
            }
          )
          .then((res) => {
            if (res.data.status == "Select Data Success") {
              let result = res.data.result;
              let html = `<option value="">กรุณาเลือกรายการ</option>`;
              for (let key in result) {
                html += `
                  <option value="${result[key].num}">${result[key].num} | ${result[key].description}</option>
                `;
              }
              $("#ip-cpr-costcenter").html(html);
            }
          });
      } else {
        $("#ip-cpr-costcenter").html(
          '<option value="">กรุณาเลือกรายการ</option>'
        );
        return Promise.resolve();
      }
    },
    getDepartment() {
      if (this.dataareaid != "") {
        return axios
          .post(
            this.url +
            "intsys/purchaseplus/purchaseplus_backend/mainapi/getDepartment",
            {
              action: "getDepartment",
              areaid: this.dataareaid,
            }
          )
          .then((res) => {
            if (res.data.status == "Select Data Success") {
              let result = res.data.result;
              let html = `<option value="">กรุณาเลือกรายการ</option>`;
              for (let key in result) {
                html += `
                  <option value="${result[key].num}">${result[key].num} | ${result[key].description}</option>
                `;
              }
              $("#ip-cpr-department").html(html);
            }
          });
      } else {
        $("#ip-cpr-department").html(
          '<option value="">กรุณาเลือกรายการ</option>'
        );
        return Promise.resolve();
      }
    },
    getUserEcode(departmentOverride = null) {
      const department = departmentOverride || this.department;
      $("#ip-cpr-ecodereq").html('<option value="">กรุณาเลือกรายการ</option>');
      if (department != "") {
        return axios
          .post(
            this.url +
            "intsys/purchaseplus/purchaseplus_backend/mainapi/getUserEcode",
            {
              action: "getUserEcode",
              department: department,
            }
          )
          .then((res) => {
            if (res.data.status == "Select Data Success") {
              let result = res.data.result;
              let html = `<option value="">กรุณาเลือกรายการ</option>`;
              for (let key in result) {
                html += `
                  <option value="${result[key].ecode}">${result[key].Fname} ${result[key].Lname}</option>
                  `;
              }
              $("#ip-cpr-ecodereq").html(html);
            }
          });
      } else {
        $("#ip-cpr-ecodereq").html(
          '<option value="">กรุณาเลือกรายการ</option>'
        );
        return Promise.resolve();
      }
    },
    getVendID() {
      if (this.dataareaid != "" && this.vendid != "") {
        axios
          .post(
            this.url +
            "intsys/purchaseplus/purchaseplus_backend/mainapi/getVendID",
            {
              action: "getVendID",
              areaid: this.dataareaid,
              vendid: this.vendid,
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.status == "Select Data Success") {
              let result = res.data.result;
              let html = '<ul class="list-group vendidUl">';
              for (let key in result) {
                html += `
                            <li class="list-group-item vendidLi"
                                data_accountnum="${result[key].accountnum}"
                                data_name="${result[key].name}"
                                data_paymtermid="${result[key].paymtermid}"
                                data_currency="${result[key].currencycodeiso}"
                                data_currencyrate="${result[key].exchrate}"
                                data_email="${result[key].email}"
                            >${result[key].accountnum} | ${result[key].name}</li>
                            `;
              }
              html += `</ul>`;
              $("#show_accountnum").html(html);
            }
          });
      } else {
        $("#show_accountnum").html("");
      }
    },
    getInvestigator() {
      axios
        .get(
          this.url +
          "intsys/purchaseplus/purchaseplus_backend/mainapi/getInvestigator"
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status == "Select Data Success") {
            let html = '<option value="">กรุณาเลือกผู้ตรวจสอบ</option>';
            let result = res.data.result;
            for (let key in result) {
              html += `
                            <option value="${result[key].inve_ecode}">${result[key].inve_fullname}</option>
                        `;
            }
            $("#ip-cpr-invesEcode").html(html);
          }
        });
    },
    alertVendidnull() {
      if (this.dataareaid == "") {
        Swal.fire({
          title: "กรุณาเลือกสังกัดบริษัท",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      }
    },
    checkDataAreaid() {
      // if(this.dataareaid == ""){
      //     $('.btn-close-additem').click();
      // }
      $(".btn-close-additem").click();
      console.log("test");
    },
    openModal() {
      if (this.dataareaid == "") {
        //code
        Swal.fire({
          title: "กรุณาเลือกสังกัดบริษัท",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      } else if (this.currency == "") {
        //code
        Swal.fire({
          title: "กรุณาตรวจสอบสกุลเงิน",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      } else {
        $("#frm-insert-item").removeClass("was-validated");
        const myModal = new Modal(document.getElementById("addItem_modal"), {
          keyboard: false,
          backdrop: "static",
        });
        myModal.show();
      }
    },
    closeModal() {
      const myModalEl = document.getElementById("addItem_modal");
      const modal = Modal.getInstance(myModalEl);
      modal.hide();
      this.itemid = "";
      this.itemname = "";
      this.itemdetail = "";
      this.itemqty = 0;
      this.itemprice = 0;
      this.itemdiscount = 0;
      this.itempricesum = 0;
      this.itemunit = "";
      this.itemmemo = "";
    },
    getItemid() {
      if (this.dataareaid != "") {
        axios
          .post(
            this.url +
            "intsys/purchaseplus/purchaseplus_backend/mainapi/getItemid",
            {
              action: "getItemid",
              areaid: this.dataareaid,
              itemid: this.itemid,
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.status == "Select Data Success") {
              let result = res.data.result;
              let html = `<ul class="list-group itemIDUl">`;
              for (let key in result) {
                let itemName = result[key].itemname.replace(/"/g, "&quot;");
                let itemid = result[key].itemid.replace(/"/g, "&quot;");
                html += `
                            <li class="list-group-item itemIDLi"
                                data_itemid="${itemid}"
                                data_itemname="${itemName}"
                                data_unit="${result[key].unitid}"
                                data_itemgroupid="${result[key].itemgroupid}"
                            >${result[key].itemid} | ${itemName}</li>
                            `;
              }
              html += `</ul>`;
              if (this.itemid !== "") {
                $("#show_itemidDetail").html(html);
              } else {
                $("#show_itemidDetail").html("");
              }
            }
          });
      }
    },
    insertItemdata() {
      if (this.itemid == "") {
        Swal.fire({
          title: "กรุณาเลือกระบุรหัสสินค้า",
          icon: "error",
          showConfirmButton: true,
          // timer:1000
        });
      } else if (this.itemdetail == "") {
        Swal.fire({
          title: "กรุณาระบุรายละเอียดของสินค้า",
          icon: "error",
          showConfirmButton: true,
          // timer:1000
        });
      } else if (this.itemqty === 0) {
        Swal.fire({
          title: "กรุณาระบุจำนวน",
          icon: "error",
          showConfirmButton: true,
          // timer:1000
        });
      } else if (this.itemprice == 0) {
        Swal.fire({
          title: "กรุณาระบุราคาต่อหน่วย",
          icon: "error",
          showConfirmButton: true,
          // timer:1000
        });
      } else if (this.itempricesum === 0) {
        Swal.fire({
          title:
            "กรุณาตรวจสอบจำนวนและราคาใหม่อีกครั้ง เนื่องจากไม่สามารถคำนวณราคาได้",
          icon: "error",
          showConfirmButton: true,
          // timer:1000
        });
      } else {
        this.saveInsertItemdata();
      }
    },
    calcPrice() {
      this.itempricesum = this.itemqty * this.itemprice - this.itemdiscount;
    },
    saveInsertItemdata() {
      // check max price frist
      if (parseFloat(this.itempricesum) > parseFloat(this.payGroupMaxprice)) {
        Swal.fire({
          title: "ราคาสินค้ามากกว่าวงเงินสูงสุดที่สามารถทำรายการได้",
          icon: "error",
          showConfirmButton: true,
          // timer:1000
        });
      } else {
        let data = {
          itemid: this.itemid,
          itemname: this.itemname,
          itemdetail: this.itemdetail,
          itemqty: this.itemqty,
          itemprice: this.itemprice,
          itemdiscount: this.itemdiscount,
          itempricesum: this.itempricesum,
          itemunit: this.itemunit,
          itemmemo: this.itemmemo,
          itemgroupid: this.itemgroupid,
        };
        this.itemData.push(data);
        this.closeModal();
        console.log(this.itemData);
        // this.callgetItemdata();
      }
    },
    // callgetItemdata() {
    //   this.$refs.itemlistcom.getItemdata();
    //   //อ้างถึง Component เพื่อที่จะเข้าถึง Method ใน Component ที่อ้างถึง
    // },
    saveDataAll() {
      const proxy = this;
      //check input null
      if (this.dataareaid == "") {
        Swal.fire({
          title: "กรุณาเลือกสังกัดบริษัท",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      } else if (this.plantype == "") {
        Swal.fire({
          title: "กรุณาเลือกหมวดหมู่เอกสาร",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      } else if (this.itemcategory == "") {
        Swal.fire({
          title: "กรุณาเลือกหมวดหมู่สินค้า",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      } else if (this.costcenter == "") {
        Swal.fire({
          title: "กรุณาเลือก Cost Center",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      } else if (this.vendid == "") {
        Swal.fire({
          title: "กรุณาเลือกผู้ขาย",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      } else if ($("#ip-cpr-reqDatetime").val() == "") {
        Swal.fire({
          title: "กรุณาเลือกวันที่ขอซื้อ",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      } else if ($("#ip-cpr-recDatetime").val() == "") {
        Swal.fire({
          title: "กรุณาเลือกวันที่ส่งของ",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      } else if (this.m_invest_ecodefix == "") {
        Swal.fire({
          title: "กรุณาเลือกผู้ตรวจสอบรายการ",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      } else if (this.itemData.length == 0) {
        Swal.fire({
          title: "กรุณาระบุรายการสินค้า",
          icon: "warning",
          showConfirmButton: true,
          // timer:1000
        });
      } else {
        let itemsumpriceTotalPlus = 0;
        for (let key in proxy.itemData) {
          itemsumpriceTotalPlus += parseFloat(proxy.itemData[key].itempricesum);
        }
        if (
          parseFloat(itemsumpriceTotalPlus) > parseFloat(proxy.payGroupMaxprice)
        ) {
          Swal.fire({
            title: "ยอดเงินรวมเกินวงเงินที่จำกัด",
            icon: "error",
            showConfirmButton: true,
            // timer:1000
          });
        } else {
          $("#btn-saveData").prop("disabled", true);
          const formdata = new FormData();
          const files = this.$refs.fileInput.files;
          let data = {
            dataareaid: this.dataareaid,
            plantype: this.plantype,
            itemcategory: this.itemcategory,
            costcenter: this.costcenter,
            department: this.department,
            ecode: this.ecode,
            vendid: this.vendid,
            vendname: this.vendname,
            vendemail: this.vendemail,
            paymtermid: this.paymtermid,
            currency: this.currency,
            currencyrate: parseFloat(this.currencyrate.replace(/,/g, "")),
            datetimereq: $("#ip-cpr-reqDatetime").val(),
            datetimedelivery: $("#ip-cpr-recDatetime").val(),
            memo: this.memo,
            ecodepost: this.userData.ecode,
            userpost: this.userData.Fname + " " + this.userData.Lname,
            m_invest_ecodefix: this.m_invest_ecodefix,
            compare_formno: this.searchCompareText
          };
          for (let key in data) {
            formdata.append(key, data[key]);
          }
          for (let key in files) {
            formdata.append("ip-cpr-file[]", files[key]);
          }
          formdata.append("itemdata", JSON.stringify(this.itemData));
          formdata.append("action", "saveDataAll");

          axios
            .post(
              this.url +
              "intsys/purchaseplus/purchaseplus_backend/mainapi/saveDataAll",
              formdata,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              console.log(res.data);
              $("#btn-saveData").prop("disabled", false);
              if (res.data.status == "Insert Data Success") {
                let formno = res.data.formno;
                Swal.fire({
                  title: "บันทึกข้อมูลสำเร็จ",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1000,
                }).then(function () {
                  proxy.$router.replace({
                    name: "Viewdata",
                    params: { formno: formno },
                  });
                });
              }
            });
        }
      }
    },
    getPayGroup() {
      const proxy = this;
      if (proxy.itemcategory != "") {
        const formdata = new FormData();
        formdata.append("pay_doctype", proxy.itemcategory);
        axios
          .post(
            this.url +
            "intsys/purchaseplus/purchaseplus_backend/mainapi/getPayGroupMaxMoney",
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.status == "Select Data Success") {
              let result = res.data.result;
              proxy.payGroupMaxprice = result.maxprice;
            }
          });
      }
    },
    reloadComponent() {
      this.renderkey += 1; // เพิ่มค่า key เพื่อบังคับให้ Vue.js รีเรนเดอร์คอมโพเนนต์
    },
    getLastVendorEmail(accountnum, dataareaid, data_email) {
      if (accountnum && dataareaid) {
        const formdata = new FormData();
        formdata.append("accountnum", accountnum);
        formdata.append("dataareaid", dataareaid);
        axios
          .post(
            this.url +
            "intsys/purchaseplus/purchaseplus_backend/mainapi/getLastVendorEmail",
            formdata
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.status == "Select Data Success") {
              let result = res.data.result;
              if (result !== null) {
                if (data_email !== result.sp_mailto) {
                  document.querySelector(
                    "#show_alertLastEmail"
                  ).innerHTML = `<span class='textRequest'>*Email ของ Vendor รายการล่าสุดไม่ตรงกันกับ Email ในระบบ AX กรุณาตรวจสอบและแก้ไข</span><br>
                                <span class='textRequest'><b>*รายการอีเมลล่าสุด : </b>${result.sp_mailto}</span>`;
                }
              }
            }
          });
      }
    },
    getVendData_Compare(accountnum, dataareaid) {
      if (accountnum && dataareaid) {
        const formdata = new FormData();
        formdata.append('accountnum', accountnum);
        formdata.append('dataareaid', dataareaid);

        return axios.post(this.url + "intsys/purchaseplus/purchaseplus_backend/compareapi/getVendData_Compare", formdata)
          .then(res => {
            console.log(res.data);
            if (res.data.status === "Select Data Success") {
              let result = res.data.result;
              this.paymtermid = result.paymtermid;
              this.vendid = result.accountnum;
              this.vendname = result.name;
              this.currency = result.currency;
              this.vendemail = result.email;
              this.currencyrate = parseFloat(result.exchrate).toLocaleString(
                "en-US",
                { minimumFractionDigits: 3, maximumFractionDigits: 3 }
              );
            }
          });
      } else {
        return Promise.resolve(); // คืนค่าเปล่าถ้าไม่มีข้อมูล เพื่อป้องกัน error เวลาใช้ await
      }
    },
    getItemData_Compare(formno, vendor_index) {
      if (formno && vendor_index) {
        const formdata = new FormData();
        formdata.append('formno', formno);
        formdata.append('vendor_index', vendor_index);

        return axios.post(this.url + "intsys/purchaseplus/purchaseplus_backend/compareapi/getItemData_Compare", formdata)
          .then(res => {
            if (res.data.status === "Select Data Success") {
              const result = res.data.result;

              // เคลียร์ของเดิมก่อน (ถ้าต้องการรีเซต)
              this.itemData = [];

              // วนลูปผลลัพธ์ที่ได้ แล้ว push ใส่ itemData ทีละรายการ
              result.forEach(item => {
                const data = {
                  itemid: item.itemid,
                  itemname: item.itemname,
                  itemdetail: item.itemdetail,
                  itemqty: 1, // 🟡 กำหนดจำนวนเบื้องต้น หรือดึงจาก item ถ้ามี
                  itemprice: parseFloat(item.price),
                  itemdiscount: 0,
                  itempricesum: parseFloat(item.price), // คำนวณเบื้องต้น
                  itemunit: item.itemunit,
                  itemmemo: '',
                  itemgroupid: item.itemgroupid,
                };
                this.itemData.push(data);
              });

              console.log("✅ เพิ่มรายการ item จาก Compare สำเร็จ", this.itemData);
              return Promise.resolve();
            } else {
              console.warn("❌ ไม่พบข้อมูล Compare Item");
              return Promise.reject("No data");
            }
          })
          .catch(error => {
            console.error("❌ เกิดข้อผิดพลาดในการโหลดข้อมูล Compare:", error);
            return Promise.reject(error);
          });
      } else {
        console.warn("⛔ กรุณาระบุ formno ให้ถูกต้อง");
        return Promise.reject("formno is required");
      }
    },
    async searchCompareVendor() {
      if (this.searchCompareText.length < 2) {
        this.compareSuggestions = [];
        return;
      }

      const formdata = new FormData();
      formdata.append("keyword", this.searchCompareText);
      formdata.append("deptcode_user", this.userData.DeptCode);

      const res = await axios.post(
        this.url +
        "intsys/purchaseplus/purchaseplus_backend/compareapi/searchCompareVendor",
        formdata
      );

      console.log(res.data);

      if (res.data.status === "success") {
        this.compareSuggestions = res.data.result;
      } else {
        this.compareSuggestions = [];
      }
    },
    async selectCompare(item) {
      this.searchCompareText = item.formno;
      this.compareSuggestions = [];
      // ทำอะไรต่อ เช่น เก็บค่าหรือไปโหลดข้อมูลอื่น
      this.dataareaid = item.dataareaid;
      this.vendid = item.accountnum;
      await this.getdataByAreaid();
      this.department = item.deptcode_create;
      await this.getUserEcode(item.deptcode_create);
      this.ecode = item.ecode_create;
      await this.getVendData_Compare(item.accountnum, item.dataareaid);
      await this.getItemData_Compare(item.formno, item.vendor_index);
    },
  },
  created() {
    if (["1002", "1004", "1009", "1015", "1013", "1010"].includes(this.userData.DeptCode)) {
      // ✅ เงื่อนไขผ่าน ➔ ดำเนินการต่อ
      console.log('สามารถสร้าง PR ได้');
    } else {
      // ❌ เงื่อนไขไม่ผ่าน ➔ Redirect ไป prlist
      Swal.fire('คุณไม่สามารถสร้างรายการ PR ได้ กรุณาติดต่อฝ่ายไอที', '', 'warning');
      this.$router.push({ name: 'Prlist' }); // ถ้าใช้ vue-router
    }
    this.formValidate();
  },
  mounted() {
    const proxy = this;
    $(document).on("click", ".vendidLi", function () {
      const data_accountnum = $(this).attr("data_accountnum");
      const data_name = $(this).attr("data_name");
      const data_paymtermid = $(this).attr("data_paymtermid");
      const data_currency = $(this).attr("data_currency");
      const data_currencyrate = $(this).attr("data_currencyrate");
      const data_email = $(this).attr("data_email");

      // console.log(data_accountnum+' '+data_name+' '+data_paymtermid);
      proxy.paymtermid = data_paymtermid;
      proxy.vendid = data_accountnum;
      proxy.vendname = data_name;
      proxy.currency = data_currency;
      proxy.vendemail = data_email;
      proxy.currencyrate = parseFloat(data_currencyrate).toLocaleString(
        "en-US",
        { minimumFractionDigits: 3, maximumFractionDigits: 3 }
      );
      $("#show_accountnum").html("");

      proxy.reloadComponent();
      // setTimeout(function () {
      //   proxy.callgetItemdata();
      // }, 500);
      // 2000 milliseconds = 2 seconds
      proxy.getLastVendorEmail(data_accountnum, proxy.dataareaid, data_email);
    });

    $("#ip-cpr-reqDatetime").Zebra_DatePicker({
      format: "d-m-Y",
      pair: $("#ip-cpr-recDatetime"),
    });
    $("#ip-cpr-recDatetime").Zebra_DatePicker({
      format: "d-m-Y",
      direction: true,
    });

    proxy.$store.dispatch("getdata_datetimenow");

    $(document).on("click", ".itemIDLi", function () {
      const data_itemid = $(this).attr("data_itemid");
      const data_itemname = $(this).attr("data_itemname");
      const data_unit = $(this).attr("data_unit");
      const data_itemgroupid = $(this).attr("data_itemgroupid");

      proxy.itemid = data_itemid;
      proxy.itemname = data_itemname;
      proxy.itemunit = data_unit;
      proxy.itemgroupid = data_itemgroupid;

      $("#show_itemidDetail").html("");
    });
  },
  computed: {
    docdatetime() {
      return this.$store.getters.get_datetimeNow;
    },
  },
};
</script>

<style scoped>
.btnAddItem {
  position: absolute;
  right: 10px;
  top: 12px;
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  transition: transform 0.2s;
}

.btnAddItem:hover {
  transform: scale(1.1);
}

.bgItemCard {
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);

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
</style>