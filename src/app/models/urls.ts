//let server = 'http://tfc.proacciona.es/'; //prod
let server = 'http://tfc.ntskoala.com/';//DESARROLLO
let base = server + 'api/';

export const URLS = {
  LOGIN: base + 'actions/login.php',
  EMPRESAS: base + 'empresas.php',
  USUARIOS: base + 'usuarios.php',
  CONTROLES: base + 'controles.php',
  CHECKLISTS: base + 'checklist.php',
  CONTROLCHECKLISTS: base + 'controlchecklist.php',
  PERMISSION_USER_CONTROL: base + 'permissionusercontrol.php',
  PERMISSION_USER_CHECKLIST: base + 'permissionuserchecklist.php',
  RESULTADOS_CONTROL: base + 'resultadoscontrol.php',
  RESULTADOS_CHECKLIST: base + 'resultadoschecklist.php',
  PERIODICIDAD_CONTROL: base + 'periodicidadcontrol.php',
  PERIODICIDAD_CHECKLIST: base + 'periodicidadchecklist.php',

  UPLOAD_LOGO: base + 'logoempresa.php',
  FOTOS: server +'controles/',
  LOGOS: server + 'logos/'

}
