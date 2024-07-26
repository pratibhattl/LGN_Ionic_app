import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { TicketdetailsPage } from '../ticketdetails/ticketdetails.page';
import { AllapiService } from '../services/allapi.service';
import { HelperService } from '../services/helper.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  allbanners:any[]=[];
  type: string = 'my';
  users:any
  tournaments:any
  data: any[] = [];
  items: any[] = [];
  itemsPerPage = 1; // Number of items to display per page
  currentPage = 1;
  
  constructor(public modalController: ModalController,private apiService : AllapiService,
    private navCtrl : NavController, private _helper : HelperService) {}

  ngOnInit(){
    this._helper.presentLoading();
    this.bannerApi();
    this.upcomingApi();
  }

  //get banner api
  bannerApi(){
    this.apiService.bannerList().subscribe(res => {
      this._helper.dismissLoader()
      if(res.status==200){ 
        this.allbanners=res.data.filter((el:any)=>el.isDelete==false && el.status=='active')
      }
    },err=>{
      this._helper.dismissLoader()
      this._helper.presentToast('Something went wrong. Please try again later.')
    })
  }

  //get upcomingtour Api
  upcomingApi(){
    this.apiService.tournamentUpcoming().subscribe(res => {
      console.log(res)
      this.tournaments= res.tournaments ;
      // this.loadInitialData();
      this.loadInitialItems()
      console.log(this.tournaments);
      if(res.status==true){ 
        this.tournaments  = res.tournaments;
       
      }
    },err=>{
      this._helper.dismissLoader()
      this._helper.presentToast('Something went wrong. Please try again later.')
    })
  }

  tournamentbyId(tour:any) {   
    this.navCtrl.navigateForward('/details');
    localStorage.setItem('tourDetails', JSON.stringify(tour));
  }

 
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  async presentModal() {
    const modal = await this.modalController.create({
      component: TicketdetailsPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }
  loadInitialItems() {
    this.items = this.items.slice(0, this.itemsPerPage * this.currentPage);
  }

  loadMore(event:any) {
    console.log(event)
    setTimeout(() => {
      this.currentPage++;
      const newItems = this.items.slice(0, this.itemsPerPage * this.currentPage);
      this.items = newItems;

      event.target.complete();

      // Disable infinite scroll if all data is loaded
      if (this.items.length >= this.items.length) {
        event.target.disabled = true;
      }
    }, 500); // Simulate a delay for loading more items
  }



  // loadInitialData() {
  //   for (let i = 0; i <1; i++) {
  //     this.items.push(this.tournaments[i]);
  //   }
  //   console.log(this.tournaments)
  //   // Simulate data from server
  //   for (let i = 1; i <= 100; i++) {
  //     this.data.push(this.tournaments[i]);
  //   }
  // }

  // loadData(event:any) {
  //   setTimeout(() => {
  //     if (this.data.length === 0) {
  //       event.target.disabled = true;
  //       return;
  //     }

  //     const newItems = this.data.splice(0, 1);
  //     this.items.push(...newItems);
  //     event.target.complete();
  //   }, 500);
  // }


  logout(){
  	this.apiService.logout();
  }

}
