<template>
  <div id="home">
        <div class="main-container">
          <div class="pd-ltr-20">
          
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-2"></div>
                      <h4 style="text-align:center;">รายการ</h4>
                      <div>
                        <div class="mt-3"></div>
                      </div>
                      <hr>
                  </div>
                </div>
              </div>

          </div>
        </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import $ from 'jquery'

// import Maindata from '@/components/Maindata.vue'
// import Filterdata from '@/components/Filter.vue'
export default {
    data() {
        return {
          url:this.$store.getters.getUrl
        }
    },
    components:{

    },
    computed:{

    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
    
}




</script>

<style scoped>
  #tbl_machineplan{
    width:100% !important;
  }
</style>