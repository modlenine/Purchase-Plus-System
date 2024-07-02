<!-- src/components/PreviewModal.vue -->
<template>
  <div class="modal fade" id="previewModal" tabindex="-1" role="dialog" aria-labelledby="previewModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="previewModalLabel">Preview</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closePreviewModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <PrintPage :dataprintpr="dataprintpr" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closePreviewModal">Close</button>
          <button type="button" class="btn btn-primary" @click="printPDF">Print</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrintPage from '@/components/Printpr.vue';
import html2pdf from 'html2pdf.js';
import {Modal} from 'bootstrap'; // นำเข้าเฉพาะ Modal component จาก Bootstrap

export default {
  name: 'PreviewModal',
  components: {
    PrintPage
  },
  props: {
    dataprintpr: {
      type: Object,
      required: true
    }
  },
  methods: {
    printPDF() {
      const element = document.getElementById('Printpr');
      let currenttime = Date.now();
      const opt = {
        margin: 0.5,
        filename: 'document_'+currenttime+'.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().from(element).set(opt).save();
    },
    closePreviewModal()
    {
        const myModalEl = document.getElementById('previewModal');
        const modal = Modal.getInstance(myModalEl);
        modal.hide();
    }
  }
};
</script>

<style scoped>
/* Add some styles if needed */
</style>
