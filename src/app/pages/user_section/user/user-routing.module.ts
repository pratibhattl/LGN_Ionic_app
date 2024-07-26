import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { ProfileComponent } from '../profile/profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { BookingComponent } from '../booking_module/booking/booking.component';
import { BookingDetailsComponent } from '../booking_module/booking-details/booking-details.component';

import { EnquiryCreateComponent } from '../enquiry/enquiry-create/enquiry-create.component';
import { NotificationListComponent } from '../notification/notification-list/notification-list.component';

const routes : Routes = [
    { path:'user', component : UserComponent,children: [
        { path:'', redirectTo:'profile',pathMatch:'full'},
        { path:'change-password', component : ChangepasswordComponent },
        { path:'profile', component : ProfileComponent },
        { path:'profile/:userId', component : EditProfileComponent },
        { path:'booking', component : BookingComponent },
        { path:'booking/:bookingId', component : BookingDetailsComponent },
        { path:'enquiry', component : EnquiryCreateComponent },
        { path:'notification', component : NotificationListComponent }
    ]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule{}