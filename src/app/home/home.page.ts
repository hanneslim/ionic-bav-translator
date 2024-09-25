import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { TranslationsService } from '../shared/services/translation.service';

type TranslatorFormType = FormGroup<{
  germanText: FormControl<string | null>;
  bavarianText: FormControl<string | null>;
}>;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private _fb = inject(NonNullableFormBuilder)
  private _translationService = inject(TranslationsService)

  public translatorForm: TranslatorFormType = this._fb.group({
    germanText: this._fb.control<string | null>(null),
    bavarianText: this._fb.control<string | null>(null),
  });

  public ngOnInit(): void {
    this.translatorForm.controls.germanText.valueChanges.subscribe((germanValue) => {
      if (!germanValue) {
        this.translatorForm.controls.bavarianText.reset()
      }
    })
  }


  public translate() {
    const text = this.translatorForm.controls.germanText.getRawValue();

    if (!text) {
      return
    }
    this.translatorForm.controls.bavarianText.setValue(
      this._translationService.extractAndReplaceWords(text)
    );
  }

}
