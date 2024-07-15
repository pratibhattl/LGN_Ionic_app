import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { AllapiService } from '../services/allapi.service';
import { HelperService } from '../services/helper.service';
import { SpaceValidatior } from '../validation/space.validator';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  user:any
  userEditForm !:FormGroup
  submitted:boolean=false;
  
  constructor( private _helper : HelperService, private navCtrl : NavController, private _api : AllapiService, public formBuilder: FormBuilder ) {
    this.user = JSON.parse(localStorage.getItem("userData")!);
    this.userEditForm = this.formBuilder.group({
      userId: new FormControl(this.user._id), 
      name: new FormControl('', [Validators.required,SpaceValidatior.cannotContainSpace]), 
      mobile:  new FormControl('',[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      age:  new FormControl('',Validators.maxLength(2)),
      gender:  new FormControl(''),
      country:  new FormControl('', Validators.required), 
      city:  new FormControl('', Validators.required), 
    })
  }

  ngOnInit() {
    this._helper.presentLoading();
    this.getProfile()
  }

  get f(){
    return this.userEditForm.controls
  }

  // get data 
  getProfile(){
    this._api.getProfileData(this.user._id).subscribe(res=>{
      this._helper.dismissLoader();
      if(res?.sucess== true){
        this.userEditForm.patchValue({
          name: res.userdetails.name,
          mobile: res.userdetails.mobile,
          age:res.userdetails.age,
          gender: res.userdetails.gender,
          country: res.userdetails.country,
          city: res.userdetails.city
        })
      }
    },err=>{
      this._helper.dismissLoader();
      this._helper.presentToast('Something went wrong. Please try again later.')
    })
  }

  updateProfile() {
    this.submitted=true;
    if(this.userEditForm.valid){
      this._helper.presentLoading();
      this.userEditForm.patchValue({
        name: this.userEditForm.value.name.trim(),
        country: this.userEditForm.value.country.trim(),
        city: this.userEditForm.value.city.trim(),
        gender: this.userEditForm.value.gender.trim()
      })
      this._api.updateprofile(this.userEditForm.value).subscribe(res => {
        this._helper.dismissLoader();
        if(res.success==true){
          this._helper.showError('Profile edit successfully')
          this.navCtrl.navigateForward('/profile')
        }else{
          this._helper.showError(res.message)
          console.log(res.message)
        }
      });        
    }
  }
}
