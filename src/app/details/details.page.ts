import { Component, OnInit, inject } from '@angular/core';
import { AllapiService } from '../services/allapi.service';
import { HelperService } from '../services/helper.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  // private sanitizer = inject(DomSanitizer)
  url:SafeResourceUrl
  videoUrl: string = 'https://www.youtube.com/live/U2iMKTKUQLs?si=Y9J9eTl64qQV7EYm'; // Your YouTube live stream URL
  safeUrl: SafeResourceUrl;
  type: string = 'chat';
  detail: any;
  chatDetails: any;
  leaderDetails: any;
  message = '';
  tournamentId: any
  tournaments: any
  messageDetails: any
  array: any
  tQustion: any

  correctPredict = ''
  wallets:any
  selectedOption = false
  userSelectA = false
  newMessage = '';
  messageList: string[] = [];
  userSelectC: any = '';
  userSelectD: any = '';
  isFollow: boolean = false;
  loginUser: any
  followers = []
  streamerName = '';
  streamerTitle = '';
  streamerImage = '';
  userDetails:any= '';
  followersArr: any;
  checkA = false;
  checkB= false;
  checkC= false;
  checkD = false
  leaderFlag= false

  constructor(private apiService: AllapiService, private helper: HelperService,
     private _helper: HelperService,private sanitizer: DomSanitizer

  ) { 
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  ngOnInit() {
    //pusher
     this.apiService.bind('tournament-question-notification', (data: any) => {
      console.log('Received tournament question:', data);
      // this.tournamentQus();
    });
    
    this.tournaments = JSON.parse(localStorage.getItem("tourDetails")!);
    let id = this.tournaments._id

    //youtubevideo
    this.apiService.tournamentDetails(id).subscribe(res => {
      if (res.success == true) {
        console.log(res, 'details')
        this.detail = res.tournament;
        this.videoUrl = this.detail.streaming_link
        console.log(this.videoUrl)
      }
    }, )
    this.safeUrl = this.sanitizeUrl(this.videoUrl);
    this.loginUser = JSON.parse(localStorage.getItem("userData")!);
    this.tournamentDetails(); 
    this.getProfile(this.loginUser )
    this.tournamentQus();
    this.leaderboard();

    // this.tournamentId = JSON.parse(localStorage.getItem("tourDetails")!);
    // this.tournaments = JSON.parse(localStorage.getItem("tourDetails")!);
    // console.log(this.tournaments, '1')
    // this.messageDetails = this.tournaments.comments;
    // console.log(this.tournaments.userId, '2')
    // console.log(this.tournaments._id)

    for (let i = 0; i < this.loginUser?.followers.length; i++) {
      if (this.loginUser?.followers[i].userId === this.tournaments.userId) {
        this.isFollow = true;
        console.log(this.isFollow)
      }
    }

  }

  getProfile(user: any) {
    this.apiService.getProfileData(user._id).subscribe((res: any) => {
      this._helper.dismissLoader();
      if (res?.sucess == true) {
        this.userDetails = res.userdetails
        console.log(this.userDetails, 'userdetail')
      }
    }, (err: any) => {
      this._helper.dismissLoader();
      this._helper.presentToast('Something went wrong. Please try again later.')
    })
  }

  //tournamentDetails
  tournamentDetails() {
    this.tournaments = JSON.parse(localStorage.getItem("tourDetails")!);
    let id = this.tournaments._id
    this.apiService.tournamentDetails(id).subscribe(res => {
      if (res.success == true) {
        console.log(res, 'details')
        this.detail = res.tournament;
        this.messageDetails = this.detail.comments;
        // this.url = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/watch?v=8wACX4jO7Ic');
        // "https://www.youtube.com/watch?v=8wACX4jO7Ic"
        // this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/live/U2iMKTKUQLs?si=Y9J9eTl64qQV7EYm")
        // console.log(this.url)
     
        // const videoId = this.detail.streaming_link.split('watch?v=')[1];
        //  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        //  this.url = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        this.videoUrl = this.detail.streaming_link
      console.log(this.videoUrl)
      this.safeUrl = this.sanitizeUrl(this.videoUrl);
        console.log(this.detail.image)
        console.log(this.detail.tournament_by)
        this.streamerName = this.detail.tournament_by;
        this.streamerTitle = this.detail.title;
        this.streamerImage = this.detail.image
        this.chatDetails = this.detail.comments
        this.followersArr = res.userdetails.followers
        for (let i = 0; i < this.followersArr.length; i++) {
          if (this.followersArr[i].userId === this.loginUser._id) {
            this.isFollow = true;
            console.log(this.isFollow)
          }
          // else {
          //   this.isFollow= false
          // }
        }
        console.log(this.messageDetails)
        console.log(this.url)
      }
    }, err => {
      this._helper.dismissLoader()
      this._helper.presentToast('Something went wrong. Please try again later.')
    })

  }

tournamentQus(){
  let tournamenid = this.tournaments._id
  this.apiService.tournamentQuestion(tournamenid).subscribe(res => {
    console.log(res, 'questions')
    console.log(this.loginUser._id)
    this.tQustion = res.questions;
    if (res.status == '200') {
      this.tQustion = res.questions;
      for (let i = 0; i < this.tQustion.length; i++) {

        if (this.tQustion[i].optionA.users.length > 0) {

          console.log(this.tQustion[i].optionA.users.length)
          for (let j = 0; j < this.tQustion[i].optionA.users.length; j++) {
            // console.log(this.tQustion[i].optionA.users,this.loginUser._id,'11')
            //   console.log(this.tQustion[i].optionA.users[j],this.loginUser._id,'22')
            if (this.tQustion[i].optionA.users[j] === this.loginUser._id) {
              this.tQustion[i].optionA.userSelectA = true;
              this.checkA = true
              console.log(this.tQustion[i].optionA.userSelectA, 'flag')
            }
            // else {
            //   this.tQustion[i].optionA.userSelectA = false;
            // }
          }

        }
        if (this.tQustion[i].optionB.users.length > 0) {
          for (let j = 0; j < this.tQustion[i].optionB.users.length; j++) {

            if (this.tQustion[i].optionB.users[j] === this.loginUser._id) {
              this.tQustion[i].optionB.userSelectA = true;
              this.checkB= true
            }
          }
        }
        if (this.tQustion[i].optionC.users.length > 0) {
          for (let j = 0; j < this.tQustion[i].optionC.users.length; j++) {

            if (this.tQustion[i].optionC.users[j] === this.loginUser._id) {
              this.tQustion[i].optionC.userSelectA = true;
            }
            // else {
            //   this.tQustion[i].optionC.userSelectA = false;
            // }
          }
        }
        if (this.tQustion[i].optionD.users.length > 0) {
          for (let j = 0; j < this.tQustion[i].optionD.users.length; j++) {

            if (this.tQustion[i].optionD.users[j] === this.loginUser._id) {
              this.tQustion[i].optionD.userSelectA = true;
            }
            // else {
            //   this.tQustion[i].optionD.userSelectA = false;
            // }
          }
        }
      }

    } else {
    }
  });
}

leaderboard(){
  let tournamenid = this.tournaments._id

  this.apiService.tournamentLeader(tournamenid).subscribe(res => {
    console.log(res)
    this.leaderDetails = res.leaderboard;
    if(this.leaderDetails.length==0) {
      this.leaderFlag= true;
    }
    if (res.success == true) {
      this.leaderDetails = res.leaderboard;

    } else {
    }
  });
}

wallet (){
  
  this.apiService.wallet(this.loginUser._id).subscribe(res => {
    console.log(res)
    this.wallets = res.allWallate;
    console.log(this.wallets)
  });

}
  submitChat() {
    if (this.message == '') {
      this.helper.showError("please enter your message")
    } else {
      this.sendData();
    }
  }
  sendData() {
    let token =localStorage.getItem('token')
    console.log(this.loginUser)
    let data = {
      "content": this.message,
      "author": this.loginUser._id,
      "tournamentId": this.tournaments._id,
      "token": token,
    }

    this.apiService.sendChat(data).subscribe(res => {
      console.log(res)
      this.helper.dismissLoader();
      this.message = '';
      this.tournamentDetails()
      this.helper.showError(res.message)
    });
    this.helper.dismissLoader();
  }

  //questionAnswer
  optionAClick(qus: any, index: number) {
    if (this.tQustion[index]) {
      this.tQustion[index].optionA.selected = true
      this.selectedOption = true
    }
    let qid = qus._id

    let data = {
      "optionNumber": "optionA",
      "userId": this.loginUser._id
    }
    console.log(qid, data)
    this.apiService.sendAnswer(qid, data).subscribe(res => {
      this.tournamentQus();
      this.helper.dismissLoader();
      this.helper.showError(res.message)
      

    });
    this.helper.dismissLoader();
  }
  optionBClick(qus: any, index: number) {
    if (this.tQustion[index]) {
      this.tQustion[index].optionB.selected = true

    }
    let qid = qus._id
    let data = {
      "optionNumber": "optionB",
      "userId": this.loginUser._id
    }
    this.apiService.sendAnswer(qid, data).subscribe(res => {
      this.tournamentQus();
      this.helper.dismissLoader();
      this.helper.showError(res.message)

    });
    this.helper.dismissLoader();
  }
  optionCClick(qus: any, index: number) {
    if (this.tQustion[index]) {
      this.tQustion[index].optionC.selected = true
    }
    let qid = qus._id
    let data = {
      "optionNumber": "optionC",
      "userId": this.loginUser._id
    }
    this.apiService.sendAnswer(qid, data).subscribe(res => {
      this.tournamentQus();
      this.helper.dismissLoader();
      this.helper.showError(res.message)

    });
    this.helper.dismissLoader();
  }
  optionDClick(qus: any, index: number) {
    if (this.tQustion[index]) {
      this.tQustion[index].optionD.selected = true
    }
    let qid = qus._id
    let data = {
      "optionNumber": "optionD",
      "userId": this.loginUser._id
    }
    this.apiService.sendAnswer(qid, data).subscribe(res => {
      this.tournamentQus();
      this.helper.dismissLoader();
      this.helper.showError(res.message)

    });
    this.helper.dismissLoader();
  }
  onClick() {

    let tournamenId = this.tournaments.userId
    console.log(this.userDetails)
    let data = {
      "followerId": this.loginUser?._id
    }
    console.log(data)
    if (!this.isFollow) {
      this.apiService.followUser(tournamenId, data).subscribe(res => {
        console.log(res)
        this.isFollow = true
      });
    }
    else if (this.isFollow) {
      this.apiService.unfollowUser(tournamenId, data).subscribe(res => {
        console.log(res)
        this.isFollow = false

      });
    }
  }
  sanitizeUrl(url:any): SafeResourceUrl {
    let videoId: string;
  if (url.includes('live/')) {
    videoId = url.split('live/')[1].split('?')[0];
  } else if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1].split('&')[0];
  } else {
    // Handle other URL formats or throw an error
    throw new Error('Invalid YouTube URL format');
  }
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    // const videoId = url.split('live/')[1].split('?')[0];
    // const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    // return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}




