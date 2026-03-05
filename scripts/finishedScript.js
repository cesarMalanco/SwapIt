const nameEvent = localStorage.getItem('eventType');

window.onload = function() {
    if (nameEvent === 'christmas' || nameEvent === 'Halloween' || nameEvent === 'NewYears' || nameEvent === 'Hanukkah' || nameEvent === 'StValentine') {
        document.getElementById('content').id = nameEvent + '-';

        document.getElementById('sorteo').classList.add(nameEvent);
    } else {
        document.getElementById('content').id = 'other-';

        document.getElementById('sorteo').classList.add('other');
    }

    if((localStorage.getItem('sorteo') === 'true') ){
       document.getElementById('sorteo').classList.remove(nameEvent);
       document.getElementById('sorteo').classList.add('disabled');
       document.getElementById('display').classList.remove('disabled');
       if(nameEvent === 'other'){
           document.getElementById('display').classList.add(nameEvent);
       }else{
           document.getElementById('display').classList.add('other');
       }
    }
}

document.querySelectorAll('.custom-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const isActive = this.classList.contains('active');

        document.querySelectorAll('.custom-toggle').forEach(btn => btn.classList.remove('active'));

        if (!isActive) {
            this.classList.add('active');
        }
    });
});