export class Usuario {
    constructor(
        public idusuario: number,
        public usuario: string,
        public password: string,
        public tipouser: string,
        public nombre: string,
        public idempresa: number
    ) {}
}
