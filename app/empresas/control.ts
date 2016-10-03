export class Control {
    constructor(
        public id: number,
        public nombre: string,
        public pla: string,
        public minimo: number,
        public maximo: number,
        public objetivo: number,
        public tolerancia: number,
        public critico: number,
        public periodicidad: string,
        public periodo: string,
        public idempresa: number
    ) {}
}