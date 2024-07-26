import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseUrl;
  private result = new BehaviorSubject('')
  getResult=this.result.asObservable();
  constructor(private _http : HttpClient, private _router : Router) { }


  /* ^^^^^^^^^^^^^^^^^^^^^^^ Create Account Module ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  //register
  registerUser(registerData:any){
    return this._http.post(this.baseUrl+'api/users/register',registerData)
  }

  //login
  loginUser(loginData:any){
    return this._http.post(this.baseUrl+'api/users/login',loginData)
  }

  // forget password
  forgetPassword(email:any){
    return this._http.put('https://cab-service2.onrender.com/api/users/forget-password',email)
  }

  updatePassword(updateData:any){
    return this._http.patch('https://cab-service2.onrender.com/api/users/forget-update-password',updateData)
  }


  /* ^^^^^^^^^^^^^^^^^^^^^^^ Store Data ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  storeLocally(res:any){
    localStorage.setItem('ACCESS_TOKEN', res.access_token);
    // this.token = localStorage.getItem('ACCESS_TOKEN');
    // this.isAuthenticated=true;
    console.log('accou', res.user)
    localStorage.setItem('Car_User', JSON.stringify(res.user));
    this._router.navigate(['/home']);
  }

    /* ^^^^^^^^^^^^^^^^^^^^^^^ Home Module ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
    getCarRecomendation(carSerach:any){
      return this._http.post('https://cab-service2.onrender.com/api/cars/recomendation',carSerach)
    }
  
    saveResult(result:any){
      this.result.next(result)
    }

  /* ^^^^^^^^^^^^^^^^^^^^^^^ User Module ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  //change password
  changePassword(changePasswordData:any){
    return this._http.patch(this.baseUrl+'api/users/update-profile-password',changePasswordData)
  }

  //Get profile 
  getProfile(userID:any){
    return this._http.get(this.baseUrl+'api/users/'+userID)
  }

  // profile image update
  profileImageUpload(imageData:any){
    return this._http.patch(this.baseUrl+'api/users/update-profile-image',imageData)
  }

  // update user details
  updateUserDetails(profileData:any){
    return this._http.put('https://cab-service2.onrender.com/api/users/update-profile',profileData)
  }

  userBookingList(userId:string){
    return this._http.get('https://cab-service2.onrender.com/api/bookings/user-booking-list')
  }

  userBookingDetails(bookingId:string){
    return this._http.get(`https://cab-service2.onrender.com/api/bookings/${bookingId}`)
  }

  /* ^^^^^^^^^^^^^^^^^^^^^^^ Book Module ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  //get cab list
  getCabList(){
    return this._http.get('https://cab-service2.onrender.com/api/cars/list')
  }

  //get estimate
  getEstimateForBooking(bookData:any){
    return this._http.post('https://cab-service2.onrender.com/api/bookings/create',bookData)
  }

  finalBooking(bookData:any){
    return this._http.post('https://cab-service2.onrender.com/api/bookings/confirm-booking',bookData)
  }

  userBookingCancel(bookingId:string){
    return this._http.put(`https://cab-service2.onrender.com/api/bookings/cancel/${bookingId}`,'')
  }

  /* ^^^^^^^^^^^^^^^^^^^^^^^ Enquiry Module ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  enquiryMessage(messagData:string){
    return this._http.post('https://cab-service2.onrender.com/api/enquire/create',messagData)
  }

  /* ^^^^^^^^^^^^^^^^^^^^^^^ Notification Module ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  getAllNotifications(){
    return this._http.get('https://cab-service2.onrender.com/api/notification/user-notification')
  }

  updateNotification(notificationId:string){
    return this._http.put(`https://cab-service2.onrender.com/api/notification/user-update/${notificationId}`,'')
  }

  /* ^^^^^^^^^^^^^^^^^^^^^^^ Review Module ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  getReviewsBookSpecific(carId:string){
    return this._http.get(`https://cab-service2.onrender.com/api/reviews/single/${carId}`)
  }

  //create review
  createReview(carId:string, reviewData:any){
    return this._http.post(`https://cab-service2.onrender.com/api/reviews/create/${carId}`,reviewData)
  }

  /* ^^^^^^^^^^^^^^^^^^^^^^^ CMS Module ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  getAboutContent(){
    return this._http.get(`https://cab-service2.onrender.com/api/content`)
  }

  logOutUser(){
    localStorage.clear();
    this._router.navigate(['/login']);
  }


}