import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import * as moment from 'moment';
import moment from 'moment';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../../../../services/api.service';


@Component({
  selector: 'app-book-cab',
  templateUrl: './book-cab.component.html',
  styleUrls: ['./book-cab.component.css']
})
export class BookCabComponent implements OnInit{
  cabList:any[]=[];
  cabForm!:FormGroup;
  submitted:boolean = false;
  bookingData:any;
  todayDate:any;
  moment: any = moment;

  constructor(private _api : ApiService, private _formBuilder : FormBuilder, private _loader : NgxUiLoaderService, private _toaster : ToastrService,
    private router : Router){
    this.cabForm = this._formBuilder.group({
      car : new FormControl('', Validators.required),
      travelDate : new FormControl('', Validators.required),
      pickupLocation : new FormControl('', Validators.required),
      primaryDropLocation : new FormControl('', Validators.required),
      pickupTime : new FormControl('', Validators.required),
      luggage : new FormControl('', Validators.required),
      dropLocation : this._formBuilder.array([
        this._formBuilder.group({
          passenger:new FormControl('Passenger 1'),
          location:new FormControl('')
        })
      ])
    })
    let newDate = new Date();
    this.todayDate= moment(newDate).format('yyyy-MM-DD')
  }
  ngOnInit(){
    this._api.getCabList().subscribe((res:any)=>{
      if(res.statusCode==200){
        this.cabList=res.data
      }
    })

   
    // if(!navigator.geolocation){
    //   console.log('Location not supported')
    // }

    // navigator.geolocation.getCurrentPosition((posotion:any)=>{
    //   console.log('Location supported',posotion)
    // })
  }

  get f(){
    return this.cabForm.controls;
  }

  // get array controls
  get itemControls(): any {
    return this.cabForm.get('dropLocation') as FormArray;
  }

  // add loaction 
  addDropLocation(){
    const items = this.cabForm.get('dropLocation') as FormArray;
    if (!items.invalid) {
      items.push(
        this._formBuilder.group({
          passenger:new FormControl(`Passenger ${items?.controls.length+1}`, Validators.required),
          location:new FormControl('', Validators.required)
        })
      );
    }
  }

  // remove location from array
  removeLocation(index:number){
    const items = this.cabForm.get('dropLocation') as FormArray;
    items.removeAt(index);
  }

  // call api to get estimate 
  cabFormSubmit(){
    this.submitted=true;
    console.log('data==',this.cabForm.value)
    if(this.cabForm.valid){
      this._loader.startLoader('loader');
      let data = new FormData();
      data.append('car',this.cabForm.value.car),
      data.append('travelDate',this.cabForm.value.travelDate),
      data.append('pickupLocation',this.cabForm.value.pickupLocation),
      data.append('pickupTime',this.cabForm.value.pickupTime),
      data.append('primaryDropLocation',this.cabForm.value.primaryDropLocation),
      
      data.append('luggage',this.cabForm.value.luggage),     
      data.append('paymentStatus',"Pending");
      let extra:any =this.cabForm.value.dropLocation[0]?.location!=''? this.cabForm.value.dropLocation.length:0;
      let location:any = [];
      this.cabForm.value.dropLocation.forEach((element:any) => {
        location.push(element.location)
      });
      data.append('extraPassengers',extra)
      data.append('dropLocation',location),
      
      this._api.getEstimateForBooking(data).subscribe((res:any)=>{
        if(res?.statusCode == 201){
          this._loader.stopLoader('loader');
          this.bookingData = res.bookingDetails
        }else this._loader.stopLoader('loader');        
      },err=>{
        this._loader.stopLoader('loader');
        if(err.error.error?.status==500){
          this._toaster.error(err.error?.error.message.message)
        }else this._toaster.error('Something went wrong, Please try again later.')
      })
    }
  }

   // after estimation call submitData 
   finalSubmit(){
    this.submitted=true;
    if(this.cabForm.valid){
      this._loader.startLoader('loader');
      let data = new FormData();
      data.append('travelDate',this.bookingData?.travelDate),
      data.append('pickupTime',this.bookingData?.pickupTime)
      data.append('pickupLocation',this.bookingData?.pickupLocation)
      data.append('dropLocation',this.bookingData?.dropLocation)
      data.append('primaryDropLocation',this.bookingData?.primaryDropLocation)
      data.append('car',this.bookingData?.carDetails?._id)
      data.append('totalCost',this.bookingData?.totalCose)
      data.append('distanceCost',this.bookingData?.distanceCost)
      data.append('extra_passenger_cost',this.bookingData?.extra_passenger_cost)
      data.append('luggage',this.bookingData?.luggage)
      data.append('extraPassengers',this.bookingData?.extraPassengers)

      this._api.finalBooking(data).subscribe((res:any)=>{
        // if()
        this._loader.stopLoader('loader');
        this._toaster.success(res.message)
        this.router.navigateByUrl('/user/booking')
      },err=>{
        this._loader.stopLoader('loader');
        if(err.error.error?.status==500){
          this._toaster.error(err.error?.error.message.message)
        }
      })
    }
  }



}
