const noButton = document.getElementById('noExclusions');
const yesButton = document.getElementById('yesExclusions');

document.querySelectorAll('.custom-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        document.querySelectorAll('.custom-toggle').forEach(btn => btn.classList.remove('active'));
        if (!isActive) this.classList.add('active');
    });
});

noButton.addEventListener('click', function() {
    localStorage.setItem('exclusions', "No exclusions");
    document.getElementById("cont").setAttribute('href', 'typeOfEvent.html');
    document.getElementById("exclusionsDiv").style.display = "none";
});

function createExclusions() {
    const retrievedArray = localStorage.getItem("people");
    const array = JSON.parse(retrievedArray);

    document.getElementById("exclusionsDiv").style.display = "block";

    const participantsDiv = document.getElementById("exclusionsDiv");
    participantsDiv.innerHTML = "";

    array.forEach((person, i) => {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("participants");
        if (i > 0) input.classList.add("mt-3");
        input.placeholder = "Agrega un nuevo participante";
        input.value = person.name;
        input.disabled = true;
        participantsDiv.appendChild(input);

        const button = document.createElement("button");
        button.classList.add("btn", "select", person.name, "mt-3");
        button.textContent = "Selecciona las exclusiones de " + person.name;
        button.id = person.name;
        button.onclick = () => createAndShowModal("Exclusiones para: " + person.name, person.name, array);
        participantsDiv.appendChild(button);
    });
}

function createAndShowModal(titleText, currentPersonName, peopleArray) {
    const otherPeople = peopleArray.filter(p => p.name !== currentPersonName);

    let stored = {};
    try {
        const rawStored = localStorage.getItem('exclusions');
        if (rawStored) stored = JSON.parse(rawStored);
    } catch {
        stored = {};
    }
    const savedExclusions = stored[currentPersonName] || [];

    const checkboxList = otherPeople.map(p => `
        <div class="form-check">
            <input 
                class="form-check-input" 
                type="checkbox" 
                value="${p.name}" 
                id="exclude_${p.name}"
                ${savedExclusions.includes(p.name) ? 'checked' : ''}
            >
            <label class="form-check-label" for="exclude_${p.name}">
                ${p.name}
            </label>
        </div>
    `).join('');

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${titleText}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${checkboxList}
                    <div id="exclusionWarning" class="alert alert-warning mt-3 text-sm-center" style="display:none;">
                        Para poder hacer el sorteo por favor deje una opcion disponible
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" id="close" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn" id="modalConfirm">Save changes</button>
                </div>
            </div>
        </div>
    `;

    document.body.append(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    modal.querySelector('#modalConfirm').addEventListener('click', () => {
        const allCheckboxes = [...modal.querySelectorAll('.form-check-input')];
        const checked = allCheckboxes.filter(cb => cb.checked).map(cb => cb.value);

        if (checked.length === allCheckboxes.length) {
            modal.querySelector('#exclusionWarning').style.display = 'block';
            return;
        }

        stored[currentPersonName] = checked;
        localStorage.setItem('exclusions', JSON.stringify(stored));

        bsModal.hide();
    });

    modal.addEventListener('hidden.bs.modal', () => modal.remove());
}

yesButton.addEventListener('click', createExclusions);

document.getElementById("cont").addEventListener("click", function() {
    const active = document.querySelector('.custom-toggle.active');
    if (!active) {
        this.removeAttribute('href');
        return;
    }
    this.setAttribute('href', 'typeOfEvent.html');
});