// ==============================
// GLOBAL VARIABLES/ CONSTANTS
// ==============================
const PEOPLE_KEY = "people";
let people = JSON.parse(localStorage.getItem(PEOPLE_KEY)) || [];
let id = 0;

// ==============================
// FUNTIONS
// ==============================
// Function: Save organizer name
function saveOrganizerName() {
	const organizer = document.getElementById("organizerName");
	const organizerChecker = document.getElementById("partoftheexchange");

	localStorage.setItem("organizerName", organizer.value);
	if (organizer.value === '') {
		document.getElementById("cont").removeAttribute("href");
		Swal.fire({
			icon: 'warning',
			title: 'Organizador requerido',
			text: 'Por favor ingresa el nombre del organizador',
			confirmButtonColor: '#C9A227',
			scrollbarPadding: false,
			width: 420,
			heightAuto: false,
		});
	} else {
		document.getElementById("cont").setAttribute("href", "names.html");
	}
	if (organizerChecker.checked) {
		const newName = { id: id, name: organizer.value };
		people.push(newName);
		localStorage.setItem(PEOPLE_KEY, JSON.stringify(people));
		localStorage.setItem("orgParticipating", true);
		console.log("Organizer stored as a participant");
	}
}

// ==============================
// EVENT LISTENERS
// ==============================
// Button: "Continuar"
document.getElementById("cont").addEventListener("click", saveOrganizerName);

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
		width: 420,
		heightAuto: false,
	}).then((result) => {
		if (result.isConfirmed) {
			localStorage.clear();
			window.location.href = 'main.html';
		}
	});
})
