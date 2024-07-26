import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { ApiService } from '../../../services/api.service';
import { MustMatchValidator } from '../../../validators/passwordmatch.validator';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  changePasswordForm !: FormGroup
  submitted:boolean=false;

  constructor(private _formbuilder : FormBuilder, private _api:ApiService, private _loader: NgxUiLoaderService, private _toaster : ToastrService ){
    this.changePasswordForm = this._formbuilder.group({
      oldPassword:new FormControl('',Validators.required),
      newPassword:new FormControl('',[Validators.required,Validators.minLength(3)]),
      confirmPassword:new FormControl('',Validators.required),
    },{
      validator: MustMatchValidator('newPassword', 'confirmPassword')
    })
  }

  get f(){
    return this.changePasswordForm.controls;
  }

  // Method call to change password
  passwordChange(){
    this.submitted=true;
    if(this.changePasswordForm.valid){
      this._loader.startLoader('loader');
      this._api.changePassword(this.changePasswordForm.value).subscribe((res:any)=>{
        // if()
        this._loader.stopLoader('loader');
        this._toaster.success(res.message)
        this._api.storeLocally(res)
      },err=>{
        this._loader.stopLoader('loader');
        if(err.error.error?.status==400){
          this._toaster.error(err.error?.error.message.message)
        }else{
          this._toaster.error('Something went wrong. Please try again later.')
        }
      })
    }
  }
}