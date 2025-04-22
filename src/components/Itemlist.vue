<template>
  <div id="itemlist">
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>รหัสสินค้า</th>
            <th>ชื่อสินค้า</th>
            <th>รายละเอียด</th>
            <th>จำนวน</th>
            <th>ราคาต่อหน่วย</th>
            <th>ส่วนลด</th>
            <th>ราคารวม</th>
            <th>หน่วย</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="itemdata.length === 0">
            <td colspan="10" class="text-center">ไม่พบข้อมูลสินค้าที่ขอซื้อ</td>
          </tr>
          <tr v-for="(item, index) in itemdata" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.itemid }}</td>
            <td>{{ item.itemname }}</td>
            <td>{{ item.itemdetail }}</td>
            <!-- ✅ ช่อง จำนวน -->
            <td>
              <span v-if="editIndexQty !== index">
                {{ formatNumber(item.itemqty) }}
                <i
                  class="fa fa-pencil ml-2 text-primary"
                  @click="editIndexQty = index"
                  style="cursor: pointer"
                ></i>
              </span>
              <input
                v-else
                type="number"
                class="form-control form-control-sm"
                :value="item.itemqty"
                @input="updateQty(index, $event.target.value)"
                @keydown.enter="$event.target.blur()"
                @blur="editIndexQty = null"
              />
            </td>

            <!-- ✅ ช่อง ราคาต่อหน่วย -->
            <td>
              <span v-if="editIndexPrice !== index">
                {{ formatNumber(item.itemprice) }}
                <i
                  class="fa fa-pencil ml-2 text-primary"
                  @click="editIndexPrice = index"
                  style="cursor: pointer"
                ></i>
              </span>
              <input
                v-else
                type="number"
                class="form-control form-control-sm"
                :value="item.itemprice"
                @input="updatePrice(index, $event.target.value)"
                @keydown.enter="$event.target.blur()"
                @blur="editIndexPrice = null"
              />
            </td>
            <td>{{ formatNumber(item.itemdiscount) }}</td>
            <td>
              {{
                formatNumber(item.itemqty * item.itemprice - item.itemdiscount)
              }}
            </td>
            <td>{{ item.itemunit }}</td>
            <td class="text-right">
              <i
                class="fa fa-trash idel"
                @click="deleteItem(index)"
                style="cursor: pointer"
              ></i>
            </td>
          </tr>
          <tr v-if="itemdata.length > 0">
            <td colspan="6"><b>ยอดรวมทั้งสิ้น</b></td>
            <td colspan="4" class="text-right">
              {{ formatNumber(totalSum) }} {{ currency }}
              <span v-if="currency !== 'THB' && currencyrate">
                <br />เป็นเงินไทย {{ formatNumber(convertedSum) }} บาท
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "Itemlist",
  props: {
    itemdata: {
      type: Array,
      required: true,
    },
    currency: String,
    currencyrate: [Number, String],
  },
  data() {
    return {
      localItemdata: JSON.parse(JSON.stringify(this.itemdata)), // Clone เพื่อ reactive
      editIndexQty: null,
      editIndexPrice: null,
    };
  },
  watch: {
    itemdata: {
      handler(val) {
        this.localItemdata = JSON.parse(JSON.stringify(val));
      },
      immediate: true,
      deep: true,
    },
    editIndex(newVal) {
      if (newVal !== null) {
        this.$nextTick(() => {
          this.$refs.editInput?.focus();
        });
      }
    },
  },
  methods: {
    formatNumber(num) {
      return parseFloat(num).toLocaleString("en-US", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
    },
    updateQty(index, newQty) {
      const updated = [...this.itemdata];
      updated[index].itemqty = parseFloat(newQty);
      updated[index].itempricesum =
        updated[index].itemqty * updated[index].itemprice -
        updated[index].itemdiscount;
      this.$emit("update:itemdata", updated);
    },

    updatePrice(index, newPrice) {
      const updated = [...this.itemdata];
      updated[index].itemprice = parseFloat(newPrice);
      updated[index].itempricesum =
        updated[index].itemqty * updated[index].itemprice -
        updated[index].itemdiscount;
      this.$emit("update:itemdata", updated);
    },
    deleteItem(index) {
      const updated = [...this.localItemdata];
      updated.splice(index, 1);
      this.$emit("update:itemdata", updated);
    },
  },
  computed: {
    totalSum() {
      return this.itemdata.reduce(
        (sum, item) =>
          sum +
          parseFloat(item.itemqty) * parseFloat(item.itemprice) -
          parseFloat(item.itemdiscount),
        0
      );
    },
    convertedSum() {
      const rate = parseFloat(this.currencyrate.toString().replace(/,/g, ""));
      return (this.totalSum * rate) / 100;
    },
  },
};
</script>
  
  <style scoped>
input.form-control-sm {
  padding: 0.25rem;
  font-size: 0.875rem;
}
</style>
  