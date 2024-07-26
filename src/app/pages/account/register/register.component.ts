import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../../../services/api.service';
import { SpaceValidatior } from '../../../validators/space.validator';
import { MustMatchValidator } from '../../../validators/passwordmatch.validator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm !: FormGroup
  submitted:boolean=false;

  constructor(private _formbuilder : FormBuilder, private _api:ApiService, private _loader: NgxUiLoaderService, 
    private _toaster : ToastrService, private _router : Router){

    this.registerForm = this._formbuilder.group({
      name:new FormControl('',[Validators.required,SpaceValidatior.cannotContainSpace]),
      email:new FormControl('',[Validators.required,Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')]),
      password:new FormControl('',[Validators.required,Validators.minLength(3)]),
      confirmPassword:new FormControl('',Validators.required),
      location:new FormControl('',[Validators.required,SpaceValidatior.cannotContainSpace]),
      city:new FormControl('',[Validators.required,SpaceValidatior.cannotContainSpace]),
      pin:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required)

      //^((((\+44\s?([0–6]|[8–9])\d{3} | \(?0([0–6]|[8–9])\d{3}\)?)\s?\d{3}\s?(\d{2}|\d{3}))|((\+44\s?([0–6]|[8–9])\d{3}|\(?0([0–6]|[8–9])\d{3}\)?)\s?\d{3}\s?(\d{4}|\d{3}))|((\+44\s?([0–6]|[8–9])\d{1}|\(?0([0–6]|[8–9])\d{1}\)?)\s?\d{4}\s?(\d{4}|\d{3}))|((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4})))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$
    }, {
      validator: MustMatchValidator('password', 'confirmPassword')
    })
  }

  get f(){
    return this.registerForm.controls;
  }

  // Method call to register user
  registerUser(){
    this.submitted=true;
    if(this.registerForm.valid){
      this._loader.startLoader('loader');
      this._api.registerUser(this.registerForm.value).subscribe((res:any)=>{
        this._loader.stopLoader('loader');
        this._toaster.success(res?.message)
        this._router.navigateByUrl('/login')
      },err=>{
        this._loader.stopLoader('loader');
        if(err.error.error?.status==400){
          this._toaster.error(err.error?.error.message.message)
        }
      })
    }
  }
}
