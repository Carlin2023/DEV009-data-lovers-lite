// estas funciones son de ejemplo

export const filtrarPeliculas = (data,directorSeleccionado) => {
  return data.films.filter(pelicula => pelicula.director.toLowerCase() === directorSeleccionado);

};

//export const ordenarPeliculas = ("title",data.films) => {
//};
