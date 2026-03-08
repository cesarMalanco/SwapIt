// ==============================
// PAGE LOAD
// ==============================
window.onload = function () {
    if (
        nameEvent === 'christmas' ||
        nameEvent === 'Halloween' ||
        nameEvent === 'NewYears' ||
        nameEvent === 'Hanukkah' ||
        nameEvent === 'StValentine'
    ) {
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

    const today = new Date().toISOString().split("T")[0];
    document.getElementById("startDate").setAttribute("min", today);

    setSuggestedDates();
};

// ==============================
// GLOBAL VARIABLES/ CONSTANTS
// ==============================
const nameEvent = localStorage.getItem('eventType');
let formattedDate;

// ==============================
// FUNTIONS
// ==============================
// Function: Add suggested dates by event type
function setSuggestedDates() {
    const year = new Date().getFullYear();
    let dates = [];

    switch (nameEvent) {
        case "christmas":
            dates = [new Date(year, 11, 24), new Date(year, 11, 25), new Date(year, 11, 26)];
            break;
        case "Halloween":
            dates = [new Date(year, 9, 30), new Date(year, 9, 31), new Date(year, 10, 1)];
            break;
        case "NewYears":
            dates = [new Date(year, 11, 31), new Date(year + 1, 0, 1), new Date(year + 1, 0, 2)];
            break;
        case "StValentine":
            dates = [new Date(year, 1, 13), new Date(year, 1, 14), new Date(year, 1, 15)];
            break;
        default:
            const d1 = new Date();
            const d2 = new Date();
            const d3 = new Date();
            d1.setDate(d1.getDate() + 7);
            d2.setDate(d2.getDate() + 14);
            d3.setDate(d3.getDate() + 21);
            dates = [d1, d2, d3];
    }

    document.getElementById('date1').innerHTML = dates[0].toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('date2').innerHTML = dates[1].toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('date3').innerHTML = dates[2].toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}

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
            if (this.id === "diff") {
                document.getElementById('calendar').style.display = 'block';
            } else {
                document.getElementById('calendar').style.display = 'none';
            }
        }
    });
});

// Calendar: Calendar dates
document.getElementById("startDate").addEventListener("change", function () {
    const selectedDateValue = this.value;
    const dateObject = new Date(selectedDateValue + "T00:00:00");

    formattedDate = dateObject.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (formattedDate !== "Invalid Date") {
        localStorage.setItem('eventDate', formattedDate);
    }
});

// Button: "Continuar"
document.getElementById("cont").addEventListener("click", function (e) {
    const active = document.querySelector('.custom-toggle.active');

    if (!active) {
        e.preventDefault();
        Swal.fire({
            icon: 'warning',
            title: 'Fecha faltante',
            text: 'Por favor seleccione una fecha para continuar',
            confirmButtonColor: '#C9A227'
        });
        return;
    }

    if (active.id === 'diff') {
        const calendarInput = document.getElementById("startDate").value;

        if (!calendarInput || !formattedDate || formattedDate === "Invalid Date") {
            e.preventDefault();
            Swal.fire({
                icon: 'warning',
                title: 'Fecha faltante',
                text: 'Por favor seleccione una fecha del calendario para continuar',
                confirmButtonColor: '#C9A227'
            });
            return;
        }
        localStorage.setItem('eventDate', formattedDate);
    } else {
        localStorage.setItem('eventDate', active.innerText);
    }

    window.location.href = 'price.html';
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