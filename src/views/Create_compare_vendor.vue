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
                            <label><b>ผู้ขาย : {{ vendor.name }}</b></label>
                            <div class="input-group">
                                <input type="number" class="form-control" v-model="newItem.prices[index]"
                                    :disabled="newItem.no_quoted[index]" placeholder="กรอกราคา" />
                                <div class="input-group-append ml-2">
                                    <div class="form-check">
                                        <input class="form-check-input noquote" type="checkbox" :id="'noquote-' + index"
                                            v-model="newItem.no_quoted[index]"
                                            @change="handleNoQuoteToggle(index)" />
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
                                <h3>สร้างรายการ Compare Vendor</h3>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label for=""><b>เลือกสังกัดบริษัท</b></label>
                                    <select name="ip-cpv-areaid" id="ip-cpv-areaid" class="form-control"
                                        v-model="dataareaid" :disabled="submitted" required>
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
                                        v-model="vendorCount" @change="updateVendorArray" :disabled="submitted">
                                        <option value="">กรุณาเลือกรายการ</option>
                                        <option v-for="n in 8" :key="n" :value="n + 1">{{ n + 1 }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 mt-3" v-if="vendors.length > 0">
                                    <div class="form-group position-relative" v-for="(vendor, index) in vendors"
                                        :key="index">
                                        <label>ผู้ขายรายที่ {{ index + 1 }}</label>
                                        <input type="text" class="form-control" v-model="vendors[index].name"
                                            @input="getVendID(vendors[index].name, index)"
                                            :placeholder="`กรอกชื่อ ผู้ขายรายที่ #${index + 1}`" :disabled="submitted"
                                            :ref="'vendorInput_' + index" />
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

                            <div class="row mt-3" v-if="vendors.length > 0">
                                <div class="col-md-4 form-group">
                                    <button type="button" class="btn btn-primary btn-block" @click="submitVendors"
                                        :disabled="submitted"><i class="dw dw-add-file1 mr-2"></i>สร้างรายการ
                                        Vendor</button>
                                </div>
                                <div class="col-md-4 form-group">
                                    <button type="button" class="btn btn-danger btn-block" @click="cancelVendors"
                                        :disabled="!cancelCreVendor || items.length > 0">
                                        <i class="dw dw-delete-3 mr-2"></i>ยกเลิกรายการ Vendor
                                    </button>
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
                                                :class="{ 'highlight-vendor': selectedVendorIndex === index }">
                                                {{ vendor.name }}
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
                                                :class="{ 'highlight-vendor': selectedVendorIndex === j }">
                                                <span v-if="item.no_quoted[j]">ไม่ได้เสนอราคา</span>
                                                <span v-else-if="editIndex.i !== i || editIndex.j !== j">
                                                    {{ Number(price).toLocaleString(undefined, {
                                                        minimumFractionDigits:
                                                    2, maximumFractionDigits: 2 }) }}
                                                    <i class="fa fa-pencil ml-2 text-primary" style="cursor: pointer;"
                                                        @click="editIndex = { i, j }"></i>
                                                </span>
                                                <input v-else type="number" class="form-control form-control-sm"
                                                    v-model.number="items[i].prices[j]"
                                                    @blur="editIndex = { i: null, j: null }" />
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
                                                :class="{ 'highlight-vendor': selectedVendorIndex === index }">
                                                {{ Number(total).toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                }) }}
                                            </th>
                                            <th></th> <!-- คอลัมน์ปุ่มลบ -->
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
                                            {{ vendor.name }}
                                        </label>
                                    </div>
                                </div>

                                <div class="mt-3" v-if="selectedVendorIndex !== null">
                                    <strong>คุณเลือก:</strong> {{ vendors[selectedVendorIndex].name }}
                                </div>
                                <hr class="mt-3">
                            </div>
                            <div class="row form-group" v-if="selectedVendor">
                                <!-- 🔻 เหตุผลในการเลือก -->
                                <div class="col-md-12">
                                    <label for="reason"><b>เหตุผลในการเลือกผู้ขาย</b></label>
                                    <textarea class="form-control" id="reason" rows="3" v-model="vendorSelectionReason"
                                        placeholder="กรุณาระบุเหตุผลในการเลือกผู้ขายรายนี้ เช่น ราคาเหมาะสม, คุณภาพ, การส่งมอบ ฯลฯ"></textarea>
                                </div>
                            </div>
                            <!-- 🔻 Dropzone Upload (no form) -->
                            <div class="form-group mt-3" v-if="selectedVendorIndex !== null">
                                <label><b>แนบไฟล์เพิ่มเติม (ถ้ามี)</b></label>
                                <div ref="uploadArea" class="dropzone border rounded p-3" id="compareUploadZone"></div>
                            </div>
                            <div class="row form-group" v-if="selectedVendorIndex !== null">
                                <div class="col-md-3 form-group-sm">
                                    <label for=""><b>ลงชื่อเจ้าหน้าที่จัดหา</b></label>
                                    <input type="text" name="ip-userpost" id="ip-userpos" class="form-control" readonly
                                        :value="userData.Fname + ' ' + userData.Lname">
                                </div>
                                <div class="col-md-3 form-group-sm">
                                    <label for=""><b>แผนก</b></label>
                                    <input type="text" name="ip-dept" id="ip-dept" class="form-control" readonly
                                        :value="userData.Dept">
                                </div>
                                <div class="col-md-3 form-group-sm">
                                    <label for=""><b>รหัสพนักงาน</b></label>
                                    <input type="tel" name="ip-ecode" id="ip-ecode" class="form-control" readonly
                                        :value="userData.ecode">
                                </div>
                                <div class="col-md-3 form-group-sm">
                                    <label for=""><b>วันที่ร้องขอ</b></label>
                                    <input type="text" name="ip-datetimecreate" id="ip-datetimecreate"
                                        class="form-control" :value="docdatetime" readonly>
                                </div>
                            </div>
                            <div class="row form-group" v-if="selectedVendorIndex !== null">
                                <div class="col-md-4 form-group-sm"></div>
                                <div class="col-md-4 form-group-sm">
                                    <button @click="cancelAll" type="button" class="btn btn-danger btn-block"
                                        id="btn-saveDataCompare"><i
                                            class="dw dw-delete-3 mr-2"></i>ยกเลิกรายการทั้งหมด</button>
                                </div>
                                <div class="col-md-4 form-group-sm">
                                    <button type="button" class="btn btn-primary btn-block" id="btn-saveDataCompare"
                                        @click="saveVendorCompare" :disabled="isSaving"><i
                                            class="dw dw-diskette2 mr-2"></i>บันทึกข้อมูล</button>
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
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'
import Swal from 'sweetalert2'
// import $ from 'jquery';
export default {
    name: "Create_compare_vendor",
    data() {
        return {
            url: this.getUrl(),
            vendorCount: '',
            vendors: [],
            submitted: false,
            cancelCreVendor: false,
            newItem: {
                itemid: '',
                itemname: '',
                itemgroupid: '',
                itemdetail: '',
                itemunit: '',
                prices: [],
                no_quoted: [] // <-- เพิ่มเพื่อเก็บ checkbox state
            },
            items: [],
            dataareaid: '',
            vendorSuggestions: [], // array ที่เก็บผลลัพธ์ของแต่ละ input
            selectedVendorIndex: null, // จะเก็บ index ของ vendor ที่ถูกเลือก
            vendorSelectionReason: '',
            vendorSelectionAccountnum: '',
            userData: this.getSessionStorage(),
            dropzone: null, // เก็บ dropzone instance
            itemSuggestions: [], // 💡 ใช้เก็บผลลัพธ์การค้นหา item
            isSaving: false,
            editIndex: { i: null, j: null }, // ตำแหน่งของช่องที่กำลังแก้ไขอยู่
        }
    },
    methods: {
        handleNoQuoteToggle(index) {
            if (this.newItem.no_quoted[index]) {
                this.newItem.prices[index] = ''; // ล้างช่องราคา
            }
        },
        updateItemPrice(itemIndex, vendorIndex, newPrice) {
            const value = parseFloat(newPrice) || 0;
            this.items[itemIndex].prices.splice(vendorIndex, 1, value);
            // ไม่ต้องคำนวณรวมด้วยตนเอง ถ้าใช้ computed `totalPricesPerVendor`
            this.editIndex = { i: null, j: null }; // ปิดการแก้ไขเมื่อเปลี่ยนค่า
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
        updateVendorArray() {
            const count = parseInt(this.vendorCount) || 0;
            this.vendors = Array.from({ length: count }, () => ({
                name: '',
                accountnum: '',
                dataareaid: ''
            }));
            this.submitted = false;
        },
        submitVendors() {
            // 🔍 เช็กว่ากรอกชื่อ vendor ครบทุกช่องหรือไม่
            const hasEmptyVendor = this.vendors.some(v => !v.name || v.name.trim() === '');

            if (hasEmptyVendor) {
                Swal.fire({
                    title: 'กรุณากรอกชื่อผู้ขายให้ครบถ้วน',
                    icon: 'warning',
                    confirmButtonText: 'ตกลง'
                });
                return; // ❌ ไม่ไปต่อ
            }

            // ✅ ผ่านแล้ว ค่อย mark ว่า submitted
            this.submitted = true;
            this.cancelCreVendor = true;
            this.vendorSuggestions = [];
            console.log('Vendors:', this.vendors);
        },
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
        selectItem(item) {
            this.newItem.itemid = item.itemid;
            this.newItem.itemname = item.itemname;
            this.newItem.itemgroupid = item.itemgroupid;
            this.newItem.itemunit = item.unitid;
            this.itemSuggestions = [];
        },
        selectVendor(index, vendorData) {
            // นำชื่อ vendor ที่เลือกไปใส่ใน v-model
            this.vendors[index] = {
                name: vendorData.name,
                accountnum: vendorData.accountnum,
                dataareaid: vendorData.dataareaid
            }
            // เคลียร์ suggestion ทิ้ง
            this.$set(this.vendorSuggestions, index, []);
            // ถ้าคุณอยากเก็บข้อมูลเพิ่มเติม เช่น accountnum แยกไว้ต่างหาก ก็บอกได้นะครับ!
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
        cancelVendors() {
            if (confirm("คุณต้องการยกเลิกรายการ Vendor หรือไม่?")) {
                this.dataareaid = '';
                this.vendorCount = '';
                this.vendors = [];
                this.vendorSuggestions = [];
                this.submitted = false;
            }
        },
        cancelAll() {
            // ถามยืนยันก่อน
            Swal.fire({
                title: 'คุณแน่ใจหรือไม่?',
                text: 'การยกเลิกจะล้างรายการที่สร้างทั้งหมด',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'ใช่, กลับไปหน้าแรก',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push({ name: 'Comparevendorlist' });
                }
            });
        },
        initDropzone() {
            if (this.dropzone) return; // ป้องกันสร้างซ้ำ

            this.$nextTick(() => {
                Dropzone.autoDiscover = false;
                this.dropzone = new Dropzone(this.$refs.uploadArea, {
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
        async saveVendorCompare() {
            this.isSaving = true;
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
                formData.append('selected_vendor_accountnum', this.selectedVendor.accountnum);
                formData.append('selected_vendor_name', this.selectedVendor.name);
                formData.append('reason', this.vendorSelectionReason);
                formData.append('selectedVendorIndex', this.selectedVendorIndex);

                // ข้อมูลผู้ใช้
                formData.append('user_ecode', this.userData.ecode);
                formData.append('user_dept', this.userData.Dept);
                formData.append('user_deptcode', this.userData.DeptCode);
                formData.append('user_name', `${this.userData.Fname} ${this.userData.Lname}`);
                formData.append('datetime', this.docdatetime);

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
                const res = await axios.post(this.url + 'intsys/purchaseplus/purchaseplus_backend/compareapi/saveCompareVendor', formData);
                if (res.data.status === 'success') {
                    Swal.fire('บันทึกข้อมูลสำเร็จ', '', 'success').then(() => {
                        this.$router.push({ name: 'Comparevendorlist' });
                    });
                } else {
                    Swal.fire('เกิดข้อผิดพลาดในการบันทึก', res.data.message || '', 'error');
                }
            } catch (error) {
                console.error(error);
                Swal.fire('เกิดข้อผิดพลาดในการเชื่อมต่อ', '', 'error');
            } finally {
                this.isSaving = false;
            }
        }

    },
    mounted() {
        this.$store.dispatch('setDatetimeNow');
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    computed: {
        docdatetime() {
            return this.$store.getters.get_datetimeNow;
        },
        totalPricesPerVendor() {
            if (!this.items || !this.vendors) return [];

            return this.vendors.map((_, vendorIndex) => {
                return this.items.reduce((sum, item) => {
                    const price = parseFloat(item.prices?.[vendorIndex]) || 0;
                    return sum + price;
                }, 0);
            });
        },
        selectedVendor() {
            return this.vendors[this.selectedVendorIndex] || null;
        }
    },
    watch: {
        selectedVendorIndex(index) {
            if (index === null || index === undefined) return;

            const vendor = this.vendors[index];

            if (!vendor) {
                Swal.fire({
                    title: 'กรุณาเลือก ผู้ค้าที่ลงทะเบียนแล้วเท่านั้น',
                    icon: 'warning',
                    showConfirmButton: true,
                }).then(() => {
                    // ✅ ล้าง Dropzone ที่มีอยู่ก่อน
                    if (this.dropzone) {
                        this.dropzone.destroy();
                        this.dropzone = null;
                    }
                    this.selectedVendorIndex = null;
                    this.vendorSelectionAccountnum = '';
                });
            } else {
                // ✅ สร้าง Dropzone เฉพาะตอนเลือก vendor สำเร็จ
                this.$nextTick(() => {
                    this.initDropzone();
                });
                this.vendorSelectionAccountnum = vendor.accountnum;
            }
        },
    }
}
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

.noquote{
    width:18px;
    height:18px;
    border:1px solid #b4b4b4;
}
</style>