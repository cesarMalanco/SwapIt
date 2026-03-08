// ==============================
// PAGE LOAD
// ==============================
window.onload = function () {
    const contentElement = document.getElementById('content');
    const sorteoBtn = document.getElementById('sorteo');

    if (['christmas', 'Halloween', 'NewYears', 'Hanukkah', 'StValentine'].includes(nameEvent)) {
        contentElement.id = nameEvent + '-';
        sorteoBtn.classList.add(nameEvent);
    } else {
        contentElement.id = 'other-';
        sorteoBtn.classList.add('other');
    }

    if (localStorage.getItem('sorteo') === 'true') {
        sorteoBtn.classList.remove(nameEvent || 'other');
        sorteoBtn.classList.add('disabled');
        const displayBtn = document.getElementById('display');
        if (displayBtn) {
            displayBtn.classList.remove('disabled');
            displayBtn.classList.add(nameEvent === 'other' ? 'other' : nameEvent);
        }
    }
};

// ==============================
// GLOBAL VARIABLES/ CONSTANTS
// ==============================
const nameEvent = localStorage.getItem('eventType');

// ==============================
// EVENT LISTENERS
// ==============================
// Button:"Sortear"
document.getElementById("sorteo").addEventListener("click", function (e) {
    e.preventDefault();

    if (this.classList.contains('disabled')) return;

    Swal.fire({
        title: '¿Generar sorteo ahora?',
        text: "Una vez realizado, no podrás volver atrás para modificar los datos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#C9A227',
        confirmButtonText: '¡Sí, sortear!',
        cancelButtonText: 'Cancelar',
        scrollbarPadding: false,
    }).then((result) => {
        if (result.isConfirmed) {
            const boton = this;
            const progressContainer = document.getElementById("progressContainer");
            const progressBar = document.getElementById("progressBar");
            const progressText = document.getElementById("progressText");

            boton.classList.add("d-none");
            progressContainer.classList.remove("d-none");
            progressText.classList.remove("d-none");

            let width = 0;
            const interval = setInterval(() => {
                width += 1;
                progressBar.style.width = width + "%";
                progressBar.setAttribute("aria-valuenow", width);

                if (width >= 100) {
                    clearInterval(interval);
                    localStorage.setItem('sorteo', 'true');
                    setTimeout(() => {
                        window.location.href = "sorteo.html";
                    }, 500);
                }
            }, 30);
        }
    });
});

// Toggle selector: Options
document.querySelectorAll('.custom-toggle').forEach(button => {
    button.addEventListener('click', function () {
        const isActive = this.classList.contains('active');
        document.querySelectorAll('.custom-toggle').forEach(btn => btn.classList.remove('active'));
        if (!isActive) {
            this.classList.add('active');
        }
    });
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
        scrollbarPadding: false,
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            window.location.href = 'main.html';
        }
    });
})