<template>
    <div>
        <div>
            <div class="header">
                <div class="header-left">
                    <div class="menu-icon dw dw-menu"></div>
                </div>
                <div class="header-right">

                    <div class="user-notification">
                        <!-- <div class="dropdown">
                            <a class="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown">
                                <i class="icon-copy dw dw-notification"></i>
                                <div id="notify-section" style="display:none;">
                                    <span class="badge notification-active"></span>
                                    <div class="d-flex align-items-center justify-content-center countNotify">
                                        <span class="countNotifyText">0</span>
                                    </div>
                                </div>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <div class="notification-list mx-h-350 customscroll">
                                    <div id="show_notifyData"></div>
                                </div>
                            </div>

                        </div> -->
                    </div>
                    <div class="user-info-dropdown">
                        <div class="dropdown">
                            <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                <span class="user-icon">
                                    <img :src="userImage" alt="">
                                </span>
                                <span class="user-name">{{userFullname}}</span>
                            </a>
                            
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                <a class="dropdown-item" id="logoutBtn" href="#"><i class="dw dw-logout"></i>ลงชื่ออก</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="left-side-bar">
                <div class="brand-logo">
                    <router-link to='/'>
                        <!-- <img src="production_lead_time.png" alt="" class="light-logo"> -->
                        <span style="font-size:28px;color:#ef476f;"><b>Purchase Plus</b></span>
                    </router-link>
                    <div class="close-sidebar" data-toggle="left-sidebar-close">
                        <i class="ion-close-round"></i>
                    </div>
                </div>
                <div class="menu-block customscroll">
                    <div class="sidebar-menu">
                        <ul id="accordion-menu">
                            <li class="dropdown">
                                <router-link to='/' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-analytics-3 wdfI1"></span><span class="mtext">หน้าหลัก</span>
                                </router-link>
                            </li>

                            <li class="admin-section">
                                <div class="dropdown-divider"></div>
                            </li>
                            <!-- <li class="admin-section">
                                <div class="sidebar-small-cap mtext">ตั้งค่า</div>
                            </li>
                            <li class="admin-section">
                                <router-link to='/admin/setting' class="dropdown-toggle no-arrow">
                                    <span class="micon dw dw-settings1 wdfI1"></span><span class="mtext">ตั้งค่าโปรแกรม</span>
                                </router-link>
                            </li> -->
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mobile-menu-overlay"></div>
        </div>
    </div>

</template>

<script>
import $ from 'jquery';
// import Swal from 'sweetalert2'
// import axios from 'axios'
export default {
    name:'Header',
    props:[
        'userDataProps'
    ],
    data() {
        return {
            url:this.getUrl(),
            userImage:'',
            userFullname:'',
            resultUserData:[],
        }
    },
    created() {
        this.resultUserData = this.userDataProps;
    },
    mounted() {
     const proxy = this;
        this.getUserData();
        console.log(this.resultUserData);
        console.log('Public path'+process.env.NODE_ENV);

        $('#logoutBtn').click(function(){
            localStorage.removeItem('userData');
            location.href = proxy.url+'intsys/pdl/';
        });

        // $(document).on('click' , '.header-left' , function(){
        //     $('.left-side-bar').addClass('open');
        //     $('.mobile-menu-overlay').addClass('show');
        // });

        // $(document).on('click' , '.close-sidebar' , function(){
        //     $('.left-side-bar').removeClass('open');
        //     $('.mobile-menu-overlay').removeClass('show');
        // });

        // $(document).on('click' , '.menu' , function(){
        //     $('.left-side-bar').removeClass('open');
        //     $('.mobile-menu-overlay').removeClass('show');
        // });
    },
    methods: {
        getUserData(){
            if(this.userDataProps != null){
                this.userImage = 'https://intranet.saleecolour.com/intsys/usermanagement/uploads/'+this.resultUserData.file_img;
                this.userFullname = this.resultUserData.Fname+' '+this.resultUserData.Lname;
            }

        },
    },
}
</script>

<style>

</style>