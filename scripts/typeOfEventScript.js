// ==============================
// GLOBAL VARIABLES/ CONSTANTS
// ==============================
const container = document.getElementById('content');
const eventTypeInput = document.getElementById('eventType');
const eventNameInput = document.getElementById('eventName');
const addNameDiv = document.getElementById('addName');

// ==============================
// EVENT LISTENERS
// ==============================
// Toggle selector: Events option
document.querySelectorAll('.custom-toggle').forEach(button => {
    button.addEventListener('click', function () {
        const isActive = this.classList.contains('active');

        document.querySelectorAll('.custom-toggle').forEach(btn => btn.classList.remove('active'));

        if (!isActive) {
            this.classList.add('active');
            addNameDiv.style.display = 'block';
            container.id = this.id + '-';

            if (this.id === 'other') {
                eventTypeInput.style.display = 'block';
                eventTypeInput.parentElement.classList.add('show');
                addNameDiv.classList.add('show');
            } else {
                eventTypeInput.style.display = 'none';
                eventTypeInput.value = '';
                eventTypeInput.parentElement.classList.remove('show');
                addNameDiv.classList.remove('show');
            }
        } else {
            addNameDiv.style.display = 'none';
            eventTypeInput.style.display = 'none';
            container.id = 'content';
        }
    });
});

// Button: "Continuar"
document.getElementById("cont").addEventListener("click", function (e) {
    const active = document.querySelector('.custom-toggle.active');
    const eventName = eventNameInput.value.trim();

    if (!active) {
        Swal.fire({
            icon: 'warning',
            title: 'Selección requerida',
            text: 'Por favor elija un tipo de evento para continuar.',
            confirmButtonColor: '#C9A227',
        });
        return;
    }

    if (active.id === 'other') {
        const customType = eventTypeInput.value.trim();
        if (customType === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Información faltante',
                text: 'Por favor especifique el tipo de evento personalizado.',
                confirmButtonColor: '#C9A227',
            });
            return;
        }
        localStorage.setItem('eventType', customType);
    } else {
        localStorage.setItem('eventType', active.id);
    }

    if (eventName === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Nombre requerido',
            text: 'Por favor asigne un nombre a su evento.',
            confirmButtonColor: '#C9A227',
        });
        return;
    }

    localStorage.setItem('eventName', eventName);
    window.location.href = 'dateOfEvent.html';
});

// Image & Text: Logo & Page Name
document.getElementById('logo-ref').addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        title: '¿Regresar al inicio?',
        text: 'Se perderán todos los datos del sorteo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            window.location.href = 'main.html';
        }
    });
})