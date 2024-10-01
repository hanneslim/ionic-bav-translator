import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { TranslationsService } from '../shared/services/translation.service';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { DOCUMENT } from '@angular/common';

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

  constructor() {
    SpeechRecognition.requestPermissions()
  }

  private _fb = inject(NonNullableFormBuilder)
  private _document = inject(DOCUMENT)
  private _translationService = inject(TranslationsService)

  public isRecording = signal(false);

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

  public async startRecognition() {
    const { available } = await SpeechRecognition.available()
    if (available) {
      this.isRecording.set(true)
      SpeechRecognition.start({
        language: "de-DE",
        prompt: "Sog wosd song wuist...",
        partialResults: true,
        popup: false
      })

      SpeechRecognition.addListener('partialResults', (data) => {
        if (data.matches.length > 0) {
          this.translatorForm.controls.germanText.setValue(data.matches[0])
        }
      })
      SpeechRecognition.addListener('listeningState', (state) => {
        if (state.status === "stopped") {
          this.stopRecognition()
        }
      })
    }
  }

  public async stopRecognition() {
    this.isRecording.set(false)
    setTimeout(() => this._document.getElementById('translator-button')?.click(), 2000)
    await SpeechRecognition.stop()

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
