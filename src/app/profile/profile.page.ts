import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HelperService } from '../services/helper.service';
import { AllapiService } from '../services/allapi.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userDetails:any

  constructor(private navCtrl: NavController,public router: Router, private _helper : HelperService, private _api : AllapiService) {  
  } 

  ngOnInit() {
    this._helper.presentLoading();
  }

  ionViewWillEnter(){
    let user = JSON.parse(localStorage.getItem("userData")!);    
    this.getProfile(user)
    console.log(user)
  }

  getProfile(user:any){
    this._api.getProfileData(user._id).subscribe((res:any)=>{
      this._helper.dismissLoader();
      if(res?.sucess== true){
        this.userDetails = res.userdetails
        console.log(this.userDetails)
      }
    },(err:any)=>{
      this._helper.dismissLoader();
      this._helper.presentToast('Something went wrong. Please try again later.')
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userDetails.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
      this.uploadFile(file);
    }
  }
  uploadFile(file: File)  {
    console.log(file)
      this._helper.presentLoading();
      this._api.updateprofileImage(this.userDetails._id,file).subscribe(res => {
        this._helper.dismissLoader();
        console.log('File uploaded successfully', res);
        // if(res.success==true){
        //   this._helper.showError('Profile edit successfully')
        //   this.navCtrl.navigateForward('/profile')
        // }else{
        //   this._helper.showError(res.message)
        //   console.log(res.message)
        // }
      });        
    
  }

  // uploadFile(file: File) {
  //   this.profileService.uploadProfilePicture(file).subscribe(
  //     (response: any) => {
  //       console.log('File uploaded successfully', response);
  //       if (response && response.profilePictureUrl) {
  //         this.profilePictureUrl = response.profilePictureUrl;
  //       }
  //     },
  //     (error) => {
  //       console.error('Error uploading file', error);
  //     }
  //   );
  // }

  updateProfile(){
    this.navCtrl.navigateForward('/editprofile');
  }
}