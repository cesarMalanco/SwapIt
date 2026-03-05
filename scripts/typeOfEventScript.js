const container = document.getElementById('content');

document.querySelectorAll('.custom-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const isActive = this.classList.contains('active');

        document.querySelectorAll('.custom-toggle').forEach(btn => btn.classList.remove('active'));

        container.id = 'content';
        if (isActive) {
            document.getElementById('addName').style.display = 'none';
        }
        if (!isActive) {
            document.getElementById('addName').style.display = 'block';
            this.classList.add('active');
            if (this.id) {
                container.id = this.id + '-';
            }
            if (this.id !== 'other') {
                document.getElementById('eventType').style.display = 'none';
            }
        }
    });
});

function Other(){
    if (document.getElementById("other").classList.contains('active')) {
        document.getElementById('eventType').style.display = 'block';
    }else{
        document.getElementById('eventType').style.display = 'none';

    }
}

document.getElementById("other").addEventListener("click", Other);

document.getElementById("cont").addEventListener("click", function() {
    const active = document.querySelector('.custom-toggle.active');

    if (!active || document.getElementById('eventName').value === '') {
        this.removeAttribute('href');
        return;
    }

    if (active.id === 'other') {
        localStorage.setItem('eventType', document.getElementById('eventType').value);
    } else {
        localStorage.setItem('eventType', active.id);
    }

    localStorage.setItem('eventName', document.getElementById('eventName').value);
    this.setAttribute('href', 'dateOfEvent.html');
});