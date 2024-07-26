import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit{
  notificationList:any[]=[];
  constructor(private _api : ApiService, private _loader : NgxUiLoaderService, private _toaster : ToastrService){}
  ngOnInit(){
   this.allNotifications()
  }

  allNotifications(){
    this._loader.startLoader('loader');
    this._api.getAllNotifications().subscribe((res:any)=>{
      if(res?.statusCode == 200) {
        this._loader.stopLoader('loader')
        this.notificationList = res.notifications
      }else{
        this._loader.stopLoader('loader')
      }
    },err=>{
      // this._toaster.error('Something went wrong. Please try again later')
      this._loader.stopLoader('loader')
    })
  }

  readNotification(notificationId:string){
    this._loader.startLoader('loader');
    this._api.updateNotification(notificationId).subscribe((res:any)=>{
      console.log(res)
      if(res?.status == 200) {
        this._loader.stopLoader('loader')
        this.allNotifications()
      }else{
        this._loader.stopLoader('loader')
      }
    },err=>{
      this._toaster.error('Something went wrong. Please try again later')
      this._loader.stopLoader('loader')
    })
  }
}
