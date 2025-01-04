const regulators = document.querySelectorAll('.regulator');

regulators.forEach((regulator) => {
    let isDragging = false;
    let startAngle = 0;
    let currentAngle = 0;

    const burnerIndex = regulator.dataset.burner - 1;
    const flame = document.querySelectorAll('.flame')[burnerIndex];
    const tea = document.querySelector('.tea');

    function updateFlame(angle) {
        if (angle >= 0 && angle < 45) {
            flame.style.display = 'none';
            tea.style.animationPlayState = 'paused';
            tea.style.opacity = 0;
            stopBoiling();
        } else if (angle >= 45 && angle < 90) {
            flame.style.display = 'block';
            flame.style.height = '65px';
            flame.style.width = '48px';
            tea.style.animationPlayState = 'paused';
            startBoiling();
        } else if (angle >= 90 && angle < 180) {
            flame.style.display = 'block';
            flame.style.height = '70px';
            flame.style.width = '60px';
            tea.style.animationPlayState = 'paused';
        } else if (angle >= 180) {
            flame.style.display = 'block';
            flame.style.height = '77px';
            flame.style.width = '77px';
            tea.style.animationPlayState = 'running';
            tea.style.opacity = 1;
        }
    }

    regulator.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = regulator.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        startAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const rect = regulator.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            currentAngle = (angle - startAngle + 360) % 360;
            currentAngle = Math.min(Math.max(currentAngle, 0), 180);
            regulator.style.transform = `rotate(${currentAngle}deg)`;
            updateFlame(currentAngle);
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            if (currentAngle >= 180) {
                setTimeout(() => {
                    regulator.style.transform = 'rotate(0deg)';
                    updateFlame(0);
                }, 1000);
            }
        }
    });
});

function startBoiling() {
    addBubbles();
    addVapor();
}

function stopBoiling() {
    document.querySelectorAll('.bubbles').forEach(bubble => bubble.remove());
    document.querySelectorAll('.vapor').forEach(vapor => vapor.remove());
}

function addBubbles() {
    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubbles');
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = `${Math.random() * 10}px`;
        document.querySelector('.tea').appendChild(bubble);
    }
}

function addVapor() {
    for (let i = 0; i < 15; i++) {
        const vapor = document.createElement('div');
        vapor.classList.add('vapor');
        vapor.style.left = `${Math.random() * 100}%`;
        document.querySelector('.circle').appendChild(vapor);
    }
}