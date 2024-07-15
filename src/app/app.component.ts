import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user:any;
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Profile', url: '/profile', icon: 'people-circle' },
    { title: 'Prediction', url: '/prediction', icon: 'compass' },
    { title: 'Support', url: '/support', icon: 'chatbubbles' },
    { title: 'Notification', url: '/notifications', icon: 'notifications' },
    { title: 'Wallet', url: '/wallet', icon: 'heart' },
    { title: 'Share With Friends', url: '/Trash', icon: 'share-social' },
    { title: 'Log Out', url: '/login', icon: 'power' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router,private navCtrl: NavController
    
  ) {}
  ngOnInit() {
  	this.user = JSON.parse(localStorage.getItem("userData")!);
    console.log(this.user)
  }

  logout(){
  	localStorage.removeItem('userData');
  	this.navCtrl.navigateForward('/login');
  }
  // user-detail/:id
}
