import { Component, OnInit, inject } from '@angular/core';
import { AllapiService } from '../services/allapi.service';
import { HelperService } from '../services/helper.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Message {
  content: string;
  author: string;
  tournamentId: string;
  timestamp: Date;
  userImage: URL;
  userName: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  // private sanitizer = inject(DomSanitizer)
  private tourId: string = ''; // Replace with actual tourId
  url: SafeResourceUrl;
  videoUrl: string =
    'https://www.youtube.com/live/U2iMKTKUQLs?si=Y9J9eTl64qQV7EYm'; // Your YouTube live stream URL
  safeUrl: SafeResourceUrl;
  type: string = 'chat';
  detail: any;
  chatDetails: any;
  leaderDetails: any;
  message = '';
  tournamentId: any;
  tournaments: any;
  messageDetails: any;
  array: any;
  tQustion: any;

  correctPredict = '';
  wallets: any;
  selectedOption = false;
  userSelectA = false;
  newMessage = '';
  messageList: Message[] = [];
  userSelectC: any = '';
  userSelectD: any = '';
  isFollow: boolean = false;
  loginUser: any;
  followers = [];
  streamerName = '';
  streamerTitle = '';
  streamerDes = '';
  streamerImage = '';
  userDetails: any = '';
  followersArr: any;
  checkA = false;
  checkB = false;
  checkC = false;
  checkD = false;
  leaderFlag = false;
  items: any[] = [];
  data: any[] = [];
  disableFlag = false;

  constructor(
    private apiService: AllapiService,
    private helper: HelperService,
    private _helper: HelperService,
    private sanitizer: DomSanitizer,
    private firestore: AngularFirestore
  ) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userData')!);
    this.fetchMessages();
    this.tournaments = JSON.parse(localStorage.getItem('tourDetails')!);
    let id = this.tournaments._id;

    //pusher
    this.tourId = id;
    this.apiService.subscribeToTournament(this.tourId, (data: any) => {
      console.log('Event received:', data);
      this.tournamentQus();
    });

    //youtubevideo
    this.apiService.tournamentDetails(id).subscribe((res) => {
      if (res.success == true) {
        console.log(res, 'details');
        this.detail = res.tournament;
        this.videoUrl = this.detail.streaming_link;
        console.log(this.videoUrl);
      }
    });
    this.safeUrl = this.sanitizeUrl(this.videoUrl);
    this.loginUser = JSON.parse(localStorage.getItem('userData')!);
    this.tournamentDetails();
    this.getProfile(this.loginUser);
    this.tournamentQus();
    this.leaderboard();

    for (let i = 0; i < this.loginUser?.followers.length; i++) {
      if (this.loginUser?.followers[i].userId === this.tournaments.userId) {
        this.isFollow = true;
        console.log(this.isFollow);
      }
    }
  }

  getProfile(user: any) {
    this.apiService.getProfileData(user._id).subscribe(
      (res: any) => {
        this._helper.dismissLoader();
        if (res?.sucess == true) {
          this.userDetails = res.userdetails;
          console.log(this.userDetails, 'userdetail');
        }
      },
      (err: any) => {
        this._helper.dismissLoader();
        this._helper.presentToast(
          'Something went wrong. Please try again later.'
        );
      }
    );
  }

  //tournamentDetails
  tournamentDetails() {
    this.tournaments = JSON.parse(localStorage.getItem('tourDetails')!);
    let id = this.tournaments._id;
    this.apiService.tournamentDetails(id).subscribe(
      (res) => {
        if (res.success == true) {
          console.log(res, 'details');
          this.detail = res.tournament;
          this.messageDetails = this.detail.comments;
          this.videoUrl = this.detail.streaming_link;
          console.log(this.videoUrl);
          this.safeUrl = this.sanitizeUrl(this.videoUrl);
          console.log(this.detail.image);
          console.log(this.detail.tournament_by);
          this.streamerName = this.detail.tournament_by;
          this.streamerTitle = this.detail.title;
          this.streamerDes = this.detail.description;
          this.streamerImage = this.detail.image;
          this.chatDetails = this.detail.comments;
          this.followersArr = res.userdetails.followers;
          for (let i = 0; i < this.followersArr.length; i++) {
            if (this.followersArr[i].userId === this.loginUser._id) {
              this.isFollow = true;
              console.log(this.isFollow);
            }
            // else {
            //   this.isFollow= false
            // }
          }
          console.log(this.messageDetails);
          console.log(this.url);
        }
      },
      (err) => {
        this._helper.dismissLoader();
        this._helper.presentToast(
          'Something went wrong. Please try again later.'
        );
      }
    );
  }
  tournamentQus() {
    let tournamenid = this.tournaments._id;
    this.apiService.tournamentQuestion(tournamenid).subscribe((res) => {
      console.log(res, 'questions');
      console.log(this.loginUser._id);
      this.tQustion = res.questions;
      if (res.status == '200') {
        this.tQustion = res.questions;
        for (let i = 0; i < this.tQustion.length; i++) {
          for (let j = 0; j < this.tQustion[i].options.length; j++) {
            if (this.tQustion[i].options[j].users.length > 0) {
              for (
                let k = 0;
                k < this.tQustion[i].options[j].users.length;
                k++
              ) {
                // console.log(this.tQustion[i].options[j].users[j],this.loginUser._id);
                console.log(
                  this.tQustion[i].options[j].users[k],
                  this.loginUser._id
                );

                if (
                  this.tQustion[i].options[j].users[k] == this.loginUser._id
                ) {
                  this.tQustion[i].options[j].userSelectA = true;
                  this.tQustion[i].disableFlag = true;
                  console.log(this.tQustion[i].options[j].userSelectA);
                  console.log(this.tQustion[i].disableFlag);
                }
              }
            }
          }
        }
      }
    });
  }

  leaderboard() {
    let tournamenid = this.tournaments._id;

    this.apiService.tournamentLeader(tournamenid).subscribe((res) => {
      console.log(res);
      this.leaderDetails = res.leaderboard;
      if (this.leaderDetails.length == 0) {
        this.leaderFlag = true;
      }
      if (res.success == true) {
        this.leaderDetails = res.leaderboard;
      } else {
      }
    });
  }

  // wallet() {
  //   this.apiService.wallet(this.loginUser._id).subscribe((res) => {
  //     console.log(res);
  //     this.wallets = res.allWallate;
  //     console.log(this.wallets);
  //   });
  // }
  fetchMessages() {
    this.firestore
      .collection<Message>('messages', (ref) => ref.orderBy('timestamp'))
      .valueChanges()
      .subscribe((data) => {
        this.messageList = data;
      });
  }
  submitChat() {
    if (this.message == '') {
      this.helper.showError('please enter your message');
    } else {
      this.sendData();
    }
  }
  sendData() {
    const messageData = {
      content: this.message,
      author: this.loginUser._id,
      userName: this.loginUser.name,
      tournamentId: this.tournaments._id,
      userImage: this.loginUser.profileImage,
      timestamp: new Date(),
    };
    console.log('UserDATA', this.loginUser);

    this.firestore
      .collection('messages')
      .add(messageData)
      .then(() => {
        this.message = '';
        this.helper.showError('Message sent successfully');
      })
      .catch((err) => {
        this.helper.showError('Error sending message: ' + err);
      });
  }

  //questionAnswer
  optionClick(qus: any, option: any, i: number) {
    console.log(qus, option, i);
    console.log(qus);
    if (this.tQustion[i]) {
      this.tQustion[i].disableFlag = true;
    }

    let qid = qus._id;
    let data = {
      optionNumber: option._id,
      userId: this.loginUser._id,
    };
    console.log(qid, data);
    this.apiService.sendAnswer(qid, data).subscribe((res) => {
      console.log(res);
      this.tournamentQus();
      this.helper.dismissLoader();
      this.helper.showError('Answer selected sucessfully');
    });
    this.helper.dismissLoader();
  }

  onClick() {
    let tournamenId = this.tournaments.userId;
    console.log(this.userDetails);
    let data = {
      followerId: this.loginUser?._id,
    };
    console.log(data);
    if (!this.isFollow) {
      this.apiService.followUser(tournamenId, data).subscribe((res) => {
        console.log(res);
        this.isFollow = true;
      });
    } else if (this.isFollow) {
      this.apiService.unfollowUser(tournamenId, data).subscribe((res) => {
        console.log(res);
        this.isFollow = false;
      });
    }
  }
  sanitizeUrl(url: any): SafeResourceUrl {
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
