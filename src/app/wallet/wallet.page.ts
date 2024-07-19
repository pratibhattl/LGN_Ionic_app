import { Component, OnInit } from '@angular/core';
import { AllapiService } from '../services/allapi.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  wallets:any
  loginUser: any
  nodata= false

  constructor(private apiService: AllapiService) { }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem("userData")!);
    this.wallet();
  }
  wallet(){
    this.apiService.wallet(this.loginUser._id).subscribe(res => {
      console.log(res)
      this.wallets = res.allWallate;
      console.log(this.wallets)
      if(this.wallets.length==0){
        this.nodata= true
      }
    });
  }
  logout(){
  	this.apiService.logout();
  }
  }



