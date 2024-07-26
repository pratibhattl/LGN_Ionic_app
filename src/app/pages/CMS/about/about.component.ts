import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Console } from 'console';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  constructor(private _api : ApiService, private _loader : NgxUiLoaderService){}
  ngOnInit(){
    this._loader.startLoader('loader');
    this._api.getAboutContent().subscribe(res=>{
      console.log(res)
    })
  }
}
