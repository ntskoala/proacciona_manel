export class Modal {
  constructor(
    public visible: boolean = false,
    public eliminar: boolean = false,
    public titulo?: string,
    public subtitulo?: string
  ){}
}
