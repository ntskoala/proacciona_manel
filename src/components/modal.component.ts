import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Modal } from '../models/modal';

@Component({
  selector: 'modal',
  templateUrl: '../../assets/html/modal.component.html'
})
export class ModalComponent {

  @Input() modal: Modal;
  @Output() onCerrar = new EventEmitter<boolean>();

  cerrar() {
    this.onCerrar.emit(false);
  }

  eliminar() {
    this.onCerrar.emit(true);
  }

}
