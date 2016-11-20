import { Component, Input, Output, EventEmitter } from '@angular/core';

import { EmpresasService } from '../services/empresas.service';
import { TranslateService } from 'ng2-translate';
import { Modal } from '../models/modal';

@Component({
  selector: 'modal',
  templateUrl: '../assets/html/modal.component.html'
})
export class ModalComponent {

  constructor(private empresasService: EmpresasService, private translate: TranslateService) {
    translate.use(this.empresasService.idioma);
  }

  @Input() modal: Modal;
  @Output() onCerrar = new EventEmitter<boolean>();

  cerrar() {
    this.onCerrar.emit(false);
  }

  eliminar() {
    this.onCerrar.emit(true);
  }

}
