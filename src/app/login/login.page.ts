import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

import { HelperService } from '../services/helper.service';
import { AllapiService } from '../services/allapi.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm !: FormGroup;
  public showPsw = false;
  public passwordType = 'password';
  public submitted = false;

  constructor( private helper : HelperService, private apiService : AllapiService, public formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password:  new FormControl('',[Validators.required, Validators.minLength(5)]),
    })
  }

  get f(){
    return this.loginForm.controls;
  }

  showPassword(){
    this.showPsw = !this.showPsw
    if (this.showPsw==false) {
      this.passwordType = 'password';
    } else {
      this.passwordType = 'text';
    }
  }

  submitLogin(){
    this.submitted = true;
    if (this.loginForm.valid) {
      this.helper.presentLoading();
      const loginData = this.loginForm.value;
      this.apiService.logInUser(loginData).subscribe(res => {
        console.log(res);
        this.helper.dismissLoader();
        if(res.status=='1'){
          this.apiService.storeLocally(res)
          this.helper.dismissLoader();
        }else{
          this.helper.showError(res.message)
          this.helper.dismissLoader()
        }
      },error=>{
        console.log(error.error)
        console.log(error.error.message)
        this.helper.dismissLoader();
        this.helper.showError('Login failed: Incorrect email or password')
      });
    }
  }
}
