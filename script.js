const panel = document.getElementById('mainPanel');
const header = document.getElementById('header');
const minBtn = document.getElementById('minBtn');
const fovInput = document.getElementById('fovInput');
const fovVal = document.getElementById('fovVal');
const displayId = document.getElementById('displayId');

let isDragging = false;
let currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;

displayId.innerText = "NB-" + Math.floor(Math.random() * 900000 + 100000);

function dragStart(e) {
    if (panel.classList.contains('minimized') && e.type === 'mousedown') return;
    
    let clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    let clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

    initialX = clientX - xOffset;
    initialY = clientY - yOffset;

    if (e.target === header || e.target === panel || panel.classList.contains('minimized')) {
        isDragging = true;
    }
}

function dragEnd() {
    isDragging = false;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        let clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        let clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

        currentX = clientX - initialX;
        currentY = clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, panel);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

panel.addEventListener("touchstart", dragStart, {passive: false});
window.addEventListener("touchend", dragEnd);
window.addEventListener("touchmove", drag, {passive: false});

panel.addEventListener("mousedown", dragStart);
window.addEventListener("mouseup", dragEnd);
window.addEventListener("mousemove", drag);

function toggleMin() {
    panel.classList.toggle('minimized');
}

minBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMin();
});

panel.addEventListener('click', () => {
    if (panel.classList.contains('minimized')) toggleMin();
});

fovInput.addEventListener('input', (e) => {
    fovVal.innerText = e.target.value;
});

document.getElementById('aimbot').addEventListener('change', (e) => {
    console.log("Aimbot:", e.target.checked);
});

document.getElementById('forceHs').addEventListener('change', (e) => {
    console.log("ForceHS:", e.target.checked);
});
