<template>
  <div id="Printpr">
    <div class="row form-group">
        <div class="col-md-12 text-right">
            <span>{{dataprintpr.formisono}}</span>
        </div>
    </div>
    <div class="row form-group">
        <div class="col-md-6 text-left">
            <span class="text-uppercase">{{dataprintpr.companyfullname}}</span>
        </div>
        <div class="col-md-6 text-right">
            <span><b>ใบขอซื้อ / Purchase Requisition</b></span>
        </div>
    </div>
    <div class="row form-group">
        <div class="col-md-6 text-left">
            <span><b>Vender : </b>{{dataprintpr.vendid}}&nbsp;&nbsp;&nbsp;{{dataprintpr.vendname}}</span>
        </div>
        <div class="col-md-6 text-right">
            <span><b>เลขที่ PR : </b>{{dataprintpr.prno}}</span>
        </div>
    </div>
    <div class="row form-group">
        <div class="col-md-6 text-left">
            <span><b>Credit : </b>{{dataprintpr.paymtermid}}</span>
        </div>
        <div class="col-md-6 text-right">
            <span class="mr-2"><b>วันที่พิมพ์ : </b>{{dataprintpr.datetimenow}}</span>
            <span class="mr-2"><b>วันที่ : </b>{{dataprintpr.datetimecreate}}</span>
            <span><b>แผนก : </b>{{dataprintpr.department}}</span>
        </div>
    </div>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>ลำดับ</th>
                <th>รหัสสินค้า</th>
                <th>กลุ่มสินค้า</th>
                <th>รายการ</th>
                <th>วันที่กำหนดส่ง</th>
                <th>จำนวน</th>
                <th>หน่วย</th>
                <th>ราคา/หน่วย</th>
                <th>ส่วนลด</th>
                <th>เป็นเงิน</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item , index) in dataprintpr.itemData" :key="index">
                <td>{{index+1}}</td>
                <td>{{item.d_itemid}}</td>
                <td>{{item.d_itemgroupid}}</td>
                <td>{{item.d_itemdetail}}</td>
                <td>{{dataprintpr.datetimedelivery}}</td>
                <td>{{item.d_itemqty}}</td>
                <td>{{item.d_itemunit}}</td>
                <td>{{Number(item.d_itemprice).toLocaleString(undefined,{minimumFractionDigits:2 , maximumFractionDigits:2})}}</td>
                <td>{{Number(item.d_itemdiscount).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}}</td>
                <td>{{Number(item.d_itempricesum).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</td>
            </tr>
        </tbody>
    </table>
    <div class="row form-group">
        <div class="col-md-12 text-left">
            <span><b>Remark : </b>{{dataprintpr.memo}}</span>
        </div>
    </div>
    <div class="row form-group">
        <div class="col-md-12 text-right">
            <span><b>รวมเงิน / Total : </b>{{totalSum}}</span>
        </div>
    </div>
    <hr>
    <div class="row form-group">
        <div class="col-md-4 text-center">
            <span><b>ผู้ขอซื้อ / Verify Signature</b></span><br>
            <span>{{dataprintpr.userrequest}}</span><br>
            <span>{{dataprintpr.datetimecreate}}</span>
        </div>
        <div class="col-md-4 text-center">
            <span><b>ผู้ตรวจสอบ / Investigate Signature</b></span><br>
            <span>{{dataprintpr.userpostMgr}}</span><br>
            <span>{{dataprintpr.datetimepostMgr}}</span>
        </div>
        <div class="col-md-4 text-center">
            <span><b>ผู้มีอำนาจลงนาม / Authorize Signature</b></span><br>
            <div v-for="(item , index) in dataprintpr.executive" :key="index">
               <span>{{item.apv_approve_user}}&nbsp;{{item.apv_approve_datetime}}</span><br>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"printpr",
    data() {
        return {
            
        }
    },
    props: {
        dataprintpr: {
            type: Object,
            required: true
        }
    },
    methods: {
        
    },
    computed:{
        totalSum() {
            return this.dataprintpr.itemData.reduce((sum, item) => {
                return sum + parseFloat(item.d_itempricesum);
            }, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    }
}
</script>

<style scoped>
#Printpr span{
    font-size:10px !important;
}
table th , td , div{
    font-size:10px !important;
}
</style>