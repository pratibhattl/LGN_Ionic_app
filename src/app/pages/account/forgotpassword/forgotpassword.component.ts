import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../../services/api.service';
import { MustMatchValidator } from '../../../validators/passwordmatch.validator';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  forgetForm!:FormGroup;
  updateForm!:FormGroup;
  submitted:boolean =false;
  setForm:boolean=true;
  constructor(private formBuilder : FormBuilder, private _api : ApiService, private _loader : NgxUiLoaderService, private _toaster : ToastrService,
    private router : Router){
    this.forgetForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,3}$')]),
    })

    this.updateForm = this.formBuilder.group({
      OTP:new FormControl(''),
      password:new FormControl('',[Validators.required,Validators.minLength(3)]),
      confirmPassword:new FormControl('',Validators.required),
    },{ 
      validator: MustMatchValidator('password', 'confirmPassword')
    })
  }

  get f(){
    return this.forgetForm.controls;
  }

  forgetPasswordSubmit(){
    this.submitted=true;
    if(this.forgetForm?.valid){
      this._loader.startLoader('loader');
      this._api.forgetPassword(this.forgetForm?.value).subscribe((res:any)=>{
        console.log(res)
        if(res?.statusCode == 200){
          this._loader.stopLoader('loader');
          this._toaster.success(res?.message)
          this.setForm=false
          this.submitted=false
          this.updateForm.patchValue({ 'OTP' : res?.OTP})
          localStorage.setItem('ACCESS_TOKEN',res?.accessToken)
        }
      },err=>{
        this._loader.stopLoader('loader');
        if(err?.error.error?.status==400) this._toaster.error(err.error?.error.message.message)
      })
    }
  }

  updatePasswordSubmit(){
    this.submitted=true;
    if(this.updateForm?.valid){
      this._loader.startLoader('loader');
      this._api.updatePassword(this.updateForm?.value).subscribe((res:any)=>{
        console.log(res)
        if(res?.statusCode == 200){
          this._loader.stopLoader('loader');
          this._toaster.success(res?.message)
          localStorage.clear()
          this.router.navigateByUrl('/login')
        }
      },err=>{
        this._loader.stopLoader('loader');
        if(err?.error.error?.status==400) this._toaster.error(err.error?.error.message.message)
      })
    }
  }
}
