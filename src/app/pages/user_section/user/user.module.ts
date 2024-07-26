import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from '../user/user.component';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { ProfileComponent } from '../profile/profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

//booking_section
import { BookCabComponent } from '../booking_module/book-cab/book-cab.component';
import { BookingComponent } from '../booking_module/booking/booking.component';
import { BookingDetailsComponent } from '../booking_module/booking-details/booking-details.component';
import { ReviewsComponent } from '../reviews/reviews.component';

import { EnquiryCreateComponent } from '../enquiry/enquiry-create/enquiry-create.component';


@NgModule({
  declarations: [
    UserComponent,
    ChangepasswordComponent,
    ProfileComponent,
    BookCabComponent,
    BookingComponent,
    EditProfileComponent,
    BookingDetailsComponent,
    EnquiryCreateComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NgxStarRatingModule
  ]
})
export class UserModule { }
