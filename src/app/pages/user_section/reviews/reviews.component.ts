import { Component,Input } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  ratings:number=0;
  content:string='';
  reviews:any;
  @Input() 
  bookingId!:string;
  @Input()
  carId!: string;
  showReview:boolean=false;

  constructor(private _api : ApiService, private toaster : ToastrService, private _loader : NgxUiLoaderService){}


  ngOnInit(){
    this.getReview()
  }


  //get review by car id
  getReview(){
    this._api.getReviewsBookSpecific(this.carId).subscribe((res:any)=>{
      console.log('result====',res)
      if(res?.statusCode== 200){
        this.reviews=res.data;
        this.showReview=true
      }else{
        this.showReview=false;
      }
    },err=>{
      // this.showReview=false;
    })
  }

  submit(){
    if(this.ratings==0 && this.content==''){
      this.toaster.warning('You need to write a comment or give ratings')
    }else{
      let data = {
        "content": this.content,
        "rating": this.ratings,
        "bookingId": this.bookingId
      }
      this._loader.startLoader('loader');
      this._api.createReview(this.carId,data).subscribe((res:any)=>{
        console.log(res)
        if(res?.statusCode==201){
          this.toaster.success(res?.message)
          this._loader.stopLoader('loader')
        }
      },err=>{
        this.toaster.error(err?.message)
        this._loader.stopLoader('loader')
      })
    }
  }
}