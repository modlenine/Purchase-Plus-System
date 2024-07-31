<template>
  <div id="filter_prlist">
    <div class="row mt-3">
        <div class="col-md-12">
            <div class="card-box height-100-p pd-10">
                <div class="row mb-2 filter_date">
                    <div class="col-md-4">
                        <div class="custom-control custom-radio">
                            <input type="radio" id="ip-filter-requestDate" name="ip-filter-date" class="custom-control-input" value="requestDate">
                            <label class="custom-control-label" for="ip-filter-requestDate">วันที่ร้องขอ</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input type="radio" id="ip-filter-deliveryDate" name="ip-filter-date" class="custom-control-input" value="deliveryDate">
                            <label class="custom-control-label" for="ip-filter-deliveryDate">วันที่ส่งมอบ</label>
                        </div>
                    </div>
                    <div class="col-md-4 form-group">
                        <input type="text" name="ip-filter-startdate" id="ip-filter-startdate" class="form-control" placeholder="วันที่เริ่ม">
                    </div>
                    <div class="col-md-4 form-group">
                        <input type="text" name="ip-filter-enddate" id="ip-filter-enddate" class="form-control" placeholder="วันที่สิ้นสุด">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 form-group">
                        <input type="text" name="ip-filter-itemid" id="ip-filter-itemid" class="form-control" placeholder="ค้นหาด้วยรหัสสินค้า">
                    </div>
                    <div class="col-md-3 form-group">
                        <input type="text" name="ip-filter-status" id="ip-filter-status" class="form-control" placeholder="ค้นหาด้วย สถานะ">
                    </div>
                    <div class="col-md-3 form-group">
                        <button type="button" class="btn btn-info btn-block" name="btn-filter-search" id="btn-filter-search"><i class="dw dw-analytics-5 mr-2"></i>ค้นหา</button>
                    </div>
                    <div class="col-md-3 form-group">
                        <button type="button" class="btn btn-warning btn-block" name="btn-filter-resetSearch" id="btn-filter-resetSearch"><i class="dw dw-refresh2 mr-2"></i>ล้างค่า</button>
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
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        $('#ip-filter-startdate').Zebra_DatePicker({
            pair: $('#ip-filter-enddate')
        });
        $('#ip-filter-enddate').Zebra_DatePicker({
            direction: true
        });
    },
}
</script>

<style>

</style>