<template>
  <div id="create_compare_vendor">

    <!-- Modal: เพิ่มสินค้า -->
    <div class="modal fade" id="printCompareModal" tabindex="-1" role="dialog" aria-labelledby="addItemLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Compare Document Preview {{ formno }}</h5>
            <button type="button" class="close" @click="closePrintPreviewCompareModal">×</button>
          </div>
          <div class="modal-body">
            <iframe id="pdfViewer_compare" width="100%" height="600px" frameborder="0"></iframe>
            <div class="row form-group">
              <div class="col-md-6"></div>
              <div class="col-md-6 text-right">
                <button id="downloadBtn" class="btn btn-primary">
                  <i class="fa fa-download"></i> ดาวน์โหลด PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="pd-ltr-20">
        <div class="row">
          <div class="col-md-12">
            <div class="card-box height-100-p pd-20">
              <div class="row">
                <div class="col-md-3">
                  <button type="button" class="btn btn-info btnPrint" @click="printCompareDocument">Print</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-xl-12 mb-30">
            <div class="card-box height-100-p pd-20">
              <div class="row form-group text-center">
                <h3>รายการ Compare Vendor</h3>
                <h5>เอกสารเลขที่ : {{ formno }}</h5>
                <h6>สถานะ : {{ compare_status }}</h6>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-6 form-group">
                  <label for=""><b>เลือกสังกัดบริษัท</b></label>
                  <select name="ip-cpv-areaid" id="ip-cpv-areaid" class="form-control" v-model="dataareaid"
                    :disabled="submitted">
                    <option value="">กรุณาเลือกบริษัท</option>
                    <option value="sln">
                      Salee Colour Public Company Limited.
                    </option>
                    <option value="poly">Poly Meritasia Co.,Ltd.</option>
                    <option value="ca">Composite Asia Co.,Ltd.</option>
                    <option value="st">Subterra Co.,Ltd.</option>
                    <option value="tbb">The bubbles Co.,Ltd.</option>
                  </select>
                </div>
                <div class="col-md-6 form-group">
                  <label for=""><b>เลือกจำนวน Vendor ที่ต้องการ Compare</b></label>
                  <select name="add-vend-number" id="add-vend-number" class="form-control" v-model="vendorCount"
                    :disabled="submitted">
                    <option value="">กรุณาเลือกรายการ</option>
                    <option v-for="n in 9" :key="n" :value="n">{{ n }}</option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 mt-3" v-if="vendors.length > 0">
                  <div class="form-group position-relative" v-for="(vendor, index) in vendors" :key="index">
                    <label>ผู้ขายรายที่ {{ index + 1 }}</label>
                    <input type="text" class="form-control" :placeholder="`กรอกชื่อ ผู้ขายรายที่ #${index + 1}`"
                      :disabled="submitted" :value="vendor.vendor_name" />
                  </div>
                </div>
              </div>

              <hr class="mt-3" />
              <!-- แสดงรายการสินค้าใน modal หลัก -->
              <div class="row col-md-12 mt-3" v-if="items.length > 0">
                <h5>รายการสินค้า:</h5>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>ชื่อสินค้า</th>
                      <th v-for="(vendor, index) in vendors" :key="'head-' + index" :class="{
                        'highlight-vendor': selectedVendorIndex == index,
                      }">
                        {{ vendor.vendor_name }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in items" :key="'row-' + i">
                      <td>
                        <!-- ✅ ถ้ามี itemid หรือ itemname -->
                        <div v-if="item.itemid || item.itemname">
                          <span>{{ item.itemid }}</span> /
                          <span>{{ item.itemname }}</span><br />
                          <small class="text-muted">{{
                            item.itemdetail
                          }}</small>
                        </div>

                        <!-- ❗ ถ้าไม่มี itemid และ itemname -->
                        <div v-else>
                          <span>{{ item.itemdetail }}</span>
                        </div>
                      </td>
                      <td v-for="(price, j) in item.prices" :key="'price-' + j" :class="{
                        'highlight-vendor': selectedVendorIndex == j,
                      }">
                        <span v-if="item.no_quoted[j]">ไม่ได้เสนอราคา</span>
                        <span v-else>
                          {{
                            Number(price).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>รวม</th>
                      <th v-for="(total, index) in totalPricesPerVendor" :key="'total-' + index" :class="{
                        'highlight-vendor': selectedVendorIndex == index,
                      }">
                        {{
                          Number(total).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        }}
                      </th>
                    </tr>
                  </tfoot>
                </table>
                <hr class="mt-3" />
              </div>

              <!-- Section: เลือก Vendor ที่ต้องการ -->
              <div class="row col-md-12 mt-4" v-if="submitted && vendors.length > 0 && items.length > 0">
                <h5>เลือกผู้ขายที่ต้องการ:</h5>

                <div class="d-flex flex-wrap gap-3 mt-2">
                  <div class="form-check form-check-inline" v-for="(vendor, index) in vendors" :key="'choose-' + index">
                    <input class="form-check-input radioChooseVendor" type="radio" :value="index"
                      v-model="selectedVendorIndex" :id="'vendor-radio-' + index" name="selectedVendor" disabled />
                    <label class="form-check-label" :for="'vendor-radio-' + index">
                      {{ vendor.vendor_name }}
                    </label>
                  </div>
                </div>

                <div class="mt-3" v-if="selectedVendorIndex !== null">
                  <strong>คุณเลือก: </strong>{{ selectedVendor.vendor_name }}
                </div>
                <hr class="mt-3" />
              </div>
              <div class="row form-group">
                <!-- 🔻 เหตุผลในการเลือก -->
                <div class="col-md-12">
                  <label for="reason"><b>เหตุผลในการเลือกผู้ขาย</b></label>
                  <textarea class="form-control" id="reason" rows="3" v-model="vendorSelectionReason"
                    placeholder="กรุณาระบุเหตุผลในการเลือกผู้ขายรายนี้ เช่น ราคาเหมาะสม, คุณภาพ, การส่งมอบ ฯลฯ"
                    disabled></textarea>
                </div>
              </div>
              <!-- 🔻 Section แสดงภาพ -->
              <div v-if="imageFiles.length > 0" class="mt-4">
                <label><b>ไฟล์ แนบ (ภาพ)</b></label>
                <div class="d-flex flex-wrap gap-3">
                  <div v-for="(img, index) in imageFiles" :key="'img-' + index" class="border rounded shadow-sm" style="
                      width: 200px;
                      height: 200px;
                      overflow: hidden;
                      position: relative;
                    ">
                    <img :src="img.fullPath" :alt="img.name" class="img-fluid" style="
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        cursor: pointer;
                      " @click="previewImage(img.fullPath)" />
                  </div>
                </div>
              </div>

              <!-- 🔻 Section แสดง PDF -->
              <div v-if="pdfFiles.length > 0" class="mt-4">
                <label><b>ไฟล์ แนบ (เอกสาร)</b></label>
                <div class="d-flex flex-wrap gap-3">
                  <div v-for="(pdf, index) in pdfFiles" :key="'pdf-' + index"
                    class="d-flex flex-column p-2 border rounded shadow-sm" style="width: 300px">
                    <embed :src="pdf.fullPath" type="application/pdf" width="100%" height="180px" />
                    <!-- ลิงก์ชื่อไฟล์ -->
                    <a :href="pdf.fullPath" target="_blank" class="text-primary mt-2 text-truncate"
                      style="max-width: 180px; display: block">
                      {{ pdf.name }}
                    </a>
                  </div>
                </div>
              </div>
              <div class="row mt-3 form-group" v-if="selectedVendorIndex !== null">
                <div class="col-md-3 form-group-sm">
                  <label for=""><b>ลงชื่อเจ้าหน้าที่จัดหา</b></label>
                  <input type="text" name="ip-userpost" id="ip-userpos" class="form-control" readonly
                    :value="user_create" />
                </div>
                <div class="col-md-3 form-group-sm">
                  <label for=""><b>แผนก</b></label>
                  <input type="text" name="ip-dept" id="ip-dept" class="form-control" readonly :value="dept_create" />
                </div>
                <div class="col-md-3 form-group-sm">
                  <label for=""><b>รหัสพนักงาน</b></label>
                  <input type="tel" name="ip-ecode" id="ip-ecode" class="form-control" readonly :value="ecode_create" />
                </div>
                <div class="col-md-3 form-group-sm">
                  <label for=""><b>วันที่ร้องขอ</b></label>
                  <input type="text" name="ip-datetimecreate" id="ip-datetimecreate" class="form-control" readonly
                    :value="datetime_create" />
                </div>
              </div>
              <hr />
              <div class="row" v-if="btnCtrl">
                <div class="col-md-3 form-group">
                  <button type="button" class="btn btn-danger btn-block" @click="confirmCancelDocument"
                    :disabled="isClick"><i class="dw dw-trash1 mr-2"></i>
                    ยกเลิก
                  </button>
                </div>
                <div class="col-md-3 form-group">
                  <button type="button" class="btn btn-warning btn-block" @click="goToEditPage" :disabled="isClick"><i
                      class="dw dw-edit-file mr-2"></i>
                    แก้ไข
                  </button>
                </div>
                <div class="col-md-3 form-group">
                  <button type="button" class="btn btn-primary btn-block" @click="sendDataToManager"
                    :disabled="isClick"><i class="dw dw-paper-plane1 mr-2"></i>
                    ส่งข้อมูล
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- เพิ่ม Component Manager Confirm -->
        <Compare_confirm v-if="shouldShowApproval" :userData="userData" :formno="formno" :compare_id="compare_id"
          :last_updated="last_updated" :btnApp="btnApp" :defaultStatus="approvalStatus" :defaultMemo="approvalMemo"
          :user_approval="user_approval" :ecode_approval="ecode_approval" :datetime_approval="datetime_approval"
          :compare_status="compare_status" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Compare_confirm from "@/components/Compare_approve.vue";
import { Modal } from 'bootstrap'; // นำเข้าเฉพาะ Modal component จาก Bootstrap
export default {
  name: "Compare_vendor_viewfull",
  data() {
    return {
      url: this.getUrl(),
      formno: this.$route.params.formno || "",
      vendors: [],
      items: [],
      selectedVendorIndex: null,
      vendorSelectionReason: "",
      // userData: this.getSessionStorage(),
      dataareaid: "",
      submitted: true,
      vendorCount: 0,
      accountnum: "",
      user_create: "",
      datetime_create: "",
      dept_create: "",
      ecode_create: "",
      last_updated: "",
      btnCtrl: false,
      btnApp: false,
      uploadedFiles: [],
      compare_status: "",
      compare_id: "",
      approvalStatus: "",
      approvalMemo: "",
      user_approval: "",
      ecode_approval: "",
      datetime_approval: "",
      docnumber:"",
      isDataLoaded: false,
      isClick: false,
    };
  },
  components: {
    Compare_confirm,
  },
  mounted() {
    this.loadCompareData();
  },
  methods: {
    async loadCompareData() {
      try {
        const formdata = new FormData();
        formdata.append("formno", this.formno);
        formdata.append("deptcode", this.userData.DeptCode);
        formdata.append("ecode" , this.userData.ecode);
        const res = await axios.post(
          this.url +
          "intsys/purchaseplus/purchaseplus_backend/compareapi/getCompareDetailByFormno",
          formdata
        );
        console.log(res.data);
        if (res.data.status === "success") {
          const {
            vendors,
            items,
            selectedIndex,
            reason,
            dataareaid,
            accountnum,
            user_create,
            datetime_create,
            dept_create,
            deptcode_create,
            ecode_create,
            last_updated,
            compare_status,
            compare_id,
            files,
            status_approval,
            memo_approval,
            user_approval,
            ecode_approval,
            datetime_approval,
            docnumber,
          } = res.data.result;
          this.vendors = vendors;
          this.items = items;
          this.selectedVendorIndex = selectedIndex;
          this.vendorSelectionReason = reason;
          this.dataareaid = dataareaid;
          this.vendorCount = vendors.length;
          this.accountnum = accountnum;
          this.user_create = user_create;
          this.datetime_create = datetime_create;
          this.dept_create = dept_create;
          this.deptcode_create = deptcode_create;
          this.ecode_create = ecode_create;
          this.last_updated = last_updated;
          this.compare_id = compare_id;
          this.compare_status = compare_status;
          this.uploadedFiles = files || [];
          this.approvalStatus = status_approval;
          this.approvalMemo = memo_approval;
          this.user_approval = user_approval;
          this.ecode_approval = ecode_approval;
          this.datetime_approval = datetime_approval;
          this.docnumber = docnumber;

          this.isDataLoaded = true;

          if (
            ![
              "Cancel",
              "Pending Approve",
              "Compare Approved",
              "Compare Not Approve",
              "Compare Used"
            ].includes(compare_status)
          ) {
            this.btnCtrl = true;
          }
          if (["Pending Approve"].includes(compare_status)) {
            this.btnApp = true;
          }
        } else {
          Swal.fire("ไม่พบข้อมูล", "", "error").then(() => {
            this.$router.push({ name: "Home" }); // หรือหน้าอื่นๆ ที่ต้องการ redirect
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire("เกิดข้อผิดพลาดในการโหลดข้อมูล", "", "error");
      }
    },
    async cancelDocument() {
      try {
        const formdata = new FormData();
        formdata.append("formno", this.formno);
        formdata.append("last_updated", this.last_updated);
        const res = await axios.post(
          this.url +
          "intsys/purchaseplus/purchaseplus_backend/compareapi/cancelDocument",
          formdata
        );
        console.log(res.data);
        if (res.data.status == "success") {
          Swal.fire("ยกเลิกรายการสำเร็จ", "", "success").then(() => {
            this.$router.push({ name: "Comparevendorlist" });
          });
        } else {
          Swal.fire("ยกเลิกรายการไม่สำเร็จ", "", "error");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async confirmCancelDocument() {
      this.isClick = true;
      try {
        const result = await Swal.fire({
          title: "คุณแน่ใจหรือไม่?",
          text: "เมื่อยกเลิกแล้วจะไม่สามารถแก้ไขรายการนี้ได้",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "ยืนยันการยกเลิก",
          cancelButtonText: "ยกเลิก",
        });

        if (result.isConfirmed) {
          this.cancelDocument(); // เรียก method ที่คุณเขียนไว้
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isClick = false;
      }
    },
    previewImage(imageUrl) {
      Swal.fire({
        imageUrl: imageUrl,
        imageAlt: "แนบรูปภาพ",
        showConfirmButton: false,
        width: "auto",
        padding: "1em",
      });
    },
    goToEditPage() {
      this.$router.push({
        name: "Compare_vendor_viewfull_edit",
        params: { formno: this.formno },
      });
    },
    async sendDataToManager() {
      this.isClick = true;
      if (this.accountnum == "" || this.accountnum == null) {
        Swal.fire({
          title: 'กรุณาเลือก ผู้ค้าที่ลงทะเบียนแล้วเท่านั้น',
          icon: 'warning',
          showConfirmButton: true,
        });
        this.isClick = false;
        return;
      }

      try {
        const formdata = new FormData();
        formdata.append("formno", this.formno);
        formdata.append("compare_id", this.compare_id);
        const res = await axios.post(
          this.url +
          "intsys/purchaseplus/purchaseplus_backend/compareapi/sendDataToManager",
          formdata
        );
        if (res.data.status == "success") {
          Swal.fire("ส่งข้อมูลสำเร็จ", "", "success").then(() => {
            this.$router.push({ name: "Comparevendorlist" });
          });
          console.log(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isClick = false;
      }
    },
    async printCompareDocument() {
      try {
        //code
        const formdata = new FormData();
        formdata.append('vendor', JSON.stringify(this.vendors));
        formdata.append('items', JSON.stringify(this.items));
        formdata.append('selectedVendorIndex', this.selectedVendorIndex);
        formdata.append('vendorSelectionReason', this.vendorSelectionReason);
        formdata.append('dataareaid', this.dataareaid);
        formdata.append('accountnum', this.accountnum);
        formdata.append('user_create', this.user_create);
        formdata.append('datetime_create', this.datetime_create);
        formdata.append('dept_create', this.dept_create);
        formdata.append('ecode_create', this.ecode_create);
        formdata.append('compare_formno', this.formno);
        formdata.append('compare_status', this.compare_status);
        formdata.append('approvalStatus', this.approvalStatus);
        formdata.append('approvalMemo', this.approvalMemo);
        formdata.append('user_approval', this.user_approval);
        formdata.append('ecode_approval', this.ecode_approval);
        formdata.append('datetime_approval', this.datetime_approval);
        formdata.append('vendorCount', this.vendorCount);
        formdata.append('docnumber' , this.docnumber);

        const res = await axios.post(this.url + "intsys/purchaseplus/purchaseplus_backend/compareapi/pdf/send_compare_preview", formdata);
        // if (res.data) {
        //   const pdfBase64 = res.data;
        //   const pdfViewer = document.getElementById('pdfViewer_compare');
        //   pdfViewer.src = 'data:application/pdf;base64,' + pdfBase64;
        //   this.openPrintPreviewCompareModal();
        // }

        if (res.data) {
          const pdfBase64 = res.data;
          const byteCharacters = atob(pdfBase64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });

          // 🔸 สร้าง URL สำหรับ preview
          const blobUrl = URL.createObjectURL(blob);
          const pdfViewer = document.getElementById('pdfViewer_compare');
          pdfViewer.src = blobUrl;

          // ✅ ตั้งให้ลิงก์ดาวน์โหลดมีชื่อ
          const downloadBtn = document.getElementById('downloadBtn');
          downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'Compare-Vendor-'+this.formno+'.pdf'; // 📝 ตั้งชื่อไฟล์ที่ต้องการ
            a.click();
          };

          this.openPrintPreviewCompareModal();
        }

      } catch (error) {
        console.error(error);
      }
    },
    openPrintPreviewCompareModal() {

      const printCompareModal = new Modal(document.getElementById('printCompareModal'), {
        keyboard: false,
        backdrop: 'static'
      });
      printCompareModal.show();
    },
    closePrintPreviewCompareModal() {
      const modalEl = document.getElementById('printCompareModal');
      const modal = Modal.getInstance(modalEl);
      modal.hide();

      // 🧹 ลบ backdrop ด้วย
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }

      // 🧼 ล้าง body class (บางที Bootstrap จะไม่ลบเอง)
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = null;
    },
  },
  computed: {
    totalPricesPerVendor() {
      const totals = Array(this.vendors.length).fill(0);
      this.items.forEach((item) => {
        item.prices.forEach((price, index) => {
          totals[index] += parseFloat(price) || 0;
        });
      });
      return totals;
    },
    selectedVendor() {
      return this.vendors.find((v) => v.vendor_index === this.selectedVendorIndex) || null;
    },
    imageFiles() {
      return this.uploadedFiles
        .filter((f) => {
          const ext = f.name.split(".").pop().toLowerCase();
          return ["jpg", "jpeg", "png"].includes(ext);
        })
        .map((f) => ({
          ...f,
          fullPath:
            this.url +
            "intsys/purchaseplus/purchaseplus_backend/" +
            f.path +
            f.name,
        }));
    },
    pdfFiles() {
      return this.uploadedFiles
        .filter((f) => f.name.split(".").pop().toLowerCase() === "pdf")
        .map((f) => ({
          ...f,
          fullPath:
            this.url +
            "intsys/purchaseplus/purchaseplus_backend/" +
            f.path +
            f.name,
        }));
    },
    shouldShowApproval() {
      const status = this.compare_status;
      const user = this.userData;

      if (!this.isDataLoaded) return false;

      if (status === "Compare Approved" || status === "Compare Not Approve" || status === "Compare Used") {
        return true;
      }

      if (
        status === "Pending Approve" &&
        user.DeptCode === this.deptcode_create &&
        parseInt(user.posi) > 65
      ) {
        return true;
      }

      return false;
    },
    userData() {
      return this.$store.getters.get_userdata;
    },
  },
  created() {
    // if (!this.$store.getters.canAccess(this.$route.params.deptcodecreate)) {
    //   this.$router.push({ name: "Home" }); // หรือหน้าอื่นๆ ที่ต้องการ redirect
    // }
    console.log(this.$route.params.deptcodecreate);
  },
};
</script>

<style scoped>
.mt-3 {
  margin-top: 1rem;
}

.radioChooseVendor {
  width: 20px;
  height: 20px;
  border-color: blue;
}

.radioChooseVendor:hover {
  cursor: pointer;
}

.highlight-vendor {
  background-color: #12cb3d;
  /* สีพื้นอ่อนๆ */
}

.statusDoc {
  position: absolute;
  top: 5px;
  right: 0px;
}
</style>