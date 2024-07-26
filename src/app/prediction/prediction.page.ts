import { Component, OnInit } from '@angular/core';
import { AllapiService } from '../services/allapi.service';
import { HelperService } from '../services/helper.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.page.html',
  styleUrls: ['./prediction.page.scss'],
})
export class PredictionPage implements OnInit {
  user:any
  prediction:any
  predictFlag= false
  response:any
  items: any[] = [];
  data: any[] = [];

  constructor(private apiService : AllapiService, private _helper : HelperService,private navCtrl: NavController) { }

  ngOnInit() {
    this._helper.presentLoading();
    this.user = JSON.parse(localStorage.getItem("userData")!);
    this.apiService.predictionList(this.user._id).subscribe(res => {
      console.log(res)
      this.response= res;
      if(res.status==true){
        this._helper.dismissLoader();
        this.prediction= res.result
        this.loadInitialData()
        if(this.prediction.length== 0){
          this.predictFlag= true
        }
      }
    });
  }

  loadInitialData() {
    for (let i = 0; i <=5; i++) {
      this.items.push(this.prediction[i]);
    }
    // Simulate data from server
    for (let i = 6; i <= 100; i++) {
      this.data.push(this.prediction[i]);
    }

  }

  // loadData(event) {
  //   setTimeout(() => {
  //     if (this.data.length === 0) {
  //       event.target.disabled = true;
  //       return;
  //     }

  //     const newItems = this.items.splice(0, 5);
  //     this.items.push(...newItems);
  //     event.target.complete();
  //   }, 500);
  // }

  logout(){
  	localStorage.removeItem('userData');
  	this.navCtrl.navigateForward('/login');
  }
}
