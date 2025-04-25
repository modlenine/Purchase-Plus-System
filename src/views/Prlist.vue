<template>
  <div id="home">
    <div class="main-container">
      <div class="pd-ltr-20">

        <div class="row">
          <div class="col-xl-12 mb-30">
            <div class="card-box height-100-p pd-20">

              <div class="row form-group">
                <div class="col-md-12 form-group">
                  <h4 style="text-align:center;">หน้าแสดงรายการ PR</h4>
                  <router-link to="/createpr" type="button" class="btn btn-primary newBtn"><i
                      class="dw dw-add-file1 mr-2"></i>สร้างรายการ</router-link>
                </div>
              </div>
              <hr>

              <Filterprlist />
              <table id="tbl_prlist" class="table table-striped table-bordered" cellspacing="0">
                <thead>
                  <tr>
                    <!-- <th class="td1">Ulid</th> -->
                    <th>เลขที่เอกสาร</th>
                    <th>เลขที่เอกสาร Compare</th>
                    <th class="td2">บริษัท</th>
                    <th class="td2">เลขที่ PR</th>
                    <th class="td2">เลขที่ PO</th>
                    <th class="thItemid">รหัสสินค้า</th>
                    <th class="td2">จำนวนเงิน</th>
                    <th class="td2">แผนกที่ร้องขอ</th>
                    <th class="td3">ผู้ร้องขอ</th>
                    <th class="td4">วันที่ขอซื้อ</th>
                    <th class="td5">รหัสผู้ขาย</th>
                    <th class="td7">ชื่อผู้ขาย</th>
                    <th class="td7">วันที่ส่งของ</th>
                    <th class="td7">สถานะ</th>
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
import axios from 'axios'
import $ from 'jquery'

// import Maindata from '@/components/Maindata.vue'
import Filterprlist from '@/components/Filter_prlist.vue'
export default {
  data() {
    return {
      url: this.$store.getters.getUrl
    }
  },
  components: {
    Filterprlist
  },
  computed: {

  },
  created() {
    this.getStatus().then(() => {
      this.loadFilterOnSessionStorage();
    });
  },
  mounted() {
    const proxy = this;
    $(document).on('click', '#btn-filter-search', function () {
      let datetype_filter = $('input[name="ip-filter-date"]:checked').val();
      let startdate_filter = $('#ip-filter-startdate').val();
      let enddate_filter = $('#ip-filter-enddate').val();
      let itemid_filter = $('#ip-filter-itemid').val();
      let status_filter = $('#ip-filter-status').val();

      let filter_prlist = {
        "datetype_filter": datetype_filter,
        "startdate_filter": startdate_filter,
        "enddate_filter": enddate_filter,
        "itemid_filter": itemid_filter,
        "status_filter": status_filter,
      };

      //create session storage
      sessionStorage.setItem('filter_prlist', JSON.stringify(filter_prlist));

      let table = $('#tbl_prlist').DataTable();
      table.state.clear();

      proxy.loadPrlist();
    });

    $(document).on('click', '#btn-filter-resetSearch', function () {
      let table = $('#tbl_prlist').DataTable();
      table.state.clear();
      $('.col-search-input').val('');

      sessionStorage.removeItem("filter_prlist");
      // $('input[id="ip-filter-requestDate"]').prop('checked' , true);
      $('#ip-filter-startdate').val('');
      $('#ip-filter-enddate').val('');
      $('#ip-filter-itemid').val('');
      $('#ip-filter-status').val('');
      proxy.loadPrlist();
    });

    $(document).off('click', '.select_compareV_formno').on('click', '.select_compareV_formno', (e) => {
      const formno = $(e.currentTarget).data('compareformno');
      const deptcode = $(e.currentTarget).data('deptcode');
      if (formno && deptcode) {
        const routeUrl = this.$router.resolve({ path: `/compareview/${formno}/${deptcode}` });
        window.open(routeUrl.href, '_blank');
      }
    });
  },
  methods: {
    loadPrlist() {
      const proxy = this;

      let datetype_filter = $('input[name="ip-filter-date"]:checked').val();
      let startdate_filter = $('#ip-filter-startdate').val();
      let enddate_filter = $('#ip-filter-enddate').val();
      let itemid_filter = $('#ip-filter-itemid').val();
      let status_filter = $('#ip-filter-status').val();

      let thid = 1;
      $('#tbl_prlist thead th').each(function () {
        var title = $(this).text();
        $(this).html(title + ' <input type="text" id="tbl_prlist' + thid + '" class="col-search-input" placeholder="Search ' + title + '" />');
        thid++;
      });

      $('#tbl_prlist').DataTable().destroy();

      let table = $('#tbl_prlist').DataTable({
        "scrollX": true,
        "processing": true,
        "serverSide": true,
        "stateSave": true,
        "pageLength": 10,
        stateLoadParams: function (settings, data) {
          for (let i = 0; i < data.columns["length"]; i++) {
            let col_search_val = data.columns[i].search.search;
            if (col_search_val !== "") {
              $("input", $("#tbl_prlist thead th")[i]).val(col_search_val);
            }
          }
        },
        "ajax": {
          "url": proxy.url + "intsys/purchaseplus/purchaseplus_backend/mainapi/loadprlist",
          "type": "POST",
          "data": function (d) {
            d.datetype_filter = datetype_filter;
            d.startdate_filter = startdate_filter;
            d.enddate_filter = enddate_filter;
            d.itemid_filter = itemid_filter;
            d.status_filter = status_filter;
          }
        },
        order: [
          [0, 'desc'],
        ],
        columnDefs: [
          {
            targets: "_all",
            orderable: false
          },
          {
            targets: [0, 3, 4, 6, 9, 12],
            width: "60px",
          },
          {
            targets: [2],
            width: "50px",
          },
          {
            targets: [11, 13],
            width: "100px",
          },
          {
            targets: [5],
            width: "200px",
            // createdCell: function (td) { //td , cellData, rowData, row, col
            //     $(td).css('font-size', '10px'); // กำหนดฟอนต์สำหรับคอลัมน์ที่กำหนด
            // }
          },
          {
            targets: [7, 8, 10],
            width: "60px"
          }
        ],
      });

      // $('#tbl_noticeinfo_list tbody').on('click', 'tr', function() {
      //     let data = table.row(this).data();
      //     alert('You clicked on row: ' + data[0]);
      // });

      table.columns().every(function () {
        var table = this;
        $('input', this.header()).on('keyup change', function () {
          if (table.search() !== this.value) {
            table.search(this.value).draw();
          }
        });
      });


      // $('#tbl_prlist5').prop('readonly' , true).css({
      //     'background-color':'#F5F5F5',
      //     'cursor':'no-drop'
      // });

    },
    loadFilterOnSessionStorage() {
      const proxy = this;
      let filter_prlist = sessionStorage.getItem("filter_prlist");

      if (filter_prlist != null) {
        let datetype_filter = JSON.parse(filter_prlist).datetype_filter;
        let startdate_filter = JSON.parse(filter_prlist).startdate_filter;
        let enddate_filter = JSON.parse(filter_prlist).enddate_filter;
        let itemid_filter = JSON.parse(filter_prlist).itemid_filter;
        let status_filter = JSON.parse(filter_prlist).status_filter;

        $('input[name="ip-filter-date"]').filter(`[value="${datetype_filter}"]`).prop('checked', true);
        $('#ip-filter-startdate').val(startdate_filter);
        $('#ip-filter-enddate').val(enddate_filter);
        $('#ip-filter-itemid').val(itemid_filter);
        $('#ip-filter-status').val(status_filter);

      }
      proxy.loadPrlist();
    },
    getStatus() {
      return axios.get(this.url + 'intsys/purchaseplus/purchaseplus_backend/mainapi/getStatus').then(res => {
        console.log(res.data);
        if (res.data.status == "Select Data Success") {
          let result = res.data.result;
          let html = `
                      <option value="">ค้นหาด้วยสถานะ</option>
                  `;
          for (let key in result) {
            html += `<option value="${result[key].m_status}">${result[key].m_status}</option>`
          }
          $('#ip-filter-status').html(html);
        }
      });
    }
  },

}




</script>

<style scoped></style>