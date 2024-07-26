import { Component, OnInit, inject } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { NavController } from '@ionic/angular';
import { AllapiService } from '../services/allapi.service';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { SpaceValidatior } from '../validation/space.validator';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  supportForm!:FormGroup
  submitted:boolean = false;

  formBuilder:FormBuilder = inject(FormBuilder)
  constructor( private helper : HelperService, private navCtrl : NavController, private apiService : AllapiService) { 
    this.supportForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required,SpaceValidatior.cannotContainSpace]), 
      email:  new FormControl('', [Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]), 
      subject:  new FormControl('', [Validators.required,SpaceValidatior.cannotContainSpace]), 
      message:  new FormControl('', [Validators.required,SpaceValidatior.cannotContainSpace])
    })
  }

  get f(){
    return this.supportForm.controls;
  }

  ngOnInit() {
  }

  async submitData() {
    
    this.submitted=true;
    if(this.supportForm.valid){
      this.helper.presentLoading();
      this.apiService.supportUser(this.supportForm.value).subscribe(res => {
        this.helper.dismissLoader();
        console.log("res data", res);
        if(res.success == true){
          this.helper.showError(res.message)
          this.navCtrl.navigateRoot('/home');
        }else{
          this.helper.showError(res.message)
          console.log(res.message)
        }
      });
    }
  }
  logout(){
  	localStorage.removeItem('userData');
  	this.navCtrl.navigateForward('/login');
  }
}
