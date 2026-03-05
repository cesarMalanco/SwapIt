const nameEvent = localStorage.getItem('eventType');
let price;

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
}

document.querySelectorAll('.custom-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const isActive = this.classList.contains('active');

        document.querySelectorAll('.custom-toggle').forEach(btn => btn.classList.remove('active'));

        if (!isActive) {
            this.classList.add('active');
            if (button.classList.contains('christmas') || button.classList.contains('Halloween') || button.classList.contains('NewYears') || button.classList.contains('Hanukkah') || button.classList.contains('StValentine')) {
                document.getElementById('otherPrices').style.display = 'none';
            }
        }
    });
});

function Other(){
    if (document.getElementById("diff").classList.contains('active')) {
        document.getElementById('otherPrices').style.display = 'block';
        if (nameEvent === 'christmas' || nameEvent === 'Halloween' || nameEvent === 'NewYears' || nameEvent === 'Hanukkah' || nameEvent === 'StValentine') {
            document.getElementById('price').classList.add(nameEvent);

        } else {
            document.getElementById('price').classList.add('other');
        }
    }else{
        document.getElementById('otherPrices').style.display = 'none';
    }
}

document.getElementById("diff").addEventListener("click", Other);

function getPrice() {
    let auxprice = document.getElementById('priceCus').value;

    if (auxprice !== null) {
        price = auxprice;
    }
}

document.getElementById("cont").addEventListener("click", function() {
    const active = document.querySelector('.custom-toggle.active');

    if (!active) {
        this.removeAttribute('href');
        return;
    }

    if (active.id === 'diff') {
        localStorage.setItem('eventPrice', '$' + price);
    } else {
        localStorage.setItem('eventPrice', active.innerText);
        this.setAttribute('href', 'finished.html');
    }
});