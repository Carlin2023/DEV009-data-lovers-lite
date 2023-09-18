
// Aquí he traido la Data del estudio Ghibli, descubro que la puedo ver en la consola del navegador.
//import { template } from '@babel/core';
import { filtrarPeliculas } from './data.js';
import data from './data/ghibli/ghibli.js';

// Se crea el contenedor en donde estarán los nombres de los titulos de las películas. 
const contenedor = document.getElementById("peliculas-contenedor")
// Aquí se utiliza el.map creando una transformación al array original del HTML para traer los posters de las películas al navegador.
// Se crea un arrray para construir cada una de las cards, cada una tendra un poster, el nombre del director y la película. 
const filmsCards = data.films.map(pelicula => ` 
<div class="card">
<img src = "${pelicula.poster}" alt= "${pelicula.director}" style="width: 200px; height: auto;>
<div class = "card-body">
<h2>${pelicula.title}</h2>
<p><strong>Director:</strong>${pelicula.director}</p>
</div>
</div>
`
  // Con este metodo se unen todas las card en una sola cadena de texto. 
).join("")
//Asigna el contenido de la variable filmsCards al elemento html con el id contenedor, remplazando lo que habia antes.  
contenedor.innerHTML = filmsCards

// Paso 1: Recoger la selección del usuario. 
// Se crea para obtener la información de los directores, así puedo acceder a los datos.
const selectDirectores = document.getElementById("Directores");

// Esta constante esta relacionada al div creado en html llamada peliculas-contenedor, 
//sirve para acceder a los atributos y elementos de ese elemento. 
const contenedorPeliculas = document.getElementById("peliculas-contenedor");

//Aquí se guarda lo que el usuario seleccione, según su preferencia. 
let directorSeleccionado = "";

//Aquí agregamos un elemento de escucha en selecDirectores, lo que permite hacer un 
//cambio en el valor en directorSeleccionado.   
selectDirectores.addEventListener("change", function () {
  directorSeleccionado = selectDirectores.value;

});

// Función para mostrar las películas filtradas
function mostrarPeliculasFiltradas(dataFiltrada) {

  // Limpiar el contenedor antes de mostrar las nuevas películas que el usuario selecciona.
  contenedorPeliculas.innerHTML = "";

  //Se recorre cada pelicula con Array dataFiltrada.Encuentra los nombres de las peliculas. 
  dataFiltrada.forEach(pelicula => {

    //Crea un elemento div para cada cards
    //createElement sirve para crear un nuevo elemento en la constante peliculaElemento
    const peliculaElemento = document.createElement("div");
    //el método setAttibute() nos sirve para dar estilo en CSS a ese div creado.
    peliculaElemento.setAttribute("class", "card");

    //Se asigna el contenido html a peliculaElemento (imagen, y url) en el html el div con la información solicitada.
    //card-body permite darle más orden a la card respecto al contenido. 
    peliculaElemento.innerHTML = `
        <img src="${pelicula.poster}" alt="${pelicula.director}">
        <div class="card-body"> 
          <h2>${pelicula.title}</h2>
          <p>Director: ${pelicula.director}</p>
        </div>
      
    `;
    //Se agrega el div al contenedor de peliculas
    //La función appendChild permite agregar un elemento html como hijo de otro elementos html.
    //contenedor.peliculas almacena y muestra los elementos de pelicula.elemento.
    contenedorPeliculas.appendChild(peliculaElemento);
  });
}
// Paso 2: Filtrar la data con el nombre recogido y luego mostrar las películas filtradas
// Se agrega un evento de escucucha al elemento selecDirectores.
selectDirectores.addEventListener("change", function () {

  //Convierte a minúsculas para la comparación de datos en el filtrado.
  directorSeleccionado = selectDirectores.value.toLowerCase();
  const dataFiltrada = filtrarPeliculas(data, directorSeleccionado);
  //Esta función permite mostrar en el navegador las películas filtradas.
  mostrarPeliculasFiltradas(dataFiltrada);
});

// Se crea una función que dará orden a los nombres de las películas alfabeticamente de la A a la Z. 
//Mostrando en el navegador las card en su respectivo orden. 

// Se crea una función ordenarPeliculas y recibe dos parametros. 
function ordenarPeliculas(criterio, data) {
  // utiliza el método sort para ordenar los elementos contenidos en data con base en los valores de los criterios.   
  data.sort((a, b) => {
    const valorA = a[criterio];
    const valorB = b[criterio];

    if (valorA < valorB) {
      return -1;
    }
    if (valorA > valorB) {
      return 1;
    }
    return 0;
  });
  // Se llama a la función mostrarPeliculas pasando como argumento el arreglo ordenado 
  mostrarPeliculas(data);
}

//Aquí se repite el proceso mencionado arriba para lograr visualizar la organización establecida de las en el navegador. 
function mostrarPeliculas(data) {
  const contenedorPeliculas = document.getElementById('peliculas-contenedor');
  contenedorPeliculas.innerHTML = '';

  data.forEach((pelicula) => {
    const peliculaElemento = document.createElement('div');
    peliculaElemento.setAttribute("class", "card");
    peliculaElemento.innerHTML = `
    <img src="${pelicula.poster}" alt="${pelicula.director}">
        <div class="card-body">
          <h2>${pelicula.title}</h2>
          <p>Director: ${pelicula.director}</p>
        </div>
    `;
    contenedorPeliculas.appendChild(peliculaElemento);
  });
}
//Se crea una constante llamada selectOrden la cual se contecta con el id de html OrganizarAlfabeticamente, lo que permite manipularlo con JS.
const selectOrden = document.getElementById('OrganizarAlfabeticamente');
// Se agrega el evento de escucha ya no con un cambio sino con un click. 
selectOrden.addEventListener('click', () => {
  // se llama la función ordenar películas con los dos argumentos solicitando ordenar las peliculas por el titulo determinado en el arreglo.   
  ordenarPeliculas("title", data.films);

});


