<template>
  <div id="itemlist_view">
    <div class="table-responsive">
    <table id="tbl-itemdataShow" name="tbl-itemdataShow" class="table table-bordered table-striped">
        <thead>
            <tr>
                <th><b>ลำดับ</b></th>
                <th><b>รหัสสินค้า</b></th>
                <th><b>ชื่อสินค้า</b></th>
                <th><b>รายละเอียด</b></th>
                <th><b>จำนวน</b></th>
                <th><b>ราคาต่อหน่วย</b></th>
                <th><b>ส่วนลด</b></th>
                <th><b>ราคารวม</b></th>
                <th><b>หน่วย</b></th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Swal from 'sweetalert2'
export default {
    name:"Itemlist_view",
    data() {
        return {

        }
    },
    props:[
        'itemdataProp'
    ],
    methods: {
        getItemdata()
        {   
            let tableHtml = ``
            if(this.itemdataProp.length === 0){
                tableHtml +=`
                <tr class="trCenter">
                    <td colspan="11">ไม่พบข้อมูลสินค้าที่ขอซื้อ</td>
                </tr>
                `;
            }else{
                //code
                let calcItempriceSum = 0;
                for(let key in this.itemdataProp){
                    let no = parseInt(key)+1;
                    calcItempriceSum += parseFloat(this.itemdataProp[key].itempricesum);
                    tableHtml +=`
                    <tr>
                        <td>${no}</td>
                        <td>${this.itemdataProp[key].itemid}</td>
                        <td>${this.itemdataProp[key].itemname}</td>
                        <td>${this.itemdataProp[key].itemdetail}</td>
                        <td>${this.itemdataProp[key].itemqty}</td>
                        <td>${parseFloat(this.itemdataProp[key].itemprice).toLocaleString()}</td>
                        <td>${parseFloat(this.itemdataProp[key].itemdiscount).toLocaleString()}</td>
                        <td>${parseFloat(this.itemdataProp[key].itempricesum).toLocaleString()}</td>
                        <td>${this.itemdataProp[key].itemunit}</td>
                    </tr>
                    `;
                }
                // let thaiText = this.numberToThaiText(calcItempriceSum);
                tableHtml +=`
                <tr>
                    <td colspan="5"><b>ยอดรวมทั้งสิ้น</b></td>
                    <td colspan="3"></td>
                    <td colspan="3" class="text-right">${parseFloat(calcItempriceSum.toFixed(2)).toLocaleString()} บาท</td>
                </tr>
                `;
            }
            $('#tbl-itemdataShow tbody').html(tableHtml);
        },

    },
    created() {
        this.formValidate();
    },
    mounted() {
        const proxy = this;
        // this.getItemdata();


        $(document).on('click' , '.itemListDel' , function(){
            Swal.fire({
            title: 'ต้องการลบข้อมูล ใช่หรือไม่',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            }).then((result)=>{
                if(result.value === true){
                    const data_key = $(this).attr("data_key");
                    proxy.itemdataProp.splice(data_key, 1);
                    proxy.getItemdata();
                }
            });
        });

    },
    watch: {
        itemdataProp: {
            handler() {
                this.getItemdata();
            },
            immediate: true,
            deep: true
        }
    },
    computed: {
        
    },
}
</script>

<style>

</style>