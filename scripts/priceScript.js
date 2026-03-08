// ==============================
// PAGE LOAD
// ==============================
window.onload = function () {
	const eventClass = events.includes(nameEvent) ? nameEvent : 'other';

	content.id = eventClass + '-';

	buttons.forEach(button => {
		button.classList.add(eventClass);
	});

};

// ==============================
// GLOBAL VARIABLES/ CONSTANTS
// ==============================
const nameEvent = localStorage.getItem('eventType');
const events = ['christmas', 'Halloween', 'NewYears', 'Hanukkah', 'StValentine'];
const content = document.getElementById('content');
const buttons = document.querySelectorAll('.custom-toggle');
const otherPrices = document.getElementById('otherPrices');
const priceInput = document.getElementById('priceCus');
const diffButton = document.getElementById('diff');
const continueBtn = document.getElementById('cont');

// ==============================
// FUNTIONS
// ==============================
// Function: Price button functionalities
function toggleOther() {
	const eventClass = events.includes(nameEvent) ? nameEvent : 'other';

	if (diffButton.classList.contains('active')) {

		otherPrices.style.display = 'block';

		priceInput.classList.remove(...events, 'other');
		priceInput.classList.add(eventClass);

	} else {
		otherPrices.style.display = 'none';
		priceInput.value = "";
	}
}

// ==============================
// EVENT LISTENERS
// ==============================
// Buttons: Prices
buttons.forEach(button => {
	button.addEventListener('click', function () {

		const isActive = this.classList.contains('active');

		buttons.forEach(btn => btn.classList.remove('active'));

		if (!isActive) {
			this.classList.add('active');
		}

		toggleOther();
	});
});

// Button: "Continuar"
continueBtn.addEventListener("click", function () {
	const active = document.querySelector('.custom-toggle.active');

	if (!active) {
		Swal.fire({
			icon: 'warning',
			text: 'Por favor seleccione una presupuesto',
			confirmButtonColor: '#C9A227',
			scrollbarPadding: false,
			width: 420,
			heightAuto: false,
		});
		return;
	}

	if (active.id === 'diff') {
		const priceValue = priceInput.value.trim();

		if (priceValue === "") {
			Swal.fire({
				icon: 'warning',
				title: 'Presupuesto faltante',
				text: 'Por favor ingrese un precio válido',
				confirmButtonColor: '#C9A227',
				scrollbarPadding: false,
				width: 420,
				heightAuto: false,
			});
			return;
		}
		localStorage.setItem('eventPrice', '$' + priceValue);

	} else {
		localStorage.setItem('eventPrice', active.innerText);
	}

	window.location.href = "finished.html";
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
		width: 420,
		heightAuto: false,
	}).then((result) => {
		if (result.isConfirmed) {
			localStorage.clear();
			window.location.href = 'main.html';
		}
	});
})