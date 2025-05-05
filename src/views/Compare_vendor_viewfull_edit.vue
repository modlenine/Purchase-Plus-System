<template>
    <div id="create_compare_vendor">

        <!-- Modal: เพิ่มสินค้า -->
        <div class="modal fade" id="addItem_modal" tabindex="-1" role="dialog" aria-labelledby="addItemLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">เพิ่มสินค้า</h5>
                        <button type="button" class="close" @click="closeItemModal">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label><b>รหัสสินค้า</b></label>
                            <input type="text" class="form-control" v-model="newItem.itemid" @input="getItemid"
                                placeholder="กรอกรหัสในระบบ AX (ถ้าไม่มีในระบบปล่อยว่างไว้)" />
                            <!-- รายการค้นหา -->
                            <ul class="list-group position-absolute w-100" v-if="itemSuggestions.length > 0"
                                style="z-index: 1000; max-height: 200px; overflow-y: auto;">
                                <li class="list-group-item" v-for="(item, index) in itemSuggestions" :key="index"
                                    @click="selectItem(item)" style="cursor: pointer;">
                                    {{ item.itemid }}
                                </li>
                            </ul>
                        </div>
                        <div class="form-group">
                            <label><b>ชื่อสินค้า</b></label>
                            <input type="text" class="form-control" v-model="newItem.itemname" readonly />
                        </div>
                        <div class="form-group">
                            <label><b>รายละเอียด</b></label>
                            <textarea class="form-control" v-model="newItem.itemdetail"></textarea>
                        </div>
                        <div class="form-group" v-for="(vendor, index) in vendors" :key="index">
                            <label><b>ผู้ขาย : {{ vendor.vendor_name }}</b></label>

                            <div class="input-group">
                                <input type="number" class="form-control" v-model="newItem.prices[index]"
                                    :disabled="newItem.no_quoted[index]" placeholder="กรอกราคา" />
                                <div class="input-group-append ml-2">
                                    <div class="form-check">
                                        <input class="form-check-input noquote" type="checkbox" :id="'noquote-' + index"
                                            v-model="newItem.no_quoted[index]" @change="handleNoQuoteToggle(index)" />
                                        <label class="form-check-label" :for="'noquote-' + index">
                                            ไม่เสนอราคา
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeItemModal">ปิด</button>
                        <button type="button" class="btn btn-primary" @click="saveItem">บันทึกสินค้า</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-container">
            <div class="pd-ltr-20">
                <div class="row">
                    <div class="col-xl-12 mb-30">
                        <div class="card-box height-100-p pd-20">
                            <div class="row form-group text-center">
                                <h3>รายการ Compare Vendor (แก้ไขเอกสาร)</h3>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label for=""><b>เลือกสังกัดบริษัท</b></label>
                                    <select name="ip-cpv-areaid" id="ip-cpv-areaid" class="form-control"
                                        v-model="dataareaid" disabled>
                                        <option value="">กรุณาเลือกบริษัท</option>
                                        <option value="sln">Salee Colour Public Company Limited.</option>
                                        <option value="poly">Poly Meritasia Co.,Ltd.</option>
                                        <option value="ca">Composite Asia Co.,Ltd.</option>
                                        <option value="st">Subterra Co.,Ltd.</option>
                                        <option value="tbb">The bubbles Co.,Ltd.</option>
                                    </select>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label for=""><b>เลือกจำนวน Vendor ที่ต้องการ Compare</b></label>
                                    <select name="add-vend-number" id="add-vend-number" class="form-control"
                                        v-model="vendorCount" disabled>
                                        <option value="">กรุณาเลือกรายการ</option>
                                        <option v-for="n in 9" :key="n" :value="n">{{ n }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 mt-3" v-if="vendors.length > 0">
                                    <div class="form-group position-relative" v-for="(vendor, index) in vendors"
                                        :key="'vendor-' + index">
                                        <label>ผู้ขายรายที่ {{ index + 1 }}</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" :disabled="!vendor.isEditing"
                                                v-model="vendor.vendor_name"
                                                @input="getVendID(vendor.vendor_name, index)"
                                                :ref="'vendorInput_' + index" />
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-primary" v-if="!vendor.isEditing"
                                                    @click="enableVendorEdit(index)">
                                                    <i class="fa fa-pencil"></i>
                                                </button>
                                                <button class="btn btn-outline-success" v-else
                                                    @click="saveVendorEdit(index)">
                                                    <i class="fa fa-check"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <!-- แสดงรายการค้นหา -->
                                        <ul class="list-group position-absolute w-100"
                                            v-if="vendorSuggestions[index] && vendorSuggestions[index].length > 0"
                                            style="z-index: 1000; max-height: 200px; overflow-y: auto;"
                                            :ref="'vendorList_' + index">
                                            <li class="list-group-item"
                                                v-for="(suggestion, sIndex) in vendorSuggestions[index]" :key="sIndex"
                                                @click="selectVendor(index, suggestion)" style="cursor: pointer;">
                                                {{ suggestion.accountnum }} | {{ suggestion.name }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <hr class="mt-3" v-if="submitted">
                            <div class="row mt-3">
                                <div class="col-md-4" v-if="submitted">
                                    <button type="button" class="btn btn-success btn-block" @click="openItemModal">+
                                        เพิ่มสินค้า</button>
                                </div>
                            </div>
                            <hr class="mt-3" v-if="submitted">
                            <!-- แสดงรายการสินค้าใน modal หลัก -->
                            <div class="row col-md-12 mt-3" v-if="items.length > 0">
                                <h5>รายการสินค้า:</h5>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ชื่อสินค้า</th>
                                            <th v-for="(vendor, index) in vendors" :key="'head-' + index"
                                                :class="{ 'highlight-vendor': selectedVendorIndex == index }">
                                                {{ vendor.vendor_name }}
                                            </th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, i) in items" :key="'row-' + i">
                                            <td>
                                                <!-- ✅ ถ้ามี itemid หรือ itemname -->
                                                <div v-if="item.itemid || item.itemname">
                                                    <span>{{ item.itemid }}</span> / <span>{{ item.itemname
                                                    }}</span><br>
                                                    <small class="text-muted">{{ item.itemdetail }}</small>
                                                </div>

                                                <!-- ❗ ถ้าไม่มี itemid และ itemname -->
                                                <div v-else>
                                                    <span>{{ item.itemdetail }}</span>
                                                </div>
                                            </td>
                                            <td v-for="(price, j) in item.prices" :key="'price-' + j"
                                                :class="{ 'highlight-vendor': selectedVendorIndex == j }">
                                                <!-- 🔍 ถ้ามีการติ๊กว่าไม่เสนอราคา -->
                                                <span v-if="item.no_quoted[j]">ไม่ได้เสนอราคา</span>
                                                <span v-else-if="!(editIndex.i === i && editIndex.j === j)">
                                                    {{ Number(price).toLocaleString(undefined, {
                                                        minimumFractionDigits:
                                                            2, maximumFractionDigits: 2
                                                    }) }}
                                                    <i class="fa fa-pencil ml-2 text-primary" style="cursor:pointer"
                                                        @click="editIndex = { i, j }"></i>
                                                </span>
                                                <input v-else type="number" class="form-control form-control-sm"
                                                    :value="price" @input="updateItemPrice(i, j, $event.target.value)"
                                                    @blur="editIndex = { i: null, j: null }"
                                                    style="max-width: 100px;" />
                                            </td>
                                            <td>
                                                <button class="btn btn-danger btn-sm" @click="removeItem(i)">ลบ</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>รวม</th>
                                            <th v-for="(total, index) in totalPricesPerVendor" :key="'total-' + index"
                                                :class="{ 'highlight-vendor': selectedVendorIndex == index }">
                                                {{ Number(total).toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                }) }}
                                            </th>
                                        </tr>
                                    </tfoot>
                                </table>
                                <hr class="mt-3">
                            </div>

                            <!-- Section: เลือก Vendor ที่ต้องการ -->
                            <div class="row col-md-12 mt-4" v-if="submitted && vendors.length > 0 && items.length > 0">
                                <h5>เลือกผู้ขายที่ต้องการ:</h5>

                                <div class="d-flex flex-wrap gap-3 mt-2">
                                    <div class="form-check form-check-inline" v-for="(vendor, index) in vendors"
                                        :key="'choose-' + index">
                                        <input class="form-check-input radioChooseVendor" type="radio" :value="index"
                                            v-model="selectedVendorIndex" :id="'vendor-radio-' + index"
                                            name="selectedVendor" />
                                        <label class="form-check-label" :for="'vendor-radio-' + index">
                                            {{ vendor.vendor_name }}
                                        </label>
                                    </div>
                                </div>
                                <div class="mt-3" v-if="selectedVendorIndex !== null">
                                    <strong>คุณเลือก: </strong>{{ vendors[selectedVendorIndex].vendor_name }}
                                </div>
                                <hr class="mt-3">

                            </div>
                            <div class="row form-group">
                                <!-- 🔻 เหตุผลในการเลือก -->
                                <div class="col-md-12">
                                    <label for="reason"><b>เหตุผลในการเลือกผู้ขาย</b></label>
                                    <textarea class="form-control" id="reason" rows="3" v-model="vendorSelectionReason"
                                        placeholder="กรุณาระบุเหตุผลในการเลือกผู้ขายรายนี้ เช่น ราคาเหมาะสม, คุณภาพ, การส่งมอบ ฯลฯ"></textarea>
                                </div>
                            </div>
                            <!-- 🔻 Dropzone Upload (no form) -->
                            <div class="form-group mt-3">
                                <label><b>แนบไฟล์เพิ่มเติม</b></label>
                                <div ref="uploadArea_edit" class="dropzone border rounded p-3"
                                    id="compareUploadZone_edit"></div>
                            </div>
                            <!-- 🔻 Section แสดงภาพ -->
                            <div v-if="imageFiles.length > 0" class="mt-4">
                                <label><b>ไฟล์ แนบ (ภาพ)</b></label>
                                <div class="d-flex flex-wrap gap-3">
                                    <div v-for="(img, index) in imageFiles" :key="'img-' + index"
                                        class="border rounded shadow-sm"
                                        style="width: 200px; overflow: hidden; position: relative;">
                                        <img :src="img.fullPath" :alt="img.name" class="img-fluid"
                                            style="width: 100%; height: 200px; object-fit: cover; cursor: pointer;"
                                            @click="previewImage(img.fullPath)" />
                                        <button class="btn btn-sm btn-danger mt-1 btn-block"
                                            @click="confirmDeleteFile(img)">ลบไฟล์</button>
                                    </div>
                                </div>
                            </div>

                            <!-- 🔻 Section แสดง PDF -->
                            <div v-if="pdfFiles.length > 0" class="mt-4">

                                <label><b>ไฟล์ แนบ (เอกสาร)</b></label>
                                <div class="d-flex flex-wrap gap-3">
                                    <div v-for="(pdf, index) in pdfFiles" :key="'pdf-' + index"
                                        class="d-flex flex-column p-2 border rounded shadow-sm" style="width: 300px;">
                                        <embed :src="pdf.fullPath" type="application/pdf" width="100%" height="180px" />
                                        <!-- ลิงก์ชื่อไฟล์ -->
                                        <a :href="pdf.fullPath" target="_blank" class="text-primary mt-2 text-truncate"
                                            style="max-width: 180px; display: block;">
                                            {{ pdf.name }}
                                        </a>
                                        <button class="btn btn-sm btn-danger mt-1"
                                            @click="confirmDeleteFile(pdf)">ลบไฟล์</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3 form-group" v-if="selectedVendorIndex !== null">
                                <div class="col-md-3 form-group-sm">
                                    <label for=""><b>ลงชื่อเจ้าหน้าที่จัดหา</b></label>
                                    <input type="text" name="ip-userpost" id="ip-userpos" class="form-control" readonly
                                        :value="this.userData.Fname + ' ' + this.userData.Lname">
                                </div>
                                <div class="col-md-3 form-group-sm">
                                    <label for=""><b>แผนก</b></label>
                                    <input type="text" name="ip-dept" id="ip-dept" class="form-control" readonly
                                        :value="this.userData.Dept">
                                </div>
                                <div class="col-md-3 form-group-sm">
                                    <label for=""><b>รหัสพนักงาน</b></label>
                                    <input type="tel" name="ip-ecode" id="ip-ecode" class="form-control" readonly
                                        :value="this.userData.ecode">
                                </div>
                                <div class="col-md-3 form-group-sm">
                                    <label for=""><b>วันที่ร้องขอ</b></label>
                                    <input type="text" name="ip-datetimecreate" id="ip-datetimecreate"
                                        class="form-control" readonly :value="docdatetime">
                                </div>
                            </div>
                            <hr>
                            <div class="row" v-if="btnCtrl">
                                <div class="col-md-3 form-group">
                                    <button type="button" class="btn btn-warning btn-block" @click="goBack"><i
                                            class="dw dw-undo1 mr-2"></i>ย้อนกลับ</button>
                                </div>
                                <div class="col-md-3 form-group">
                                    <button type="button" class="btn btn-primary btn-block"
                                        @click="saveVendorCompareEdit" :disabled="isClick"><i
                                            class="dw dw-diskette1 mr-2"></i>บันทึกการแก้ไข</button>
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
import { Modal } from 'bootstrap'; // นำเข้าเฉพาะ Modal component จาก Bootstrap
import axios from 'axios';
import Swal from 'sweetalert2';
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'
export default {
    name: "Compare_vendor_viewfull",
    data() {
        return {
            url: this.getUrl(),
            formno: this.$route.params.formno || '',
            vendors: [
                // ตัวอย่าง
                { vendor_name: '', accountnum: '', dataareaid: '', vendor_index: 0, id: 0, isEditing: false, isSelected: false },
            ],
            items: [],
            selectedVendorIndex: null,
            vendorSelectionReason: '',
            userData: this.getSessionStorage(),
            dataareaid: '',
            submitted: true,
            vendorCount: 0,
            accountnum: '',
            user_create: '',
            datetime_create: '',
            dept_create: '',
            ecode_create: '',
            last_updated: '',
            btnCtrl: false,
            uploadedFiles: [],
            newItem: {
                itemid: '',
                itemname: '',
                itemgroupid: '',
                itemdetail: '',
                itemunit: '',
                prices: [],
                no_quoted: [] // <-- เพิ่มเพื่อเก็บ checkbox state
            },
            itemSuggestions: [], // 💡 ใช้เก็บผลลัพธ์การค้นหา item
            dropzone: null, // เก็บ dropzone instance
            vendorSelectionAccountnum: '',
            vendorSelectionIndex: '',
            compare_id: '',
            isClick: false,
            editIndex: { i: null, j: null },
            vendorSuggestions: [],
        };
    },
    mounted() {
        this.loadCompareData();
        this.$store.dispatch('setDatetimeNow');
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        handleNoQuoteToggle(index) {
            if (this.newItem.no_quoted[index]) {
                this.newItem.prices[index] = ''; // ล้างช่องราคา
            }
        },
        enableVendorEdit(index) {
            // ถ้ารายการที่กำลังจะ edit คือรายการที่ถูกเลือกอยู่
            if (this.selectedVendorIndex == index) {
                Swal.fire({
                    title: 'คุณกำลังจะแก้ไขผู้ขายที่เลือกไว้',
                    text: 'หากคุณดำเนินการต่อ ระบบจะล้างการเลือกผู้ขายนี้ออก',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // ✅ เคลียร์การเลือกผู้ขาย
                        this.selectedVendorIndex = null;
                        this.vendorSelectionAccountnum = '';
                        this.vendorSelectionIndex = null;

                        // ✅ อนุญาตให้แก้ไข
                        this.vendors[index].isEditing = true;

                        // ✅ ล้างและสร้าง Dropzone ใหม่
                        if (this.dropzone) {
                            this.dropzone.destroy();
                            this.dropzone = null;
                        }
                        this.$nextTick(() => {
                            this.initDropzone();
                        });
                    }
                });
            } else {
                // ✅ ถ้าไม่ตรงกับรายการที่เลือกไว้ → เปิดแก้ไขทันที
                this.$set(this.vendors[index], 'isEditing', true);
            }
            console.log('เช็ก Index : ' + index);
            console.log(this.vendors[index].isEditing);
        },
        saveVendorEdit(index) {
            const vendor = this.vendors[index];
            this.$set(this.vendors[index], 'isEditing', false);

            // ถ้ามี vendorSuggestions แสดงอยู่ และไม่ได้เลือกจาก list
            const isMatched = this.vendorSuggestions[index]?.some(s => s.name === vendor.vendor_name);

            if (!vendor.isSelected && !isMatched) {
                // ล้างข้อมูลหากไม่ได้เลือกจากรายการ
                vendor.accountnum = '';
                vendor.dataareaid = '';
            }

            // ✅ รีเซต flag ทิ้ง
            vendor.isSelected = false;

            // ✅ ถ้า vendor ที่ถูกแก้ไขเป็น vendor ที่เลือกไว้ → รีเซต index เพื่อกระตุ้น computed ใหม่
            if (this.vendorSelectionIndex === index) {
                this.vendorSelectionIndex = null;
                this.$nextTick(() => {
                    this.vendorSelectionIndex = index;
                });
            }
            // ล้าง suggestions
            this.$set(this.vendorSuggestions, index, []);
            console.log(vendor.isEditing);
        },
        selectVendor(index, suggestion) {
            // ตรวจสอบว่ามีผู้ขายซ้ำกับช่องอื่นหรือไม่
            const isDuplicate = this.vendors.some((v, i) => {
                return i !== index && v.accountnum === suggestion.accountnum;
            });

            if (isDuplicate) {
                Swal.fire({
                    title: 'พบผู้ขายซ้ำ',
                    text: `คุณได้เลือกผู้ขายนี้ไว้แล้วในอีกช่องหนึ่ง`,
                    icon: 'warning',
                    confirmButtonText: 'ตกลง'
                });
                return; // ❌ หยุดไม่ให้เลือก
            }

            this.$set(this.vendors, index, {
                compare_formno: this.formno,
                compare_id: this.compare_id,
                vendor_name: suggestion.name,
                accountnum: suggestion.accountnum,
                dataareaid: suggestion.dataareaid,
                vendor_index: index,
                id: this.vendors[index].id,
                isEditing: false,
                isSelected: false
            });
            console.log(this.vendors[index].isEditing);
            this.$set(this.vendorSuggestions, index, []);
        },
        handleClickOutside(event) {
            this.vendors.forEach((_, index) => {
                const inputEl = this.$refs[`vendorInput_${index}`]?.[0];
                const listEl = this.$refs[`vendorList_${index}`]?.[0];

                if (
                    inputEl &&
                    listEl &&
                    !inputEl.contains(event.target) &&
                    !listEl.contains(event.target)
                ) {
                    this.$set(this.vendorSuggestions, index, []); // ลบ suggestion
                }
            });
        },
        async getVendID(vendorName, index) {
            if (this.dataareaid != "" && vendorName != "") {
                const formdata = new FormData();
                formdata.append('dataareaid', this.dataareaid);
                formdata.append('vendorname', vendorName);

                const res = await axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/getVendData', formdata);
                console.log(res.data);
                if (res.data.status == "Select Data Success") {
                    // สร้าง array สำหรับ index นี้
                    this.$set(this.vendorSuggestions, index, res.data.result);
                } else {
                    this.$set(this.vendorSuggestions, index, []);
                }
            } else {
                this.$set(this.vendorSuggestions, index, []);
            }
        },
        updateItemPrice(itemIndex, vendorIndex, newPrice) {
            const value = parseFloat(newPrice) || 0;
            this.items[itemIndex].prices.splice(vendorIndex, 1, value);
        },
        async getItemid() {
            if (this.dataareaid && this.newItem.itemid.length > 1) {
                const formdata = new FormData();
                formdata.append('dataareaid', this.dataareaid);
                formdata.append('itemid', this.newItem.itemid);

                try {
                    const res = await axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/compareapi/getItemid', formdata);
                    if (res.data.status === 'success') {
                        this.itemSuggestions = res.data.result;
                        console.log(res.data.result);
                    } else {
                        this.itemSuggestions = [];
                    }
                } catch (err) {
                    console.error('Get Item Error:', err);
                    this.itemSuggestions = [];
                }
            } else {
                this.itemSuggestions = [];
            }
        },
        async loadCompareData() {
            try {
                const formdata = new FormData();
                formdata.append("formno", this.formno);
                formdata.append("deptcode", this.userData.DeptCode);

                const res = await axios.post(this.url + "intsys/purchaseplus/purchaseplus_backend/compareapi/getCompareDetailByFormno", formdata);
                console.log(res.data);
                if (res.data.status === "success") {
                    const {
                        vendors, items,
                        selectedIndex,
                        reason,
                        dataareaid,
                        accountnum,
                        user_create,
                        datetime_create,
                        dept_create,
                        ecode_create,
                        last_updated,
                        compare_status,
                        compare_id,
                        files
                    } = res.data.result;
                    this.vendors = vendors.map((v, i) => ({
                        ...v,
                        vendor_index: i,
                        isEditing: false,
                        isSelected: false
                    }));
                    this.items = items;
                    this.selectedVendorIndex = selectedIndex;
                    this.vendorSelectionReason = reason;
                    this.dataareaid = dataareaid;
                    this.vendorCount = vendors.length;
                    this.accountnum = accountnum;
                    this.user_create = user_create;
                    this.datetime_create = datetime_create;
                    this.dept_create = dept_create;
                    this.ecode_create = ecode_create;
                    this.last_updated = last_updated;
                    this.compare_id = compare_id;
                    this.uploadedFiles = files || [];
                    if (compare_status !== "Cancel") this.btnCtrl = true;

                    // ✅ ล้าง dropzone เดิมก่อน (ถ้ามี)
                    if (this.dropzone) {
                        this.dropzone.destroy();
                        this.dropzone = null;
                    }

                    // ✅ รอ DOM พร้อมก่อนค่อยสร้างใหม่
                    this.$nextTick(() => {
                        this.initDropzone();
                    });

                } else {
                    Swal.fire("ไม่พบข้อมูล", "", "error");
                }
            } catch (err) {
                console.error(err);
                Swal.fire("เกิดข้อผิดพลาดในการโหลดข้อมูล", "", "error");
            }
        },
        async cancelDocument() {
            try {
                const formdata = new FormData();
                formdata.append('formno', this.formno);
                formdata.append('last_updated', this.last_updated);
                const res = await axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/compareapi/cancelDocument', formdata);
                console.log(res.data);
                if (res.data.status == "success") {
                    Swal.fire("ยกเลิกรายการสำเร็จ", "", "success").then(() => {
                        this.$router.push({ name: 'Comparevendorlist' });
                    });
                } else {
                    Swal.fire("ยกเลิกรายการไม่สำเร็จ", "", "error");
                }
            } catch (error) {
                console.error(error);
            }
        },
        async confirmCancelDocument() {
            const result = await Swal.fire({
                title: 'คุณแน่ใจหรือไม่?',
                text: 'เมื่อยกเลิกแล้วจะไม่สามารถแก้ไขรายการนี้ได้',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'ยืนยันการยกเลิก',
                cancelButtonText: 'ยกเลิก'
            });

            if (result.isConfirmed) {
                this.cancelDocument(); // เรียก method ที่คุณเขียนไว้
            }
        },
        previewImage(imageUrl) {
            Swal.fire({
                imageUrl: imageUrl,
                imageAlt: 'แนบรูปภาพ',
                showConfirmButton: false,
                width: 'auto',
                padding: '1em',
            });
        },
        goBack() {
            this.$router.push({ name: 'Compare_vendor_viewfull', params: { formno: this.formno, deptcodecreate: this.userData.DeptCode } });
        },

        //edit Item
        openItemModal() {
            // ซ่อน modal แรก
            const vendorModal = Modal.getInstance(document.getElementById('addVendor_modal'));
            if (vendorModal) vendorModal.hide();

            // เตรียม modal สินค้า
            this.newItem = {
                itemid: '',
                itemname: '',
                itemgroupid: '',
                itemdetail: '',
                itemunit: '',
                prices: Array(this.vendors.length).fill(''),
                no_quoted: Array(this.vendors.length).fill(false)
            };

            const itemModal = new Modal(document.getElementById('addItem_modal'), {
                keyboard: false,
                backdrop: 'static'
            });
            itemModal.show();
        },
        closeItemModal() {
            const modalEl = document.getElementById('addItem_modal');
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
        saveItem() {
            if (!this.newItem.itemdetail) {
                Swal.fire('กรุณากรอกรายละเอียดสินค้า', '', 'warning');
                return;
            }

            // ✅ ตรวจสอบราคาเฉพาะช่องที่ไม่ได้ติ๊ก "ไม่เสนอราคา"
            const isAnyPriceMissing = this.newItem.prices.some((price, index) => {
                const isNoQuote = this.newItem.no_quoted[index];
                return !isNoQuote && (price === '' || price === null || isNaN(price));
            });

            if (isAnyPriceMissing) {
                Swal.fire('กรุณากรอกราคาสินค้าของผู้ขายที่ไม่ได้ติ๊ก "ไม่เสนอราคา"', '', 'warning');
                return;
            }

            if (!this.newItem.itemname || this.newItem.itemname.trim() === "") {
                this.newItem.itemid = "";
            }

            this.items.push({
                itemid: this.newItem.itemid,
                itemname: this.newItem.itemname,
                itemgroupid: this.newItem.itemgroupid,
                itemdetail: this.newItem.itemdetail,
                itemunit: this.newItem.itemunit,
                prices: [...this.newItem.prices],
                no_quoted: [...this.newItem.no_quoted] // ✅ บันทึกไปด้วย
            });

            this.closeItemModal();
        },
        removeItem(index) {
            if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?")) {
                this.items.splice(index, 1);

                // 🔍 ถ้าไม่มี item เหลือเลย → reset ค่า vendor ที่เลือก
                if (this.items.length === 0) {
                    this.selectedVendorIndex = null;
                    this.vendorSelectionReason = '';
                }
            }
        },
        selectItem(item) {
            this.newItem.itemid = item.itemid;
            this.newItem.itemname = item.itemname;
            this.newItem.itemgroupid = item.itemgroupid;
            this.newItem.itemunit = item.unitid;
            this.itemSuggestions = [];
        },
        async confirmDeleteFile(file) {
            const confirm = await Swal.fire({
                title: "คุณแน่ใจหรือไม่?",
                text: "เมื่อไฟล์ถูกลบแล้วจะไม่สามารถกู้คืนได้",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "ลบ",
                cancelButtonText: "ยกเลิก",
            });

            if (confirm.isConfirmed) {
                this.deleteFile(file);
            }
        },
        async deleteFile(file) {
            const formdata = new FormData();
            formdata.append("filename", file.name);
            formdata.append("compare_id", file.compare_id); // เพิ่ม compare_id ไว้ใน mounted ด้วยนะครับ

            try {
                const res = await axios.post(this.url + "intsys/purchaseplus/purchaseplus_backend/compareapi/deleteFile", formdata);
                if (res.data.status === "success") {
                    // ✅ ลบออกจาก array บน frontend
                    this.uploadedFiles = this.uploadedFiles.filter(f => f.name !== file.name);
                    Swal.fire("ลบไฟล์สำเร็จ", "", "success");
                    // this.loadCompareData(); // reload files
                } else {
                    Swal.fire("เกิดข้อผิดพลาด", res.data.message || "", "error");
                }
            } catch (err) {
                console.error(err);
                Swal.fire("เกิดข้อผิดพลาดในการลบไฟล์", "", "error");
            }
        },
        initDropzone() {
            if (this.dropzone) return; // ป้องกันสร้างซ้ำ

            this.$nextTick(() => {
                Dropzone.autoDiscover = false;
                this.dropzone = new Dropzone(this.$refs.uploadArea_edit, {
                    url: "#", // หรือ URL จริง
                    paramName: "file",
                    autoProcessQueue: false,
                    addRemoveLinks: true,
                    maxFilesize: 10, // MB
                    acceptedFiles: ".pdf,.jpg,.jpeg,.png",
                    dictDefaultMessage: "ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์",
                    maxRetryAttempts: 3, // จำนวนครั้งสูงสุดในการพยายามเชื่อมต่อใหม่
                    chunking: true, // เปิดใช้งานการแบ่งไฟล์เป็นชิ้น ๆ
                    chunkSize: 250000, // ขนาดของแต่ละ chunk (1 MB) 500000 = 500k
                    parallelUploads: 2, // จำนวนการอัปโหลดพร้อมกัน
                    createImageThumbnails: true,
                    thumbnailMethod: "crop",
                    thumbnailWidth: 120,
                    thumbnailHeight: 120,
                });
            });
        },
        // Vue Method: saveVendorCompare()
        async saveVendorCompareEdit() {
            this.isClick = true;

            // 🔍 เช็กว่ากรอกชื่อ vendor ครบทุกช่องหรือไม่
            const hasEmptyVendor = this.vendors.some(v => !v.vendor_name || v.vendor_name.trim() === '');

            if (hasEmptyVendor) {
                Swal.fire({
                    title: 'กรุณากรอกชื่อผู้ขายให้ครบถ้วน',
                    icon: 'warning',
                    confirmButtonText: 'ตกลง'
                });
                this.isClick = false;
                return; // ❌ ไม่ไปต่อ
            }

            try {
                if (!this.selectedVendor) {
                    Swal.fire('กรุณาเลือกผู้ขายที่ต้องการก่อนบันทึก', '', 'warning');
                    return;
                }

                if (this.items.length === 0) {
                    Swal.fire('กรุณาเพิ่มรายการสินค้าอย่างน้อย 1 รายการ', '', 'warning');
                    return;
                }

                if (!this.vendorSelectionReason.trim()) {
                    Swal.fire('กรุณาระบุเหตุผลในการเลือกผู้ขาย', '', 'warning');
                    return;
                }

                const formData = new FormData();

                // ข้อมูลทั่วไป
                formData.append('dataareaid', this.dataareaid);
                formData.append('selected_vendor_accountnum', this.vendorSelectionAccountnum);
                formData.append('selected_vendor_name', this.selectedVendor.name);
                formData.append('reason', this.vendorSelectionReason);
                formData.append('selectedVendorIndex', this.vendorSelectionIndex);
                formData.append('compare_id', this.compare_id);
                formData.append('formno', this.formno);

                // ข้อมูลผู้ใช้
                formData.append('user_ecode', this.userData.ecode);
                formData.append('user_dept', this.userData.Dept);
                formData.append('user_deptcode', this.userData.DeptCode);
                formData.append('user_name', `${this.userData.Fname} ${this.userData.Lname}`);
                formData.append('datetime', this.docdatetime);
                formData.append('last_updated', this.last_updated);

                // ข้อมูล Vendor ทั้งหมด (ที่ใช้เปรียบเทียบ)
                formData.append('vendors', JSON.stringify(this.vendors));

                // สินค้า
                formData.append('items', JSON.stringify(this.items));

                // แนบไฟล์ (Dropzone)
                if (this.dropzone && this.dropzone.getAcceptedFiles().length > 0) {
                    this.dropzone.getAcceptedFiles().forEach((file) => {
                        formData.append(`attachments[]`, file);
                    });
                }

                // ส่งข้อมูลไปยัง backend
                const res = await axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/compareapi/saveCompareVendorEdit', formData);
                if (res.data.status === 'success') {
                    Swal.fire('บันทึกข้อมูลสำเร็จ', '', 'success').then(() => {
                        this.$router.push({
                            name: 'Comparevendorlist',
                            params: { reloadKey: Date.now() }
                        });
                    });
                } else {
                    Swal.fire('เกิดข้อผิดพลาดในการบันทึก', res.data.msg || '', 'error');
                }
            } catch (error) {
                console.error(error);
                Swal.fire('เกิดข้อผิดพลาดในการเชื่อมต่อ', '', 'error');
            } finally {
                this.isClick = false;
            }
        }

    },
    computed: {
        docdatetime() {
            return this.$store.getters.get_datetimeNow;
        },
        totalPricesPerVendor() {
            const totals = Array(this.vendors.length).fill(0);
            this.items.forEach(item => {
                item.prices.forEach((price, index) => {
                    totals[index] += parseFloat(price) || 0;
                });
            });
            return totals;
        },
        selectedVendor() {
            return this.vendors.find(v => v.vendor_index === this.vendorSelectionIndex) || null;
        },
        imageFiles() {
            return this.uploadedFiles
                .filter(f => {
                    const ext = f.name.split('.').pop().toLowerCase();
                    return ['jpg', 'jpeg', 'png'].includes(ext);
                })
                .map(f => ({
                    ...f,
                    fullPath: this.url + 'intsys/purchaseplus/purchaseplus_backend/' + f.path + f.name
                }));
        },
        pdfFiles() {
            return this.uploadedFiles
                .filter(f => f.name.split('.').pop().toLowerCase() === 'pdf')
                .map(f => ({
                    ...f,
                    fullPath: this.url + 'intsys/purchaseplus/purchaseplus_backend/' + f.path + f.name
                }));
        }
    },
    watch: {
        selectedVendorIndex(index) {
            if (index === null || index === undefined) return;

            const vendor = this.vendors[index];

            if (!vendor && !vendor.accountnum) {
                this.selectedVendorIndex = null;
                this.vendorSelectionAccountnum = '';
            } else {
                this.vendorSelectionAccountnum = vendor.accountnum;
                this.vendorSelectionIndex = vendor.vendor_index;
            }
        },
    }
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

.noquote {
    width: 18px;
    height: 18px;
    border: 1px solid #b4b4b4;
}
</style>