const panel = document.getElementById('mainPanel');
const header = document.getElementById('header');
const minBtn = document.getElementById('minBtn');
const expandBtn = document.getElementById('expandBtn');
const fovInput = document.getElementById('fovInput');
const fovVal = document.getElementById('fovVal');

let isDragging = false;
let xOff = 0, yOff = 0, startX, startY;

function dragStart(e) {
    let cx = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    let cy = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    
    startX = cx - xOff;
    startY = cy - yOff;

    if (e.target === header || e.target === panel || e.target === expandBtn) {
        isDragging = true;
    }
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    let cx = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    let cy = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
    
    xOff = cx - startX;
    yOff = cy - startY;
    
    panel.style.transform = `translate3d(${xOff}px, ${yOff}px, 0)`;
}

function dragEnd() { isDragging = false; }

panel.addEventListener("touchstart", dragStart);
window.addEventListener("touchmove", drag, {passive: false});
window.addEventListener("touchend", dragEnd);

panel.addEventListener("mousedown", dragStart);
window.addEventListener("mousemove", drag);
window.addEventListener("mouseup", dragEnd);

function toggle() {
    panel.classList.toggle('minimized');
}

minBtn.onclick = (e) => { e.stopPropagation(); toggle(); };
expandBtn.onclick = (e) => { e.stopPropagation(); toggle(); };

fovInput.oninput = () => {
    fovVal.innerText = fovInput.value;
};
