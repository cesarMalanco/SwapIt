// ==============================
// PAGE LOAD
// ==============================
window.onload = function () {
	console.log("onload fired");
	console.log("orgParticipating:", localStorage.getItem("orgParticipating"));
	console.log("retrievedArray:", localStorage.getItem("people"));

	addName();
	checkInputs();
	checkDuplicates();
};

// ==============================
// FUNCTIONS
// ==============================
// Function: Add previous saved participant name
function addName() {
	const participation = localStorage.getItem("orgParticipating");
	const retrievedArray = localStorage.getItem("people");
	const array = JSON.parse(retrievedArray);

	if (participation === "true") {
		const newInput = document.createElement("input");
		const orgDiv = document.getElementById("organizerName");

		newInput.type = "text";
		newInput.classList.add("form-control");
		newInput.value = array[0].name;
		newInput.disabled = true;

		orgDiv.appendChild(newInput);
	}

	if (array && array.length > 1) {
		const participantsDiv = document.getElementById("participantsNames");
		const startIndex = participation === "true" ? 1 : 0;
		const participants = array.slice(startIndex);

		if (participants.length > 0) {
			participantsDiv.innerHTML = "";
			participants.forEach((person) => {
				const wrapper = document.createElement("div");
				wrapper.classList.add("participant-item", "mt-2");

				wrapper.innerHTML = `
					<input type="text"
					class="form-control participants"
					placeholder="Agrega un nuevo participante"
					value="${person.name}">

					<button type="button" class="remove-participant">
						<i class="bi bi-trash"></i>
					</button>
				`;

				participantsDiv.appendChild(wrapper);
			});
		}
	}
}

// Function: Add a new participant
function addParticipant() {
	const participants = document.getElementById("participantsNames");

	const wrapper = document.createElement("div");
	wrapper.classList.add("participant-item", "mt-2");

	wrapper.innerHTML = `
		<input type="text"
		class="form-control participants"
		placeholder="Agrega un nuevo participante"
		required>

		<button type="button" class="remove-participant">
			<i class="bi bi-trash"></i>
		</button>
	`;

	participants.appendChild(wrapper);

	const newInput = wrapper.querySelector("input");
	newInput.focus();

	checkInputs();
}

// Function: Enable/Disable add button
function checkInputs() {
	const inputs = document.querySelectorAll(".participants");
	const addBtn = document.getElementById("addParticipant");

	let hasEmpty = false;

	inputs.forEach(input => {
		if (input.value.trim() === "") {
			hasEmpty = true;
		}
	});

	addBtn.disabled = hasEmpty;
}

// Function: Detect duplicates
function checkDuplicates() {
	const participants = document.querySelectorAll(".participants");

	const values = Array.from(participants)
		.map(input => input.value.trim().toLowerCase());

	participants.forEach(input => input.classList.remove("duplicate-error"));

	let firstDuplicate = null;

	values.forEach((name, index) => {
		if (name === "") return;

		const firstIndex = values.indexOf(name);

		if (firstIndex !== index) {
			participants[index].classList.add("duplicate-error");
			participants[firstIndex].classList.add("duplicate-error");

			if (!firstDuplicate) {
				firstDuplicate = participants[firstIndex];
			}
		}
	});

	return firstDuplicate;
}

// Function: Save participants
function saveParticipants() {
	const duplicateInput = checkDuplicates();

	if (duplicateInput) {
		Swal.fire({
			icon: 'warning',
			title: 'Nombre duplicado',
			text: 'No puede haber participantes con el mismo nombre',
			confirmButtonColor: '#C9A227'
		});

		duplicateInput.focus();
		return;
	}

	const participants = document.querySelectorAll(".participants");

	const values = Array.from(participants)
		.map(input => input.value.trim())
		.filter(name => name !== "");

	const people = localStorage.getItem("people");
	const peopleArray = JSON.parse(people) || [];
	const participation = localStorage.getItem("orgParticipating");

	const base = participation === "true" && peopleArray[0] ? [peopleArray[0]] : [];

	let id = base.length + 1;

	values.forEach(name => {
		base.push({ id: id++, name: name });
	});

	if (base.length < 3) {
		Swal.fire({
			icon: 'warning',
			title: 'Participantes faltantes',
			text: 'Por favor agrega un minimo de 3 personas para tu intercambio',
			confirmButtonColor: '#C9A227'
		});

		return;
	}

	localStorage.setItem("people", JSON.stringify(base));
	window.location.href = "exclusions.html";
}

// Clear localStorage
function clearLocalStorage() {
	localStorage.clear();
}

// ==============================
// EVENT LISTENERS
// ==============================
// Button: Trash can
document.addEventListener("click", function (e) {
	if (e.target.closest(".remove-participant")) {

		const participant = e.target.closest(".participant-item");

		participant.style.opacity = "0";
		participant.style.transform = "translateX(15px)";

		setTimeout(() => {
			participant.remove();
			checkInputs();
			checkDuplicates();
		}, 200);
	}
});

// Inputs: Names
document.addEventListener("input", function (e) {
	if (e.target.classList.contains("participants")) {
		checkInputs();
		checkDuplicates();
	}
});

// Button: Go Back
document.getElementById("goBack").addEventListener("click", clearLocalStorage);

// Button: Add participant (+)
document.getElementById("addParticipant").addEventListener("click", addParticipant);

// Button: "Continuar"
document.getElementById("cont").addEventListener("click", saveParticipants);

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
});