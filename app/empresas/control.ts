export class Control {
    constructor(
        public id: number,
        public nombre: string,
        public pla: string,
        public valorminimo: number,
        public valormaximo: number,
        public objetivo: number,
        public tolerancia: number,
        public critico: number,
        public periodicidad: string,
        public tipoperiodo: string,
        public idempresa: number
    ) {}
}