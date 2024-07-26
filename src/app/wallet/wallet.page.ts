import { Component, OnInit } from '@angular/core';
import { AllapiService } from '../services/allapi.service';
import { HelperService } from '../services/helper.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  wallets:any
  loginUser: any
  nodata= false

  constructor(private apiService: AllapiService,private _helper : HelperService,private navCtrl: NavController) { }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem("userData")!);
    this.wallet();
  }
  wallet(){
    this._helper.presentLoading();
    this.apiService.wallet(this.loginUser._id).subscribe(res => {
      console.log(res)
      this.wallets = res.allWallate;
      this._helper.dismissLoader();
      console.log(this.wallets)
      if(this.wallets.length==0){
        this.nodata= true
      }
    });
  }
  logout(){
  	localStorage.removeItem('userData');
  	this.navCtrl.navigateForward('/login');
  }
  }



