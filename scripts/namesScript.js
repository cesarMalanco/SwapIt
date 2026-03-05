window.onload = function() {
    console.log("onload fired");
    console.log("orgParticipating:", localStorage.getItem("orgParticipating"));
    console.log("retrievedArray:", localStorage.getItem("people"));
    addName();
};

function addName(){
    const participation = localStorage.getItem("orgParticipating");
    const retrievedArray = localStorage.getItem("people");
    const array = JSON.parse(retrievedArray);
    console.log("participation value:", participation);

    if(participation === "true"){
        console.log("condition passed, adding input...");
        const newInput = document.createElement("input");
        const orgDiv = document.getElementById("organizerName");
        console.log("orgDiv found:", orgDiv);
        newInput.type = "text";
        newInput.classList.add("form-control");
        newInput.value = array[0].name;
        newInput.disabled = true;
        orgDiv.appendChild(newInput);
    }

    if(array && array.length > 1){
        const participantsDiv = document.getElementById("participantsNames");
        const startIndex = participation === "true" ? 1 : 0;
        const participants = array.slice(startIndex);

        if(participants.length > 0){
            participantsDiv.innerHTML = ""; // clear default empty inputs

            participants.forEach((person, i) => {
                const input = document.createElement("input");
                input.type = "text";
                input.classList.add("form-control", "participants");
                if(i > 0) input.classList.add("mt-3");
                input.placeholder = "Agrega un nuevo participante";
                input.value = person.name;
                participantsDiv.appendChild(input);
            });
        }
    }
}

function clearLocalStorage(){
    localStorage.clear();
}

document.getElementById("goBack").addEventListener("click", clearLocalStorage);

function addParticipant(){
    console.log("entered the addParticipant function");
    const newParticipant = document.createElement("input");
    const participants = document.getElementById("participantsNames");
    newParticipant.type = "text";
    newParticipant.classList.add("form-control");
    newParticipant.classList.add("participants");
    newParticipant.classList.add("mt-3");
    newParticipant.placeholder = "Agrega un nuevo participante";
    participants.appendChild(newParticipant);
}

document.getElementById("addParticipant").addEventListener("click", addParticipant);

function saveParticipants(){
    const participants = document.getElementsByClassName('participants');
    const participantsArray = Array.from(participants).map(input => input.value);

    const people = localStorage.getItem("people");
    const peopleArray = JSON.parse(people) || [];
    const participation = localStorage.getItem("orgParticipating");

    // Keep organizer if present, replace participants
    const base = participation === "true" && peopleArray[0] ? [peopleArray[0]] : [];

    let id = base.length + 1;
    for(let i = 0; i < participantsArray.length; i++){
        if(participantsArray[i] !== ""){
            base.push({ id: id++, name: participantsArray[i] });
        }
    }

    if(base.length < 3){
        alert("Por favor agrega un minimo de 3 personas para tu intercambio");
        return;
    }else if(base.length > 3){

    }

    localStorage.setItem("people", JSON.stringify(base));
    window.location.href = "exclusions.html";
}
document.getElementById("cont").addEventListener("click", saveParticipants);