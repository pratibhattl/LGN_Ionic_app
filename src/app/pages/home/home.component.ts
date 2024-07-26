import { Component } from '@angular/core';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pickUpLocation:any='';
  dropLocation:any='';
  todayDate:any='';
  date:any='';
  time:any='';

  constructor( private _toaster : ToastrService, private _api : ApiService, private _loader : NgxUiLoaderService, private router : Router){
    let newDate = new Date();
    this.todayDate= moment(newDate).format('yyyy-MM-DD')
    this.date= moment(newDate).format('yyyy-MM-DD')
  }
  getRecomendedCars(){
    if(this.pickUpLocation=='' && this.dropLocation==''){
      this._toaster.warning('Please enter pickup location and drop location')
    }else if(this.pickUpLocation=='' && this.dropLocation!=''){
      this._toaster.warning('Please enter pickup location')
    }else if(this.pickUpLocation!='' && this.dropLocation==''){
      this._toaster.warning('Please enter drop location')
    }else{
      this._loader.startLoader('loader');
      let data ={
        "travelDate": this.date,
        "pickupLocation": this.pickUpLocation,
        "pickupTime": this.time,
        "primaryDropLocation": this.dropLocation
      }
      this._api.getCarRecomendation(data).subscribe((res:any)=>{
        console.log(res)
        if(res?.statusCode== 200){
          this._loader.stopLoader('loader');
          this._api.saveResult(res.data)
          localStorage.setItem('cartList', JSON.stringify(res.data))
          this.router.navigateByUrl('/car-recomended')
        }else{
          this._loader.stopLoader('loader');
          this._toaster.error('Something went wrong. Please try again.')
        }
      },err=>{
        this._loader.stopLoader('loader');
        this._toaster.error(err.error?.error.message.message)
      })
    }
  }
}
