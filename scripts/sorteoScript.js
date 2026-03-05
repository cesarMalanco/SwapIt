//esta funcion es la que le agrega el color corecto al borde por medio de las clases
const nameEvent = localStorage.getItem('eventType');

window.onload = function() {
    if (nameEvent === 'christmas' || nameEvent === 'Halloween' || nameEvent === 'NewYears' || nameEvent === 'Hanukkah' || nameEvent === 'StValentine') {
        document.getElementById('content').id = nameEvent + '-';

        document.querySelectorAll('.custom-toggle').forEach(button => {
            button.classList.add(nameEvent);
        });
    } else {
        document.getElementById('content').id = 'other-';

        document.querySelectorAll('.custom-toggle').forEach(button => {
            button.classList.add('other');
        });
    }
}

//Esta funcion es la que verifica si un boton con esta 'clickeado' es la que nos ayuda a que nada mas se seleccione un boton a la vez
document.querySelectorAll('.custom-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const isActive = this.classList.contains('active');

        document.querySelectorAll('.custom-toggle').forEach(btn => btn.classList.remove('active'));

        if (!isActive) {
            this.classList.add('active');
        }
    });
});

//funcion patito por asi decirlo, nada mas necesitaba algo en local que me dejara desactivar el boton
function sorteoDONE() {
    localStorage.setItem('sorteo', true);
}

document.getElementById('goBack').addEventListener('click', sorteoDONE);