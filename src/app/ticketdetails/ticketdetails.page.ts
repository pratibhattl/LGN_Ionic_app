import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.page.html',
  styleUrls: ['./ticketdetails.page.scss'],
})
export class TicketdetailsPage implements OnInit {

  constructor(public modalController: ModalController) {}

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
