// Programación sincrónica
/*
function two (){
    console.log("dos");
}

function one (){
    console.log("uno");
    two();
    console.log("tres");
}

one();
console.log("*********");
/*Programación asíncrona. 
setTimeout que recibe una función anónima y establece un tiempo (en milisegundos 1000ms = 1s) de ejecución para cumplir con la condición de asincronismo
*/
/*
const twoAsync = () => {
    setTimeout( () => {
        console.log("dos Async");
    }, 5000);

}

const oneAsync = () => {
    setTimeout(function() {
        console.log("uno Async");
    }, 2000);
    twoAsync();
    console.log("tres Async");
}

oneAsync();
*/
/*
 *Trabajando con promesas mediante Fetch API
 */
const url = "https://jsonplaceholder.typicode.com/users";
// Usando fetch para mostrar en consola
//Usando fetch
fetch(url)
  //Si se cumple la promesa vamos a traer los datos de la API y se convertirán en tipo json para poder mostrarlos en consola
  .then((data) => data.json())
  .then((data) => {
    console.log(data); //Mostrando en consola todos los usuarios de la API
    console.log(data[0].name); //Mostrando en consola el usuario con el indice 0 y trayendo solamente su nombre
  })
  .catch((error) => console.error("¡Ups!, algo salió mal", error)); //Mensajede error

// Usando fetch para mostrar en navegador
const botonInfo = document.querySelector("#btn-mensaje");
const info = document.querySelector("#mensaje");
//Variable para guardar info que se va a traer desde la API: Debe ser de tipo null
let post = null;

//Consumiendo API con fetch (promesas)
botonInfo.addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/users/6")
    .then((response) => response.json())
    .then((response) => {
      post = response; //Guardo los datos de response en la variable de tipo null, para que modificar el dato
      //Mandamos llamar la variable desde la función (aún no está)
      mostrarDatos(post);
    })
    .catch((error) => console.error("¡Problemas!", error));
});

// Función que me permita manipular la variable de tipo null
//Quiero traer name, username, email, phone del user de la API
const mostrarDatos = (post) => {
  //Creando nodos (elementos) mediante DOM Manipulation
  const name = document.createElement("h2");
  const userName = document.createElement("h3");
  const email = document.createElement("p");
  const phone = document.createElement("p");

  //Ponerlos en el HTML (innerHTML)
  name.innerHTML = post.name;
  userName.innerHTML = post.username;
  email.innerHTML = post.email;
  phone.innerHTML = post.phone;

  //Hacer que aparezcan en el navegador
  info.appendChild(name);
  info.appendChild(userName);
  info.appendChild(email);
  info.appendChild(phone);
};

// > - Usando fetch para mostrar en navegador
const botonProductos = document.querySelector("#btn-store");
const tienda = document.querySelector("#store");
let productos = null;

botonProductos.addEventListener("click", () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((response) => {
      productos = response;
      //Función por definir
      mostrarProductos(productos);
    })
    .catch((error) => console.error("¡Cuidao!", erro));
});

//Funcion para crear, agregar y mostrar elementos desde el DOM
const mostrarProductos = (productos) => {
  //mando a llamar las llaves title, price, description, category, imagen desde la API
  productos.map((productos) => {
    //El método map toma el array (objeto en JS) y crea nuevos arreglos que se pueden manipular de manera individual. Así, evitamos el uso de un ciclo forEach
    const imagen = document.createElement("img");
    const titulo = document.createElement("h2");
    const precio = document.createElement("h3");
    const descripcion = document.createElement("p");
    const categoria = document.createElement("p");
    const separador = document.createElement("hr");

    //Enviar a HTML con innerHTML
    imagen.src = productos.image;
    imagen.width = 200;
    titulo.innerHTML = productos.title;
    precio.innerHTML = productos.price;
    descripcion.innerHTML = productos.description;
    categoria.innerHTML = productos.category;

    //MOastrarlos en navegador al agrgarlos a su padre
    tienda.appendChild(imagen);
    tienda.appendChild(titulo);
    tienda.appendChild(precio);
    tienda.appendChild(descripcion);
    tienda.appendChild(categoria);
    tienda.appendChild(separador);
  });
};
//Método POST utilizando fetch. Me permite crer recurso en la API
fetch("https://jsonplaceholder.typicode.com/posts", {
  //Indicar que es un método de tipo POST
  method: "POST",
  //Creo el body de mi nuevo objeto, siguiendo las mismas llaves de la API existente (userId, title, body)
  body: JSON.stringify({
    userId: 1986,
    title: "Sueñan los androides con ovejas eléctricas?",
    body: "Author: Phillipe K. Dick",
  }),
  //Definir headers
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
}) //Fin de mi fetch
    //Inicio de mis promesas
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
  })


/* >>>>>>>>>>>> Programación asíncrona <<<<<<<<<<<< */
//Funcion flecha de tipo async-await
//INdico que es una función asincrona con la palabra reservada async antes de los parámetros
const getUser = async () =>{
    //Para que se cumpla la promesa no utilizamos then, sino que usamos try. Para errores, se sigue utilizando catch.
    try{
        //Retardo para que se ejecute de manera asíncrona. Tengo que crear una nueva promesa, que recibe un setTimeout
        await new Promise(resolve => setTimeout(resolve, 3000));
        //Mi promesa que se ejecuta
        const response = await fetch("https://jsonplaceholder.typicode.com/users/4");
        const data = await response.json();
        console.log(data);
    } catch(error){
        console.error("Error inexplicable", error);
    }
}

//Invocar función, por favor, que no se nos olvide
getUser();

/* >>>>>>>>>>>>>>>localStorage<<<<<<<<<<<<<<<<<*/
//Nos permite crear, modificar, eliminar, guardar objetos de JavaScript de manera local (en el equipo)
//Crear un objeto de JS con sus llaves y valores
const user = [
    {id: 1,
    nombre: "Gonzalo",
    apellido: "Gonzalez",
    email: "Gonzalez@gonzalo.com",
    posicion: "bailarin",
    empresa: "Gonzalez & Asociados",
},{    id: 2,
    nombre: "Diana",
    apellido: "ALvarez",
    email: "DianaLAl@gonzalo.com",
    posicion: "bailarina",
    empresa: "Academia de Baile",
    }
];

//Convertir el objeto creado a notación JSON y almacenarlo en el localStorage
localStorage.setItem("usuario", JSON.stringify(user));

//Traer el objeto desde el localStorage
const users = JSON.parse(localStorage.getItem("usuario"));
console.log(users);

//sessionStorage