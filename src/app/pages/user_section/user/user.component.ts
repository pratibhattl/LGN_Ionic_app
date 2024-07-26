import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements DoCheck{
  istable:boolean=false;
  currentUrl:string='';
  constructor(private router : Router, _api: ApiService){}

  ngDoCheck():void{
    this.currentUrl = this.router.url;
    if(this.currentUrl!=='/booking') this.istable = true;
    else this.istable =false;
  }

  // logOut
  logOut(){
    // this.
  }
}
