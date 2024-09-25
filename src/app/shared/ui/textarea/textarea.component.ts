import { Component, EventEmitter, forwardRef, input, Output, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { noop } from 'rxjs';

type ValueType = string | null;

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, FormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true
  }]
})
export class TextareaComponent implements ControlValueAccessor {
  public formControl = input.required<FormControl<ValueType>>()

  public value = signal<ValueType>(null)
  public disabled = signal(false);
  private _onChange: (value: ValueType) => void = noop;
  private _onTouched: () => void = noop;

  public registerOnTouched = (fn: () => void) => (this._onTouched = fn);
  public writeValue = (value: ValueType) => this.value.set(value);
  public registerOnChange = (fn: (value: ValueType) => void) => (this._onChange = fn)
  public setDisabledState = (isDisabled: boolean) => this.disabled.set(isDisabled)


  public onModelChange(value: ValueType) {
    this.value.set(value);
    this._onChange(value)
  }


  public delete() {
    this.onModelChange(null)
  }

}
