import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryPasswordRoutingModule } from './recovery-password-routing.module';
import { RecoveryPasswordComponent } from './recovery-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    RecoveryPasswordComponent
  ],
  imports: [
    CommonModule,
    RecoveryPasswordRoutingModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
  ]
})
export class RecoveryPasswordModule { }
