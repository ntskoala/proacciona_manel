import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: '../../assets/html/modal.component.html'
})
export class ModalComponent {

  @Input() modal: boolean;
  @Input() mensaje: string;
  @Output() onCerrar = new EventEmitter();

  cerrar() {
    this.modal = false;
    this.onCerrar.emit();
  }

}
