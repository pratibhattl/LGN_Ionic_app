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
      this.loadInitialData();
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

  loadInitialData() {
    for (let i = 0; i <=5; i++) {
      this.items.push(this.tournaments[i]);
    }
    console.log(this.tournaments)
    // Simulate data from server
    for (let i = 6; i <= 100; i++) {
      this.data.push(this.tournaments[i]);
    }
  }

  // loadData(event) {
  //   setTimeout(() => {
  //     if (this.data.length === 0) {
  //       event.target.disabled = true;
  //       return;
  //     }

  //     const newItems = this.data.splice(0, 5);
  //     this.items.push(...newItems);
  //     event.target.complete();
  //   }, 500);
  // }


  logout(){
  	this.apiService.logout();
  }

}
