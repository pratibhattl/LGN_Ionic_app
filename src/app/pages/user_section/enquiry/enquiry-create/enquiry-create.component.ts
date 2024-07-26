import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { SpaceValidatior } from '../../../../validators/space.validator';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enquiry-create',
  templateUrl: './enquiry-create.component.html',
  styleUrls: ['./enquiry-create.component.css']
})
export class EnquiryCreateComponent {
  enquiryForm !: FormGroup
  submitted: boolean = false;

  constructor(private formBuilder : FormBuilder, private _api : ApiService, private _loader : NgxUiLoaderService,
    private _toaster : ToastrService){
    this.enquiryForm = this.formBuilder.group({
      message:new FormControl('',[Validators.required, SpaceValidatior.cannotContainSpace])
    })
  }

  get f(){
    return this.enquiryForm.controls;
  }

  messageSubmit(){
    this.submitted=true;
    if(this.enquiryForm.valid){
      this._loader.startLoader('loader');
      this._api.enquiryMessage(this.enquiryForm.value).subscribe((res:any)=>{
        console.log(res)
        if(res.statuscode==201){
          this._loader.stopLoader('loader')
          this._toaster.success(res?.message);
        }
      },err=>{
        this._loader.stopLoader('loader')
        this._toaster.error(err.error?.error.message.message);
      })
    }
  }
}
