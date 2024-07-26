import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm !: FormGroup
  submitted:boolean=false;

  constructor(private _formbuilder : FormBuilder, private _api:ApiService, private _loader: NgxUiLoaderService, private _toaster : ToastrService ){
    this.loginForm = this._formbuilder.group({
      email:new FormControl('',[Validators.required,Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')]),
      password:new FormControl('',Validators.required)
    })
  }

  get f(){
    return this.loginForm.controls;
  }

  // Method call to register user
  callLogin(){
    this.submitted=true;
    console.log('value')
    if(this.loginForm.valid){
      this._loader.startLoader('loader');
      this._api.loginUser(this.loginForm.value).subscribe((res:any)=>{
        // if()
        this._loader.stopLoader('loader');
        this._toaster.success(res.message)
        this._api.storeLocally(res)
        console.log(res)
      },err=>{
        this._loader.stopLoader('loader');
        if(err.error.error?.status==500){
          this._toaster.error(err.error?.error.message.message)
        }
      })
    }
  }
}
