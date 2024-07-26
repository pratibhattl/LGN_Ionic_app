import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  users:any;
  userDetails:any;

  constructor(private _api : ApiService, private _loader : NgxUiLoaderService, private _toaster : ToastrService){}

  ngOnInit(){
    if(typeof localStorage != 'undefined'){
      this.users = JSON.parse(localStorage.getItem('Car_User')!)
      this.profileDetails()
    }
    
  }

  profileDetails(){
    this._loader.startLoader('loader')
    this._api.getProfile(this.users._id).subscribe((res:any)=>{
      // console.log('result',res)
      // if(res.statusCode==200){
        this._loader.stopLoader('loader')
        this.userDetails=res
      // }
    },err=>{
      this._loader.stopLoader('loader')
      this._toaster.error(err.error?.error.message.message);
    })
  }
}
