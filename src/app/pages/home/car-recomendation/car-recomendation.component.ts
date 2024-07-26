import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-car-recomendation',
  templateUrl: './car-recomendation.component.html',
  styleUrls: ['./car-recomendation.component.css']
})
export class CarRecomendationComponent {
  carSarch:any=[];
  
  constructor(private _api : ApiService){
    this._api.getResult.subscribe(data=>{
      console.log(data)
      this.carSarch=data
    })
    console.log('data',JSON.parse(localStorage.getItem('cartList')!))
    this.carSarch= JSON.parse(localStorage.getItem('cartList')!)
  }
}
