<template>
  <div id="filter_prlist">
    <div class="row mt-3">
        <div class="col-md-12">
            <div class="card-box height-100-p pd-20">
                <div class="row">
                    <div class="col-md-3 form-group">
                        <input type="text" name="ip-filter-prodid" id="ip-filter-prodid" class="form-control" placeholder="ค้นหาด้วย PD">
                    </div>
                    <div class="col-md-3 form-group">
                        <input type="text" name="ip-filter-batchno" id="ip-filter-batchno" class="form-control" placeholder="ค้นหาด้วย Batch No.">
                    </div>
                    <div class="col-md-3 form-group">
                        <input type="text" name="ip-filter-itemno" id="ip-filter-itemno" class="form-control" placeholder="ค้นหาด้วย Item No.">
                    </div>
                    <div class="col-md-3 form-group">
                        <button type="button" class="btn btn-success btn-block" name="btn-filter-export" id="btn-filter-export"><i class="dw dw-upload2 mr-2"></i>ส่งออกข้อมูล</button>
                    </div>
                    <div class="col-md-3 form-group">
                        <input type="text" name="ip-filter-startdate" id="ip-filter-startdate" class="form-control" placeholder="วันที่เริ่ม">
                    </div>
                    <div class="col-md-3 form-group">
                        <input type="text" name="ip-filter-enddate" id="ip-filter-enddate" class="form-control" placeholder="วันที่สิ้นสุด">
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