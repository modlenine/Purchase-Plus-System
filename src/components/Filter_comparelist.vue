<template>
    <div id="filter_comparelist">
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="card-box height-100-p pd-10">
                    <div class="row mb-2 filterCompare_date">
                        <div class="col-md-6 form-group">
                            <input type="text" name="ip-filterCompare-startdate" id="ip-filterCompare-startdate"
                                class="form-control" placeholder="วันที่เริ่ม">
                        </div>
                        <div class="col-md-6 form-group">
                            <input type="text" name="ip-filterCompare-enddate" id="ip-filterCompare-enddate"
                                class="form-control" placeholder="วันที่สิ้นสุด">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 form-group">
                            <input type="text" name="ip-filter-itemid" id="ip-filter-itemid" class="form-control"
                                placeholder="ค้นหาด้วยรหัสสินค้า , ชื่อสินค้า">
                        </div>
                        <div class="col-md-3 form-group">
                            <select name="ip-filter-status" id="ip-filter-status" class="form-control"
                                v-model="selectedStatus">
                                <option value="">-- เลือกสถานะ --</option>
                                <option v-for="item in comparestatus" :key="item.id" :value="item.status">
                                    {{ item.status }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-3 form-group">
                            <button type="button" class="btn btn-info btn-block" name="btn-filter-search"
                                id="btn-filter-search" @click="emitSearch"><i class="dw dw-analytics-5 mr-2"></i>ค้นหา</button>
                        </div>
                        <div class="col-md-3 form-group">
                            <button type="button" class="btn btn-warning btn-block" name="btn-filter-resetSearch"
                                id="btn-filter-resetSearch" @click="clearFilterInput"><i class="dw dw-refresh2 mr-2"></i>ล้างค่า</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios'
export default {
    data() {
        return {
            url: this.$store.getters.getUrl,
            comparestatus: [],
            selectedStatus: ''      // เก็บค่าสถานะที่ถูกเลือก
        }
    },
    methods: {
        async getCompareStatus() {
            const res = await axios.get(this.url + 'intsys/purchaseplus/purchaseplus_backend/compareapi/getCompareStatus');
            if (res.data.status == "success") {
                this.comparestatus = res.data.result;
            }
        },
        emitSearch() {
            this.$emit("onSearch", {
                startDate: $('#ip-filterCompare-startdate').val(),
                endDate: $('#ip-filterCompare-enddate').val(),
                itemid: $('#ip-filter-itemid').val(),
                status: this.selectedStatus
            });
        },
        clearFilterInput(){
            $('#ip-filterCompare-startdate').val('');
            $('#ip-filterCompare-enddate').val('');
            $('#ip-filter-itemid').val('');
            this.selectedStatus = '';

            this.$emit('onResetFilter');
        },
    },
    created() {

    },
    mounted() {
        this.getCompareStatus();
        $('#ip-filterCompare-startdate').Zebra_DatePicker({
            pair: $('#ip-filter-enddate')
        });
        $('#ip-filterCompare-enddate').Zebra_DatePicker({
            direction: true
        });
    },
}
</script>

<style></style>