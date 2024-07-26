import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogin:any='';

  constructor(private _api : ApiService, private router : Router) {}

  ngDoCheck():void{
    if(typeof localStorage !== 'undefined'){
      this.isLogin=localStorage.getItem('ACCESS_TOKEN')
    }
  }

  //open a notification list page
  notification(){
    this.router.navigateByUrl('/user/notification')
  }

  logOut(){
    this._api.logOutUser()
  }
}
