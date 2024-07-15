import { Component, OnInit } from '@angular/core';
import { AllapiService } from '../services/allapi.service';


@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.page.html',
  styleUrls: ['./prediction.page.scss'],
})
export class PredictionPage implements OnInit {
  user:any
  prediction:any
  predictFlag= false

  constructor(private apiService : AllapiService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("userData")!);
    this.apiService.predictionList(this.user._id).subscribe(res => {
      console.log(res)
      if(res.status==true){
        this.prediction= res.result
        if(this.prediction.length== 0){
          this.predictFlag= true
        }
      }
    });
  }
}
