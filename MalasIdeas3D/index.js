/*CONFIGURACION INICIAL*/
/* Borrar logo de carga */
/*
window.addEventListener('load', function() {
  const loadingScreen = document.querySelector('.ClassObjetoCargar');
  for (let i = 1; i <= 8; i++) {
    setTimeout(function() {
      if (i === 9) {
        loadingScreen.style.display = 'none';
      }
    }, i * 1000);
  }
});*/
/**** Colocar CSS inicial en HEAD */
const oStylePagina = document.createElement('style');
oStylePagina.textContent = "\
  /* Import Google font - Poppins */\
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');\
  *{\
    margin: 0;\
    padding: 0;\
    font-family: 'Poppins', sans-serif;\
  }\
  body {\
    width: 100vw;\
    height: 100vh;\
    font-size: 12px;\
  }\
  .dim{\
    display: block;\
    padding: 3px;\
    pointer-events: none;\
  }\
  .hide{\
    display: none;\
  }\
  .dot{\
    display: none;\
  }\
  /*[1]*/\
  @media only screen and (max-width: 600px) {\
    /*[2]*/\
  }\
  /* This keeps child nodes hidden while the element loads */\
  :not(:defined) > * {\
  display: none;\
  }";
document.head.appendChild(oStylePagina);
/**** Colocar Variables Iniciales */
let vSombraUp = 'drop-shadow(3px 3px 2px rgba(68, 68, 68, 0.75))';
let vSombraDn = 'drop-shadow(-3px -3px 2px rgba(68, 68, 68, 0.75))';
let vBordeDestelloExterno = 'drop-shadow(0px 0px 2px rgba(255, 255, 255, 1) )';
let vBordeDestelloInterno = 'drop-shadow(inset 1px 1px 3px rgba(255, 255, 255, 1) )';
let vPadding = '2px';
let vBordeRadio = '5px';
let vBotonFondoPulsado = 'rgba(255, 255, 255, 0.45)';
let vBlurFondo = 'blur(3px)';
let vBlurBorde = '1px solid rgba(255, 255, 255, 0.18)';
/**** Desactivar click derecho del mouse */
/*
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});
*/

function fInsertarCssCode(pComodin, pCssCode){
  //previamente declarar oStylePagina en la principal
  oStylePagina.textContent = oStylePagina.textContent.replace(pComodin, pCssCode + pComodin);
}

function fImagenCarga(pPadre, pIdIdentificador, pDirImagen, pTamano, pContenedor) {
  //Crear div
  let oContenedor = document.createElement('div');
    oContenedor.setAttribute('id', pIdIdentificador + 'Div');
    oContenedor.style.display = 'flex';
    oContenedor.style.justifyContent = 'center';
    oContenedor.style.alignItems = 'center';
    oContenedor.style.margin = '0';
    oContenedor.style.position = 'absolute';
    oContenedor.style.top = '50%';
    oContenedor.style.left = '50%';
    oContenedor.style.transform = 'translate(-50%, -50%)';
      //Crear imagen
      let oImg = document.createElement('img');
        oImg.setAttribute('id', pIdIdentificador + 'Img');
        oImg.setAttribute('src', pDirImagen);
        oImg.setAttribute('class', 'ClassObjetoCargar');
        oImg.style.width = pTamano;
        oImg.style.height = pTamano;
        oImg.style.animation = 'girar 5s linear infinite';
      oContenedor.appendChild(oImg);
  document.body.appendChild(oContenedor);
  vCssCodigo =    "\
    @keyframes girar {\
      0% {\
        transform: rotate(0deg);\
      }\
      100% {\
        transform: rotate(360deg);\
      }\
    }\
    @keyframes fadein {\
      from {\
        opacity:1;\
      }\
      to {\
        opacity:0;\
      }\
    }";
  fInsertarCssCode('/*[1]*/', vCssCodigo);
  //Ocultar despues de la carga el GLTF
  pContenedor.addEventListener('load', function() {
    if (pContenedor.loaded) {
      vtiempo = '0.25';
      oContenedor.style.animation = 'fadein ' + vtiempo + 's';
      setTimeout(() => {
        oImg.style.display = 'none';
      }, Number(vtiempo)*990);
    }
  });
}