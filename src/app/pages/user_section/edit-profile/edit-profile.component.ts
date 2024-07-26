import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../../services/api.service';
import { SpaceValidatior } from '../../../validators/space.validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  users:any;
  profileForm !: FormGroup
  submitted:boolean=false;
  profileImage:any='';
  uploadedImage:string='';

  constructor(private formBuilder : FormBuilder, private _api : ApiService, private _loader : NgxUiLoaderService,
    private _toaster : ToastrService){
      this.profileForm = this.formBuilder.group({
        name:new FormControl('',[Validators.required,SpaceValidatior.cannotContainSpace]),
        location:new FormControl('',[Validators.required,SpaceValidatior.cannotContainSpace]),
        city:new FormControl('',[Validators.required,SpaceValidatior.cannotContainSpace]),
        pin:new FormControl('',Validators.required),
        phone:new FormControl('',Validators.required)
      })
  }

  ngOnInit(){
    this.users = JSON.parse(localStorage.getItem('Car_User')!)
    this._loader.startLoader('loader');
    this.profileDetails()
  }

  //return form control
  get f(){
    return this.profileForm.controls;
  }

  //get Profile details
  profileDetails(){
    this._api.getProfile(this.users._id).subscribe((res:any)=>{
      // console.log('result',res)
      // if(res.statusCode==200){
        this._loader.stopLoader('loader')
        this.profileForm.patchValue({
          name:res?.name,
          location:res?.address?.location,
          city:res?.address?.city,
          pin:res?.address?.pin,
          phone:res?.phone
        })
        this.uploadedImage=res?.profile_img
      // }
    },err=>{
      this._loader.stopLoader('loader')
      this._toaster.error(err.error?.error.message.message);
    })
  }

  //change profile image to open a file and select a imge  
  onFileSelected(event:any){
    this.profileImage=event.target.files[0]
  }

  //uplaod image
  uploadImage(){
    if(this.profileImage){
      this._loader.startLoader('loader');
      const imageData = new FormData();
      imageData.append('image', this.profileImage)
      this._api.profileImageUpload(imageData).subscribe((res:any)=>{
        console.log(res)
        // if(res.statusCode == 200){
          this._loader.stopLoader('loader')
          this._toaster.success(res.message);
          this.uploadedImage=res.user?.profile_img;
          this.profileImage=''
        // }
      },err=>{
        this._loader.stopLoader('loader')
        this._toaster.error(err.error.error.message.message)
      })
    }else{
      this._toaster.warning('Please upload a image');
    }
  }

  updateProfile(){
    this.submitted=true;
    if(this.profileForm.valid){
      this._loader.startLoader('loader');
      this._api.updateUserDetails(this.profileForm.value).subscribe((res:any)=>{
        console.log(res)
        if(res.statusCode == 200){
          this._toaster.success(res?.message);
          this._loader.stopLoader('loader');
          this.profileDetails()
        }
      },err=>{
        this._loader.stopLoader('loader');
        this._toaster.error(err.error.error.message.message)
      })
    }
  }
}
