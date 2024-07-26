import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AllapiService } from '../services/allapi.service';
import { HelperService } from '../services/helper.service';
import { SpaceValidatior } from '../validation/space.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  registerForm!:FormGroup
  submitted:boolean=false;

  constructor( private helper : HelperService, private navCtrl : NavController, private apiService : AllapiService, private formBuilder : FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name : new FormControl('',[Validators.required,SpaceValidatior.cannotContainSpace]),
      email : new FormControl('',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]), 
      mobile : new FormControl('',[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      password : new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
    })
  }

  get f(){
    return this.registerForm.controls;
  }

  ngOnInit() {}

  submitRegister() {
    this.submitted=true;
    console.log('this.registerForm',this.registerForm.value)
    if(this.registerForm.valid){
      this.helper.presentLoading();
      this.apiService.registerUser(this.registerForm.value).subscribe(res => {
        console.log(res);
        this.helper.dismissLoader();
        if(res.status=='1'){
          this.helper.showError(res.message)
          this.navCtrl.navigateForward('/login');
        }else{
          this.helper.showError(res.message)
        }
      },err=>{
        this.helper.dismissLoader();
      })
    }
  }
}
