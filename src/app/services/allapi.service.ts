import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import Pusher from 'pusher-js';
// import { io } from "socket.io-client";
var addUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class AllapiService {
    
    public message$: BehaviorSubject<string> = new BehaviorSubject('');
    public header2:any;
    public header1:any;
    private pusher: Pusher;

    constructor(private _http: HttpClient, private navCtrl: NavController) {
        if (localStorage.getItem("token")!= null) {
            this.header2 ={ 
                'x-access-token' : localStorage.getItem("token")
            }
            this.header1={
                "Authorization": 'Bearer '+ localStorage.getItem("token")
            }
        }

        this.pusher = new Pusher('0b6fa1d63930682ca120', {
            cluster: 'ap2'
          });
          this.pusher = new Pusher ('0b6fa1d63930682ca120', {
            cluster: 'ap2'
          });

          this.pusher.connection.bind('state_change', (states: any) => {
            console.log('Pusher state change:', states);
          });
          this.pusher.connection.bind('connected', () => {
            console.log('Pusher connected');
          });
          this.pusher.connection.bind('disconnected', () => {
            console.log('Pusher disconnected');
          });

          this.pusher.connection.bind('error', (err: any) => {
            console.error('Pusher error:', err);
          });
        
    }
    
    subscribeToTournament(tourId: string, callback: (data: any) => void): void {
        const channelName = `tournament-question-${tourId}`;
        const eventName = `tournament-question-notification-${tourId}`;
    
        const channel = this.pusher.subscribe(channelName);
        channel.bind(eventName, callback);
      }

    storeLocally(res:any){
        localStorage.setItem('token', res.token);
        localStorage.setItem('userData', JSON.stringify(res['user']['others']));
        if(localStorage.getItem('token')){
            this.navCtrl.navigateForward('/home');
        }else this.navCtrl.navigateForward('/login');
        this.header2 ={ 
            'x-access-token' : localStorage.getItem("token")
        }
        this.header1={
            "Authorization": 'Bearer '+ localStorage.getItem("token")
        }
    }


    // public sendMessage(message: any) {
    //     console.log('sendMessage: ', message)
    //     // this.socket.emit('message', message);
    // }

    // public getNewMessage = () => {
    //     // this.socket.on('message', (message:any) =>{
    //     //   this.message$.next(message);
    //     // });

    //     return this.message$.asObservable();
    // };
   

    /* Login Sec Start */
    logInUser(formData: any) {
        return this._http.post<any>(addUrl + 'auth/login', formData);
    }

      /* Register Sec Start */
    registerUser(formData: any) {
        return this._http.post<any>(addUrl + 'auth/register', formData);
    }

    /* profile Sec Start */
    profile(formData: any) {
        return this._http.post<any>(addUrl + ' user_details', formData);
    }

    /* prediction Sec Start */
    predictionList(id:any){
      
        return this._http.get<any>(addUrl + 'tournament/prediction-list/'+id)

    }

    //upcomingtournament
    tournamentUpcoming() {
        return this._http.get<any>(addUrl + 'tournament/get-upcoming-tournament', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")

            }
        });
    }
    //leaderboardbyuser
    // tournamentLeaderuser(id:any){
    //     return this._http.get<any>(addUrl + 'tournament/get-leaderboard-by-userid/'+id,{ headers:{
    //         "Authorization": 'Bearer '+ localStorage.getItem("token")
    //  } });
    // }


  

    // tournamentChat(id:any){
    //     console.log(id)
    //     return this._http.post<any>(addUrl + 'tournament_wise_chat', id);
    // }

    tournamentLeader(id:any){
        return this._http.get<any>(addUrl + 'tournament/get-leaderboard-by-tournament/'+id,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token")
     } });
    }

    tournamentQuestion(id: any) {
        console.log(id)
        return this._http.get<any>(addUrl + `v1/questions/${id}` ,{
            headers: {
                'x-access-token': localStorage.getItem("token")!,

            }
        });
    }

    wallet(id:any) {
        return this._http.get<any>(addUrl + 'profile/wallate/'+id)

    }

    sendAnswer(qid:any,data: any) {
        return this._http.put<any>(addUrl + `tournament/give-answer/${qid}`, data);
    }

    sendChat(data:any){
        return this._http.post<any>(addUrl + 'tournament/add/comment', data);
    }

    //banner
    bannerList(){
        return this._http.get<any>(addUrl + 'v1/banners?page=1&limit=10',{ headers: this.header2 })
    }

    tournamentDetails(id:any){   http://localhost:8080/api/tournament/get-tournament-details/666ae12353f902ac0cc28ad3  
        console.log('header1',this.header1)  
        return this._http.get<any>(addUrl + `tournament/get-tournament-details/${id}`,{ headers: this.header1 })        
    }

    notificationList(id:any) {
        return this._http.get<any>(addUrl +  `profile/notification/${id}`
                
       );
    }

    getProfileData(userId:any){
        return this._http.get<any>(addUrl + `profile/user-profile/${userId}`,{ headers: this.header1 } )
    }

    updateprofileImage(userId: string, file: File) {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('TournamentImage', file);
        return this._http.put<any>(addUrl + 'profile/edit-profile', formData,{ headers: this.header1 });
    }

    updateprofile(formData:any) {
        return this._http.put<any>(addUrl + 'profile/edit-profile', formData,{ headers: this.header1 });
    }

    /* support Sec Start */
    supportUser(formData: any) {
        console.log(formData)
        return this._http.post<any>(addUrl + 'support-tickit/create', formData);
    }


    followUser(tid:any, data:any){
        return this._http.post<any>(addUrl + `profile/follow/${tid}`, data ,{ headers: this.header1 });
    }

    unfollowUser(tid:any, data:any){
        return this._http.post<any>(addUrl + `profile/unfollow/${tid}`,data ,{ headers: this.header1 });
    }


    // this.http.get('http://demo91.co.in/dev/dazzle/public/Api.php?action=remove_from_cart&id=' + body.id, {
    //     headers
    //   })
    //     .subscribe(res => {
    //       resolve(res);
    //     }, (err) => {

    //       reject(err);
    //     });
    // });
        // return  this._http.get<any>(addUrl + 'notification'+id ,{ headers:{
        //     "Authorization": 'Bearer '+ localStorage.getItem("token"),
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        // }});
    

     // basicDetailsUpdate
    basicDetailsUpdate(formData : any) {
        return this._http.
        post<any>(addUrl + 'retailer/profile/save', formData,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    customerAllList() {
        return this._http.get<any>(addUrl + 'retailer/customer/list',{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    supplierAllList() {
        return this._http.get<any>(addUrl + 'retailer/supplier/list',{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    deleteOneSupplier(id:any) {
        return this._http.delete<any>(addUrl + 'retailer/supplier/'+id,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    supplierDetails(id:any) {
        return this._http.get<any>(addUrl + 'retailer/supplier/'+id,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    suppliersearchList(value:any) {
        return this._http.get<any>(addUrl + 'retailer/supplier/list?search='+value,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    shippingAddressList() {
        return this._http.get<any>(addUrl + 'retailer/profile/list-shipping-address',{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    addShippingAddress(formData : any){
        return  this._http.post<any>(addUrl + 'retailer/profile/add-shipping-address',formData ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    userOrderDetails(id : any){
        return  this._http.get<any>(addUrl + 'order/'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    editShippingAddress(id:any,formData : any){
        return  this._http.put<any>(addUrl + 'retailer/profile/edit-shipping-address/'+id,formData ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    addCustomerShippingAddress(formData : any){
        return  this._http.post<any>(addUrl + 'adress/create',formData ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    editCustomerShippingAddress(id:any,formData : any){
        return  this._http.patch<any>(addUrl + 'adress/update/'+id,formData ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    customerShippingAddressList() {
        return this._http.get<any>(addUrl + 'adress/list',{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    deleteShippingAddress(id:any){
        return  this._http.delete<any>(addUrl + 'retailer/profile/delete-shipping-address/'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    // deleteCustomerShippingAddress(id:any){
    //     return  this._http.delete<any>(addUrl + 'retailer/profile/delete-shipping-address/'+id ,{ headers:{
    //         "Authorization": 'Bearer '+ localStorage.getItem("token"),
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
    //     }});
    // }

    retailerDashboardList(){
        return  this._http.get<any>(addUrl + 'retailer/home/index' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    makeList(){
        return  this._http.get<any>(addUrl + 'admin/make/list' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
      modelList(){
        return  this._http.get<any>(addUrl + 'admin/model/list' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    searchSupplier(formData : any){
        return  this._http.get<any>(addUrl + 'retailer/supplier/list?search='+formData ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    searchCustomer(formData : any){
        return  this._http.get<any>(addUrl + 'retailer/customer/list?search='+formData ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }


    RetailercategoryList(){
        return  this._http.get<any>(addUrl + 'retailer/product/categorylist' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    categoryList(){
        return  this._http.get<any>(addUrl + 'category/list' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    categoryDetails(id:any){
        return  this._http.get<any>(addUrl + 'category/detail/'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    

    subCategoryList(catId:any){
        return  this._http.get<any>(addUrl + 'retailer/product/childcategories/'+catId ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }


    productList(value:any){
        return  this._http.get<any>(addUrl + 'retailer/product/gts'+value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    myProductList(value:any){
        return  this._http.get<any>(addUrl + 'retailer/product/list'+value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    // Change Password
    changePassword(userId: any, formData:any){
        return  this._http.patch<any>(addUrl + 'user/change-password/'  + userId , formData,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    addSupplier(formData:any){
        return  this._http.post<any>(addUrl + 'retailer/supplier/create' , formData,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    updateSupplier(id:any,formData:any){
        return  this._http.put<any>(addUrl + 'retailer/supplier/'+id , formData,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    addCustomer(formData:any){
        return  this._http.post<any>(addUrl + 'retailer/customer/create' , formData,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    updateCustomer(id:any,formData:any){
        return  this._http.put<any>(addUrl + 'retailer/customer/update/'+id , formData,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    customerDetails(id:any){
        return  this._http.get<any>(addUrl + 'retailer/customer/'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    deleteOneCustomer(id:any){
        return  this._http.delete<any>(addUrl + 'retailer/customer/delete/'+id,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    addMyProduct(formData : any){
        return  this._http.post<any>(addUrl + 'retailer/product/create',formData ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    addNewProduct(formData : any){
        return  this._http.post<any>(addUrl + 'retailer/portfolio/create',formData ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    newProductList(){
        return  this._http.get<any>(addUrl + 'retailer/portfolio/list' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    deleteMyProduct(id:any){
        return  this._http.delete<any>(addUrl + 'retailer/product/'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    retailerOrderList(id:any){
        return  this._http.get<any>(addUrl + 'retailer/order/list'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    supplierOrderList(id:any){
        return  this._http.get<any>(addUrl + 'retailer/ordersupplier/list/'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    // retailerSupplierList(id:any){
    //     return  this._http.get<any>(addUrl + 'retailer/supplier/list'+id ,{ headers:{
    //         "Authorization": 'Bearer '+ localStorage.getItem("token"),
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
    //     }});
    // }

    customerOrderList(){
        return  this._http.get<any>(addUrl + 'order/list' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    gtsProductList(value:any){
        return  this._http.get<any>(addUrl + 'admin/product/list'+value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    gtsProductDetails(id:any){
        return  this._http.get<any>(addUrl + 'product/'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    gtsBrantList(){
        return  this._http.get<any>(addUrl + 'admin/brand/list' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    addToCart(formData : any){
        return  this._http.post<any>(addUrl + 'cart/create',formData ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    updateCart(id : any,formData:any){
        return  this._http.patch<any>(addUrl + 'cart/update/'+id ,formData ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    cartList(){
        return  this._http.get<any>(addUrl + 'cart/list' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    cartDelete(id:any){
        return  this._http.delete<any>(addUrl + 'cart/delete/'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

    addtoWishList(value:any){
        return  this._http.post<any>(addUrl + 'wishlist/create',value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    wishList(){
        return  this._http.get<any>(addUrl + 'wishlist/list' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    deleteWishList(id:any){
        return  this._http.delete<any>(addUrl + 'wishlist/delete/'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

//////// order place api for both user and retailer ////////////
    orderPlaced(value:any){
        return  this._http.post<any>(addUrl + 'order/create',value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }


    /// create order for customer  by retailer ///
    addCustomerorder(value:any){
        return  this._http.post<any>(addUrl + 'retailer/order/create',value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }


     /// create order for supplier  by retailer ///
     addSupplierOrder(value:any){
        return  this._http.post<any>(addUrl + 'retailer/ordersupplier/create',value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

      /// create order for retailer stock///
      retailerStock(value:any){
        return  this._http.get<any>(addUrl + 'retailer/stock/list'+value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
      /// create order for retailer stock log///
      retailerStockLog(value:any){
        return  this._http.get<any>(addUrl + 'retailer/stock/'+value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }

     /// create order for retailer income///
     retailerIncome(value:any){
        return  this._http.get<any>(addUrl + 'retailer/journal/list?type='+value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    addExpense(value:any){
        return  this._http.post<any>(addUrl + 'retailer/expense/create',value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    otherExpenseList(){
        return  this._http.get<any>(addUrl + 'retailer/expense/list' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    
    getNotification(){
        return  this._http.get<any>(addUrl + 'retailer/notification/list' ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    getOrderListByCustomerId(id:any){
        return  this._http.get<any>(addUrl + 'retailer/order/list-by-customerId/'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    getCustomerOrderDetails(id:any){
        return  this._http.get<any>(addUrl + 'retailer/order/'+id ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    retailerSalesReport(value:any){
        return  this._http.get<any>(addUrl + 'retailer/report/sales/list'+value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }
    retailerStockReport(value:any){
        return  this._http.get<any>(addUrl + 'retailer/report/stock/list'+value ,{ headers:{
            "Authorization": 'Bearer '+ localStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    
        }});
    }


    logout(){
        localStorage.removeItem('userData');
        this.navCtrl.navigateRoot('/login');
    }
}
