import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import moment from 'moment';

import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  users:any;
  bookingList:any[]=[];
  completeBookingList:any[]=[];
  cancelList:any[]=[];
  cancelDialog=false;
  bookingId:string='';
  moment:any=moment;

  constructor(private _api : ApiService, private _loader : NgxUiLoaderService, private _toaster : ToastrService){}

  ngOnInit(){
    if(typeof localStorage != 'undefined'){
      this.users = JSON.parse(localStorage.getItem('Car_User')!)
      this.getBookingLists()
    }
  }

  getBookingLists(){
    this._loader.startLoader('loader')
    this._api.userBookingList(this.users._id).subscribe((res:any)=>{
      // if(res.statusCode==200){
        this._loader.stopLoader('loader')
        this.bookingList=res.filter((el:any)=> { return el?.status=='active' || el?.status=='request'})
        this.completeBookingList=res.filter((el:any)=>el?.status=='completed' && el?.isAccept==true)
        this.cancelList=res.filter((el:any)=>el?.status=='inactive' || el?.status=='cancel')
        console.log('this.bookingList', this.bookingList)
      // }
    },err=>{
      this._toaster.error('Something went wrong. Please try again after some time.')
      this._loader.stopLoader('loader')
    })
  }

  //open a dialog to sure cancel booking
  cancelBook(bookingid:string){
    this.cancelDialog=true;
    this.bookingId=bookingid
  }

  //cancelBook
  confirm(){
    this._loader.startLoader('loader')
    this._api.userBookingCancel(this.bookingId).subscribe((res:any)=>{
      console.log('cncel',res)
      if(res.statusCode==200){
        this._loader.stopLoader('loader')
        this.cancel()
        this._toaster.success(res.message)
        this.getBookingLists()
      }
    },err=>{
      this._loader.stopLoader('loader')
      this.cancel()
      this._toaster.error(err.error.error.message.message)
    })
  }

  //close a dialog modal
  cancel(){
    this.cancelDialog=false;
  }
}
