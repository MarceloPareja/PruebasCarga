//Modulos de K6 para realizar las pruebas de carga
import http from "k6/http";
import { check, sleep } from "k6";

//Endpoints a probar
const uris ={
    //Endpoint POST /api/auth/register con correo único.
    userRegisterURI: "http://localhost:3000/api/auth/register",
    //Endpoint POST /api/auth/login para obtener el token.
    userLoginURI: "http://localhost:3000/api/auth/login",
    //Endpoint POST /api/reservas
    makeReservationURI: "http://localhost:3000/api/reservas",
}

//Función para probar el login de usuario. Retorna un token para probar las demas funciones
function testUserRegister(etapa){
    //Se define la URL, el payload y los headers de la solicitud HTTP
    const url = uris.userRegisterURI;
    const payload = JSON.stringify({
        nombre: "Usuario1",
        apellido: "Apellido1", 
        email: "user1@mail.com",
        clave: "test1234",
    });
    const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res=http.post(url, payload, params, {
    tags : { carga: etapa }
  });

  //Re2visiones adicionales de esta prueba. 
  //Verifica el código de respuesta
    check(res, {
    'registro exitoso. Satus 201': (r) => res.status === 201
    });

}

  function testUserLogin(etapa){
    //Se define la URL, el payload y los headers de la solicitud HTTP
    const url = uris.userLoginURI;
    const payload = JSON.stringify({
        email: "user1@mail.com",
        clave: "test1234",
    });
    const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //Se ejecuta la solicitud HTTP POST y se guarda la respuesta para evaluarla
  const res=http.post(url, payload, params,
    { tags : { carga: etapa } }
  );

  //Se almacena el token para usarlo en otros endpoints
  const token = res.json('token');
  const email = res.json('email');
  const info = {email: email, token: token};
  console.log(JSON.stringify(info));


  //Revisiones adicionales de esta prueba. 
  //Verifica el código de respuesta, el contenido y el token.
  check(res, {
    'login exitoso. Satus 200': (r) => res.status === 200,
    'retorna datos correctamente': (r) => res.json() !== null,
    'token recibido': (r) => res.json('token') !== '',
  });
  return info;
}

//Funcion para probar una URI de GET. Recibe un token como parametro
function testReservar(info){
    const {email, token} = info;
    //Se defina la URL y los headers de la solicitud HTTP. El token se agrega en los headers
    const url=uris.getUserURI;
    const payload = JSON.stringify({
        email: email,
        hora: "10:00",
        fecha: "2024-12-31",
        sala: 1
    });
    const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  };
  const res = http.post(url, payload, params);

  //Revisiones adicionales de esta prueba. 
  //Verifica el código de respuesta y el contenido.
  check(res, {
    'reserva exitosa. Status 201': (r) => res.status === 201
  });
}

//Flujo de interacción de cada usuario simulado.
//Ingresa a la aplicación, espera 1 segundo, obtiene los usuarios, espera 1 segundo y finaliza
function userFlow(etapa) {
    testUserRegister();
    sleep(1);
    const info = testUserLogin();
    sleep(1);
    testReservar(info);
    sleep(1);
}

//Función principal que ejecuta el flujo de cada usuario simulado
export default function () {
    let stage;
    if(__VU <=30){
        stage = "30 usuarios";
    }
    else if(__VU <=50){
        stage = "50 usuarios";
    }
    else if(__VU <=70){
        stage = "70 usuarios";
    }
    else{
        stage = "90 usuarios";
    }
    userFlow(stage);
}
//Opciones para las pruebas
export const options ={
  stages:[
      {duration: "30s", target: 30},
      {duration: "30s", target: 50}, 
      {duration: "30s", target: 70},
      {duration: "30s", target: 90}, 

  ],
  //Umbrales de rendimiento
  /*
  thresholds:{
      http_req_failed: ["rate<0.05"],//Numero de fallos menor o igual al 5%
      http_req_duration: ["avg<=250"]//Promedio de duracion de las peticiones es maximo 250ms.
  }*/
}