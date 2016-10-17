export class ResultadoChecklist {
    constructor (
        public id: number,
        public idchecklist: number,
        public resultado: number,
        public fecha: Date,
        public foto: string
    ) {}
}
