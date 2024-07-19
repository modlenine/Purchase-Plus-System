<template>
  <div id="showfile">
    <div class="col-md-12 form-group">
        <label for=""><b>เอกสารแนบ</b></label>
    </div>
    <div class="col-md-12 form-group">
        <div id="file-container" class="file-container"></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name:"Showfile",
    data() {
        return {
            baseurl:this.baseUrl()
        }
    },
    props:['files' , 'url' , 'showtype' , 'formno'],
    methods: {
        showfile()
        {
            if(this.files.length > 0){
                let filehtml = ``;
                let files = this.files;
                let url = this.url+'intsys/purchaseplus/purchaseplus_backend/';
                for(const key in files){
                    let disDel = this.showtype == 'edit' ? '' : 'hidden'
                    if(files[key].f_name.split('.').pop() == "pdf" || files[key].f_name.split('.').pop() == "PDF"){
                        filehtml +=`
                        <div class="files-item">
                            <p>
                                <i class="icon-copy dw dw-file2 filepdf"></i></p>
                            <p>
                                <a href="${url+files[key].f_path+files[key].f_name}" target="_blank"><b>${files[key].f_name}</b></a>
                            </p>
                            <i ${disDel} class="fa fa-trash idel fileDel"
                                data_autoid="${files[key].f_autoid}"
                                data_path="${files[key].f_path}"
                                data_name="${files[key].f_name}"
                            ></i>
                        </div>
                        `
                    }else{
                        filehtml +=`
                        <div class="files-item">
                            <img src="${url+files[key].f_path+files[key].f_name}" alt="Image 1">
                            <i ${disDel} class="fa fa-trash idel fileDel"
                                data_autoid="${files[key].f_autoid}"
                                data_path="${files[key].f_path}"
                                data_name="${files[key].f_name}"
                            ></i>
                        </div>
                        `
                    }

                }
                $('#file-container').html(filehtml);
            }
        },
        getLoadviewfullfile()
        {
            this.$emit('loadfulldata');
        }
    },
    mounted() {
        const proxy = this;
        $(document).on('click' , '.fileDel' , function(){
            Swal.fire({
                title: 'ต้องการลบไฟล์ ใช่หรือไม่',
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
                    const data_autoid = $(this).attr("data_autoid");
                    const data_path = $(this).attr("data_path");
                    const data_name = $(this).attr("data_name");
                
                    const formdata = new FormData();
                    formdata.append('data_autoid' , data_autoid);
                    formdata.append('data_path' , data_path);
                    formdata.append('data_name' , data_name);

                    axios.post(proxy.url+'intsys/purchaseplus/purchaseplus_backend/mainapi/delFile' , formdata , {
                        headers:{
                            'Content-Type':'multipart/form-data'
                        }
                    }).then(res=>{
                        console.log(res.data);
                        if(res.data.status == "Delete Data Success"){
                            //code
                            Swal.fire({
                                title: 'ลบไฟล์สำเร็จ',
                                icon: 'success',
                                showConfirmButton: false,
                                timer:1000
                            }).then(function(){
                                // location.reload();
                                // proxy.$router.replace({ name: 'Editpr', params: { formno: formno } });
                                proxy.getLoadviewfullfile();
                            });
                        }
                    });
                }
            });
            
        });
    },
    created() {
        
    },
    watch: {
        files: {
            handler() {
                this.showfile();
            },
            immediate: true,
            deep: true
        }
    },
}
</script>

<style>

</style>