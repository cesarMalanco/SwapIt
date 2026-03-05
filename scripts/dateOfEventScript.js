const nameEvent = localStorage.getItem('eventType');
let formattedDate;

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

    const date1 = new Date();
    date1.setDate(date1.getDate() + 7);
    const formattedDate1 = date1.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('date1').innerHTML = formattedDate1;

    const date2 = new Date();
    date2.setDate(date2.getDate() + 14);
    const formatteddate2 = date2.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('date2').innerHTML = formatteddate2;

    const date3 = new Date();
    date3.setDate(date3.getDate() + 21);
    const formatteddate3 = date3.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('date3').innerHTML = formatteddate3;
}

document.querySelectorAll('.custom-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const isActive = this.classList.contains('active');

        document.querySelectorAll('.custom-toggle').forEach(btn => btn.classList.remove('active'));

        if (!isActive) {
            this.classList.add('active');
            if (button.classList.contains('christmas') || button.classList.contains('Halloween') || button.classList.contains('NewYears') || button.classList.contains('Hanukkah') || button.classList.contains('StValentine')) {
                document.getElementById('calendar').style.display = 'none';
            }
        }
    });
});

document.getElementById("cont").addEventListener("click", function() {
    const active = document.querySelector('.custom-toggle.active');

    if (!active) {
        this.removeAttribute('href');
        return;
    }

    if (active.id === 'diff') {
        localStorage.setItem('eventDate', formattedDate);
    } else {
        localStorage.setItem('eventDate', active.innerText);
        this.setAttribute('href', 'price.html');
    }
});

function Other(){
    if (document.getElementById("diff").classList.contains('active')) {
        document.getElementById('calendar').style.display = 'block';
        if (nameEvent === 'christmas' || nameEvent === 'Halloween' || nameEvent === 'NewYears' || nameEvent === 'Hanukkah' || nameEvent === 'StValentine') {
            document.getElementById('date').classList.add(nameEvent);

        } else {
            document.getElementById('date').classList.add('other');
        }
    }else{
        document.getElementById('calendar').style.display = 'none';
    }
}

document.getElementById("diff").addEventListener("click", Other);

function getTheDate() {
    const dateInput = document.getElementById('startDate');
    const selectedDateValue = dateInput.value; // Returns string "YYYY-MM-DD"

    // Convert the string to a Date object
    const dateObject = new Date(selectedDateValue + 'T00:00:00');

    formattedDate = dateObject.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    console.log(formattedDate);
    localStorage.setItem('eventDate',formattedDate);

    if(formattedDate !== "Invalid Date"){
        document.getElementById('cont').setAttribute('href', 'price.html');
    }
}