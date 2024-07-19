import { Component, OnInit } from '@angular/core';
import { AllapiService } from '../services/allapi.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  // user:any
  // notification:any

  // constructor(private apiService : AllapiService) { }

  // ngOnInit() {
  //   this.user = JSON.parse(localStorage.getItem("userData")!);
  //   console.log(this.user)
  //   let id=this.user._id  
  //   this.apiService.notificationList(id).subscribe(res => {

  //     console.log("res data", res);
  //     this.user = res;
  //     console.log(this.user.status)

  //     if(this.user.message=='siccess'){  
  //       this.notification = this.user.notifications;
  //       console.log(this.notification)
  //     }else{

  //       console.log(this.user.message)
  //     }
  //   });
  // }
  // }


  user: any
  notification: any
  type = []
  notifiOne = false
  notifiTwo = false
  notifiThree = false
  notifiFour = false
  notifiFive = false
  notifiSix = false
  notifiSeven = false
  notifiEight = false
  notifiNine = false
  notifiTen = false
  notifiEle = false
  notifiTwel = false
nodata= false
  constructor(private apiService: AllapiService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("userData")!);

    this.apiService.notificationList(this.user?._id).subscribe(res => {

      console.log("res data", res);
      // this.user = res;
      // console.log(this.user.status)
      this.notification = res.allNotificationByUserId;
      if(this.notification.length==0){
        this.nodata= true
      }
      console.log(this.notification)
      console.log(this.notification.length)
      for (let i = 0; i < this.notification.length; i++) {


        if (this.notification[i].type == '9') {
          this.notification[i].notifiNine = true
        }
        if (this.notification[i].type == '8') {
          this.notification[i].notifiEight = true
        }
        if (this.notification[i].type == '7') {
          this.notification[i].notifiSeven = true
        }
        if (this.notification[i].type == '6') {
          this.notification[i].notifiSix = true
        }
        if (this.notification[i].type == '5') {
          this.notification[i].notifiFive = true
        }
        if (this.notification[i].type == '4') {
          this.notification[i].notifiFour = true
        }
        if (this.notification[i].type == '3') {
          this.notification[i].notifiThree = true
        }
        if (this.notification[i].type == '2') {
          this.notification[i].notifiTwo = true
        }
        if (this.notification[i].type == '1') {
          this.notification[i].notifiOne = true
        } if (this.notification[i].type == '10') {
          this.notification[i].notifiTen = true
          // this.notifiTwel= false
        }

        if (this.notification[i].type == '11') {
          this.notification[i].notifiEle = true
          // this.notifiTwel= false
        }
        if (this.notification[i].type == '12') {
          this.notification[i].notifiTwel = true
          // this.notifiEle= false
        }


      }


      const notificationType = {
        1: "user's profile is inactive",
        2: "user's profile is inactive",
        3: "user's profile is inactive",
        4: "user's profile is inactive",
        5: "user's profile is inactive",
        6: "user's profile is inactive",
        7: "user's profile is inactive",
        8: "delete tournament",
        9: "new streaming request has been submitted by a user. Please review and process the request promptly."
      };
      // console.log(notificationType.1)
      if (this.notification) {

      }
      // if(this.user.status=='1'){  
      //   this.notification = this.user.notifications;
      //   console.log(this.notification)
      // }else{

      //   console.log(this.user.message)
      // }
    });
  }
  logout(){
  	this.apiService.logout();
  }
}


