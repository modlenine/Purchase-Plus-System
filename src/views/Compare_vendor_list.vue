<template>
  <div id="compare_vendor_list">
    <div class="main-container">
      <div class="pd-ltr-20">
        <div class="row">
          <div class="col-xl-12 mb-30">
            <div class="card-box height-100-p pd-20">
              <div class="row form-group">
                <div class="col-md-12 form-group">
                  <h4 style="text-align: center">
                    หน้าแสดงรายการ Compare Vendor
                  </h4>
                  <router-link to="/create_compare_vendor" type="button" class="btn btn-primary newBtn"><i
                      class="dw dw-add-file1 mr-2"></i>สร้างรายการ</router-link>
                </div>
              </div>
              <hr />

              <Filter_comparelist @onSearch="handleSearch" @onResetFilter="resetFilterAndReloadTable" />

              <table id="tbl_comparelist" class="table table-striped table-bordered" cellspacing="0">
                <thead>
                  <tr>
                    <!-- <th class="td1">Ulid</th> -->
                    <th>เลขที่เอกสาร</th>
                    <th>รายการสินค้า</th>
                    <th>ผู้ขาย</th>
                    <th>ผู้ร้องขอ</th>
                    <th>แผนก</th>
                    <th>วันที่</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Filter_comparelist from "@/components/Filter_comparelist.vue";
// import axios from 'axios';
export default {
  name: "Compare_vendor_list",
  components: {
    Filter_comparelist
  },
  data() {
    return {
      url: this.getUrl(),
      userData: this.getSessionStorage(),
      filterData: {         // เพิ่มตรงนี้
        startDate: "",
        endDate: "",
        itemid: "",
        status: ""
      }
    };
  },
  methods: {
    resetFilterAndReloadTable() {
      const proxy = this;
      // เคลียร์ค่าที่ค้างใน DataTable (เฉพาะตอนกดปุ่ม reset)
      let table = $('#tbl_comparelist').DataTable();
      table.state.clear();
      $('.col-search-input').val('');
      proxy.filterData = {};
      proxy.load_compare_list_filter(); // สร้างใหม่
    },
    handleSearch(filter) {
      this.filterData = filter;
      this.load_compare_list_filter(); // เรียกใหม่พร้อมส่งค่า filter นี้
    },
    load_compare_list_filter() {
      const proxy = this;

      let thid = 1;
      $("#tbl_comparelist thead th").each(function () {
        var title = $(this).text();
        $(this).html(
          title +
          ' <input type="text" id="tbl_comparelist' +
          thid +
          '" class="col-search-input" placeholder="Search ' +
          title +
          '" />'
        );
        thid++;
      });
      $("#tbl_comparelist").DataTable().destroy();
      var table = $("#tbl_comparelist").DataTable({
        scrollX: true,
        processing: true,
        serverSide: true,
        stateSave: true,
        stateLoadParams: function (settings, data) {
          for (let i = 0; i < data.columns["length"]; i++) {
            let col_search_val = data.columns[i].search.search;
            if (col_search_val !== "") {
              $("input", $("#tbl_comparelist thead th")[i]).val(col_search_val);
            }
          }
        },
        ajax: {
          url:
            proxy.url +
            "intsys/purchaseplus/purchaseplus_backend/compareapi/get_compareList_json",
          type: "POST",
          data: function (d) {
            d.userData_deptcode = proxy.userData.DeptCode;
            d.userData_ecode = proxy.userData.ecode;
            d.userData_posi = proxy.userData.posi;

            // แยกจาก filterData
            d.filter_startdate = proxy.filterData.startDate;
            d.filter_enddate = proxy.filterData.endDate;
            d.filter_itemid = proxy.filterData.itemid;
            d.filter_status = proxy.filterData.status;
          }
        },
        columns: [
          {
            data: "formno",
            render: function (data, type, row) {
              return `<a href="javascript:void(0)" class="select_form_compare" 
              data-formno="${data}" 
              data-ecode_create="${row.ecode_create}" 
              data-deptcode_create="${row.deptcode_create}"><b>${data}</b></a>`;
            },
          },
          { data: "items_all" },
          { data: "vendorname" },
          { data: "ecode_create" },
          { data: "deptcode_create" },
          { data: "datetime_create" },
          {
            data: "compare_status",
            render: function (data) {
              return data;
            },
          },
        ],
        order: [[0, "desc"]],
        columnDefs: [
          {
            targets: "_all",
            orderable: false,
          },
          { targets: [0, 3, 4], width: "80px" },
          { targets: [1], width: "200px" },
        ],
      });

      table.columns().every(function () {
        var table = this;
        $("input", this.header()).on("keyup change", function () {
          if (table.search() !== this.value) {
            table.search(this.value).draw();
          }
        });
      });

      $("#tbl_comparelist2 , #tbl_comparelist6").prop("readonly", true).css({
        "background-color": "#F5F5F5",
        cursor: "no-drop",
      });
    },
  },
  mounted() {
    const proxy = this;
    this.load_compare_list_filter();

    $(document).on("click", ".select_form_compare", function () {
      const formno = $(this).data("formno");
      // const ecode_create = $(this).data("ecode_create");
      const deptcodecreate = $(this).data("deptcode_create");
      const currentFormno = proxy.$route.params.formno;

      if (currentFormno !== formno) {
        proxy.$nextTick(() => {
          proxy.$router.push({
            name: "Compare_vendor_viewfull",
            params: { formno, deptcodecreate },
          }).catch(err => {
            if (err.name !== "NavigationDuplicated") {
              // console.error(err);
            }
          });
        });
      }
    });
  },
  watch: {
    "$route.params.reloadKey": {
      immediate: true,
      handler() {
        this.load_compare_list_filter();
      },
    },
  },
};
</script>

<style></style>