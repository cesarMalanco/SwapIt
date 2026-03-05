const PEOPLE_KEY = "people";
let people = JSON.parse(localStorage.getItem(PEOPLE_KEY)) || [];
let id =0;

function saveOrganizerName(){
    const organizer = document.getElementById("organizerName");
    const organizerChecker = document.getElementById("partoftheexchange");

    localStorage.setItem("organizerName", organizer.value);
    if(organizer.value === ''){
        document.getElementById("cont").removeAttribute("href");
    }else{
        document.getElementById("cont").setAttribute("href", "names.html");
    }
    if(organizerChecker.checked){
        const newName = { id: id, name: organizer.value};
        people.push(newName);
        localStorage.setItem(PEOPLE_KEY, JSON.stringify(people));
        localStorage.setItem("orgParticipating", true);
        console.log("Organizer stored as a participant");
    }
}

document.getElementById("cont").addEventListener("click", saveOrganizerName);
