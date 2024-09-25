import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TextboxComponent } from "../shared/ui/textbox/textbox.component";
import { TextareaComponent } from "../shared/ui/textarea/textarea.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    TextboxComponent,
    TextareaComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
