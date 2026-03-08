// ==============================
// EVENT LISTENERS
// ==============================
// DOM: DOM Content
document.addEventListener('DOMContentLoaded', () => {
	const people = JSON.parse(localStorage.getItem('people') || '[]');
	let exclusions = JSON.parse(localStorage.getItem('exclusions') === "No exclusions" ? "{}" : (localStorage.getItem('exclusions') || "{}"));
	const eventName = localStorage.getItem('eventName') || 'Sorteo SwapIt';

	document.getElementById('eventTitle').textContent = eventName;
	const container = document.getElementById('pairsContainer');
	const revealZone = document.getElementById('revealZone');

	function generatePairs(participants) {
		let success = false; let pairs = {}; let attempts = 0;
		while (!success && attempts < 100) {
			attempts++;
			const givers = [...participants];
			const receivers = [...participants].sort(() => Math.random() - 0.5);
			pairs = {}; success = true;
			for (let i = 0; i < givers.length; i++) {
				const g = givers[i].name; const r = receivers[i].name;
				const forbidden = exclusions[g] || [];
				if (g === r || forbidden.includes(r)) { success = false; break; }
				pairs[g] = r;
			}
		}
		return pairs;
	}

	const pairs = generatePairs(people);

	Object.entries(pairs).forEach(([giver, receiver]) => {
		const card = document.createElement('div');
		card.className = 'pair-card';
		card.id = `card-${giver.replace(/\s+/g, '-')}`;
		card.innerHTML = `
            <div class="giver">De: ${giver}</div>
            <div class="receiver">Para: ${receiver}</div>
        `;
		container.appendChild(card);

		card.draggable = true;
		card.addEventListener('dragstart', function (e) {
			this.classList.remove('flipped');
			this.classList.add('dragging');

			const ghost = document.getElementById('drag-ghost');
			if (e.dataTransfer.setDragImage && ghost) {
				e.dataTransfer.setDragImage(ghost, 0, 0);
			}

			e.dataTransfer.setData('text/plain', this.id);
		});
		card.addEventListener('dragend', function () { this.classList.remove('dragging'); });

		card.addEventListener('touchstart', handleTouchStart, { passive: false });
		card.addEventListener('touchmove', handleTouchMove, { passive: false });
		card.addEventListener('touchend', handleTouchEnd);
	});

	container.addEventListener('dragover', (e) => e.preventDefault());
	container.addEventListener('drop', (e) => {
		e.preventDefault();
		const id = e.dataTransfer.getData('text/plain');
		const card = document.getElementById(id);
		if (card) {
			card.classList.remove('flipped');
			container.appendChild(card);
			updateUI();
		}
	});

	revealZone.addEventListener('dragover', (e) => e.preventDefault());
	revealZone.addEventListener('dragenter', () => revealZone.classList.add('dragover'));
	revealZone.addEventListener('dragleave', () => revealZone.classList.remove('dragover'));
	revealZone.addEventListener('drop', (e) => {
		e.preventDefault();
		revealZone.classList.remove('dragover');
		const id = e.dataTransfer.getData('text/plain');
		const card = document.getElementById(id);
		if (card) dropInZone(card);
	});

	let touchOffsetX = 0; let touchOffsetY = 0;

	function handleTouchStart(e) {
		const touch = e.touches[0];
		const rect = this.getBoundingClientRect();
		touchOffsetX = touch.clientX - rect.left;
		touchOffsetY = touch.clientY - rect.top;
		this.classList.remove('flipped');
		this.style.position = 'fixed';
		this.style.zIndex = '1000';
	}

	function handleTouchMove(e) {
		e.preventDefault();
		const touch = e.touches[0];
		this.style.left = (touch.clientX - touchOffsetX) + 'px';
		this.style.top = (touch.clientY - touchOffsetY) + 'px';

		const zoneRect = revealZone.getBoundingClientRect();
		if (touch.clientX > zoneRect.left && touch.clientX < zoneRect.right &&
			touch.clientY > zoneRect.top && touch.clientY < zoneRect.bottom) {
			revealZone.classList.add('dragover');
		} else {
			revealZone.classList.remove('dragover');
		}
	}

	function handleTouchEnd(e) {
		this.style.position = 'relative';
		this.style.left = 'auto'; this.style.top = 'auto';
		this.style.zIndex = '5';
		revealZone.classList.remove('dragover');

		const touch = e.changedTouches[0];
		const zoneRect = revealZone.getBoundingClientRect();

		if (touch.clientX > zoneRect.left && touch.clientX < zoneRect.right &&
			touch.clientY > zoneRect.top && touch.clientY < zoneRect.bottom) {
			dropInZone(this);
		} else {
			this.classList.remove('flipped');
			container.appendChild(this);
		}
		updateUI();
	}

	function dropInZone(card) {
		const existing = revealZone.querySelector('.pair-card');
		if (existing) {
			existing.classList.remove('flipped');
			container.appendChild(existing);
		}
		revealZone.appendChild(card);
		setTimeout(() => card.classList.add('flipped'), 100);
		updateUI();
	}

	function updateUI() {
		const instr = document.getElementById('instruction');
		instr.style.display = revealZone.querySelector('.pair-card') ? 'none' : 'block';
	}

	document.getElementById('copyResults').onclick = () => {
		let text = `Resultados: ${eventName}\n\n`;
		Object.entries(pairs).forEach(([g, r]) => text += `${g} ➔ ${r}\n`);
		navigator.clipboard.writeText(text);
		Swal.fire({ icon: 'success', text: 'Copiado al portapapeles', confirmButtonColor: '#C9A227' });
	};

	document.getElementById('downloadResults').onclick = () => {
		let text = `Resultados: ${eventName}\n\n`;
		Object.entries(pairs).forEach(([g, r]) => text += `${g} ➔ ${r}\n`);
		const blob = new Blob([text], { type: 'text/plain' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = `${eventName}_Resultados.txt`;
		a.click();
	};

	document.getElementById('btnReset').onclick = () => {
		Swal.fire({
			title: '¿Salir?', text: 'Se perderán los datos.', icon: 'warning',
			showCancelButton: true, confirmButtonColor: '#C9A227'
		}).then(res => { if (res.isConfirmed) { localStorage.clear(); window.location.href = 'main.html'; } });
	};

	document.getElementById('logo-ref').onclick = () => {
		Swal.fire({
			title: '¿Salir?', text: 'Se perderán los datos.', icon: 'warning',
			showCancelButton: true, confirmButtonColor: '#C9A227'
		}).then(res => { if (res.isConfirmed) { localStorage.clear(); window.location.href = 'main.html'; } });
	};
});