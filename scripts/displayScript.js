const typeEvent = localStorage.getItem('eventType');

window.onload = function() {
    const organizer = localStorage.getItem('organizerName');
    const eventName = localStorage.getItem('eventName');
    const eventDate = localStorage.getItem('eventDate');
    const eventPrice = localStorage.getItem('eventPrice');
    const exclusions = JSON.parse(localStorage.getItem('exclusions') || '{}');

    const htmlContent = `
        <h2>Datos del Evento</h2>
        <p>Organiza: ${organizer}</p>
        <p>Nombre del Evento: ${eventName}</p>
        <p>Fecha del evento: ${eventDate}</p>
        <p>Presupuesto del regalo: ${eventPrice}</p>

        <h3>Excepciones</h3>
            ${Object.entries(exclusions).map(([person, excluded]) => `
                <p>
                    <strong>${person}</strong> no puede regalarle a: 
                    ${excluded.length > 0 ? excluded.join(', ') : 'nadie'}
                </p>
            `).join('')}
    `;

    document.getElementById('info').innerHTML = htmlContent;

    if (typeEvent === 'christmas' || typeEvent === 'Halloween' || typeEvent === 'NewYears' || typeEvent === 'Hanukkah' || typeEvent === 'StValentine') {
        document.getElementById('content').id = typeEvent + '-';

        document.querySelectorAll('.custom-toggle').forEach(button => {
            button.classList.add(typeEvent);
        });
    } else {
        document.getElementById('content').id = 'other-';

        document.querySelectorAll('.custom-toggle').forEach(button => {
            button.classList.add('other');
        });
    }


}