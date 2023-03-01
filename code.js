let nombreJugador = prompt('Escribe tu nombre') 
alert(`Bienvenido ${nombreJugador} a la base de datos de los estudiantes de la escuela, pero antes, ¿no quieres jugar al juego del vehiculo invisible?`)

function mostrarInstrucciones() {
     alert(`Hola ${nombreJugador} a continuación te mostrare las instrucciones acerca de como jugar
     - start = arranca el vehiculo
     - stop = detiene el vehiculo
     - help = muestra las instrucciones
     - exit = salir del juego
 `)}

 mostrarInstrucciones()

 let command = ''; 
 let started = false;

 while (true) {
     command = prompt('Introduce una orden').toLocaleLowerCase();
     if (command === 'start') {
        if (started === true) {
            alert('El vehiculo ya está encendido y andando. No puedes volver a encenderlo')
        } else
         alert('El vehiculo ha encendido y arrancado')
         started = true;
     }else if (command === 'stop') {
        if (started === false) {
            alert('El vehiculo ya está detenido. No puedes volver a detenerlo')
        } else
         alert('El vehiculo se ha detenido')
         started = false;
     }else if (command === 'help') {
         mostrarInstrucciones()
     } else if (command === 'exit') {
         alert('Gracias por jugar, vuelve pronto')
         break
     } else if (command !== 'start' || command !== 'stop' || command !== 'help') {
         alert('No entendí, te volveré a mostrar la lista de comandos')
         mostrarInstrucciones()
     } 
 }  

alert(`Ahora continua con la base de datos, para interactuar con el sistema por favor abre la consola`)

let estudiantes = [
    {name: 'David', apellido: 'Perez', edad: 14, grado: 4},
    {name: 'Lisa', apellido: 'Simpson', edad: 10, grado: 1},
    {name: 'Roberto', apellido: 'Espinoza', edad: 11, grado: 2},
    {name: 'Cindy', apellido: 'Nero', edad: 12, grado: 3}
]

console.log('Bienvenido al sistema de la escuela');

// Funcion para contar el numero de estudiantes 
let contador = 0;

estudiantes.forEach( estudiante => {
    contador++;
});
console.log(`Hay ${contador} estudiantes inscritos en el instituto hasta el momento`);

// Funcion para mostrar a los estudiantes inscritos

for (let estudiante of estudiantes) {
    console.log(`Nombre: ${estudiante.name}, Apellido: ${estudiante.apellido}, Edad: ${estudiante.edad}, Grado: ${estudiante.grado}   `)
}


///////////////////////////////////////
/* Agregar estudiante
Con esta función se agrega a un nuevo estudiante

Instrucciones

name = Incluir el nombre del nuevo estudiante
apellido = Incluir el apellido del nuevo estudiante
age = Incluir la edad del nuevo estudiante
Grado = Incluir el grado del nuevo estudiante

*/

estudiantes.push({
        name: 'Orlando',
        apellido: 'Perez',
        age: 12,
        grado: 3
    })

console.log(estudiantes);

//////////////////////////////////////////////////////////


