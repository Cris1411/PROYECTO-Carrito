// VARIABLES
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");  //tabla de carrito
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];    // array acumulador para agregarCurso

cargarEventLsiteners()   //mandamos a llamar la funcion

/* registro todos los EventListener */
function cargarEventLsiteners(){
     /* agregas curso al presionar boton Agregar al Carrito */
     listaCursos.addEventListener("click", agregarCurso)

     /* eliminar curso del carrito */
     carrito.addEventListener("click", eliminarCurso)

     /* vaciar carrito */
     vaciarCarritoBtn.addEventListener("click", () =>{
          articulosCarrito = []; // reseteamos el arreglo de cursos
          limpiarHTML(); // eliminamos todo el HTML
     } )
};

//FUNCIONES
function agregarCurso(e){
     e.preventDefault()  // detenemos la accion por defecto

     if (e.target.classList.contains("agregar-carrito")){        // validamos click en el boton
          const cursoSeleccionado = e.target.parentElement.parentElement;   // obtenemos todos los datos del curso seleccionado
          leerDatosCurso(cursoSeleccionado)
     }
};

//eliminar un curso del carrito
function eliminarCurso(e){
     if (e.target.classList.contains("borrar-curso")){
          const cursoId = e.target.getAttribute('data-id');

          // elimina del arreglo de articulosCarrito
          articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

          carritoHTML(); // iterar sobre el carrito y mostrar su HTML
     };
}

// lee el contendido del HTML al que hicimos Click y extrae la informacion del Curso seleccionado
function leerDatosCurso(curso){
     //crear un objeto con el contenido del curso actual
     const infoCurso = {
          imagen: curso.querySelector("img").src,                     // obtenemos el src de la imagen del curso
          titulo: curso.querySelector('h4').textContent,              // contenido del h4
          precio: curso.querySelector('.precio span').textContent,    // el precio span 15
          id: curso.querySelector('a').getAttribute('data-id'),       // el id del producto
          cantidad: 1         /* para manejar la cantidad de cursos agregados */
     }

     //Revisa si un elemento ya existe en el carrito
     const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
     if(existe){
          // Actualizamos cantidad
          const cursos = articulosCarrito.map(curso => {
               if(curso.id === infoCurso.id){
                    curso.cantidad++;
                    return curso; // retorna el objeto actualizado
               } else {
                    return curso; //retorna el curso q no es duplicado
               }
          articulosCarrito = [...cursos];
          });
     } else {
          // Agregamos el curso al carrito
          articulosCarrito = [...articulosCarrito, infoCurso]
     }

     //agrega elementos al arreglo de carrito
     //articulosCarrito = [...articulosCarrito, infoCurso]
     /* console.log(articulosCarrito) */

     carritoHTML();
};

// Muestra el carrito de compras en el HTML
function carritoHTML(){       //generar HTML basado en el carrito de compras
     //Limpiar el HTML para evitar acumulacion
     limpiarHTML();

     // Recorre el carrito y general el HTML
     articulosCarrito.forEach( curso => {
          const {imagen, titulo, precio, cantidad, id } = curso;
          const row = document.createElement('tr');     /* tr en tablas HTML */
          
          row.innerHTML = `
               <td>
                    <img src="${imagen}" width="100">
               </td>
               <td>${titulo}</td>
               <td>${precio}</td>
               <td>${cantidad}</td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${id}"> X </a>
               </td>
          `;

          // Agrega el HTML del carrito en el tbody
          contenedorCarrito.appendChild(row)
     });
};

// Elimina los cursos del tbody
function limpiarHTML(){
     //Forma lenta
     //contenedorCarrito.innerHTML = '';

     // Forma mas productiva segun curso
     while(contenedorCarrito.firstChild){    
          contenedorCarrito.removeChild(contenedorCarrito.firstChild)
     };
     /* mientras existan hijos se eliminara */
};