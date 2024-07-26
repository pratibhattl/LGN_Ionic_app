import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import moment from 'moment';

import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {
  bookingId:string='';
  details:any;
  moment : any=moment;
  showReview:boolean=false;

  constructor(private _api : ApiService, private _loader : NgxUiLoaderService, private _toaster : ToastrService, private _activatedRoute : ActivatedRoute){
    this.bookingId = this._activatedRoute.snapshot.paramMap.get('bookingId')!
  }

  ngOnInit(){
    this.bookingDetails()
  }

  bookingDetails(){
    this._loader.startLoader('loader')
    this._api.userBookingDetails(this.bookingId).subscribe((res:any)=>{
      console.log('result',res)
      if(res.statusCode==200){
        this._loader.stopLoader('loader')
        this.details=res?.data
      }
    },err=>{
      this._loader.stopLoader('loader')
      this._toaster.error('Something went wrong. Please try again later')
    })
  }
}
