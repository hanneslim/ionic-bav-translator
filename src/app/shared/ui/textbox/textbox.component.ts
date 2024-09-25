import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon]
})
export class TextboxComponent {

  @Input({ required: true }) public text!: string

  public copy() {
    navigator.clipboard.writeText(
      this.text);
  }




}
