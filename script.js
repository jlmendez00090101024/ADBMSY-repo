// Tab Switch Logic
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');

    if (tabId === 'er-diagram') {
        setTimeout(drawConnections, 50);
    }
}

// Dynamic Line Drawing for ER Diagram
function drawConnections() {
    const svg = document.getElementById('erSvg');
    const wrapper = document.getElementById('erWrapper');
    if (!svg || !wrapper) return;

    svg.innerHTML = ''; // Clear existing lines

    const wrapperRect = wrapper.getBoundingClientRect();

    const connections = [
        { from: 'e-student', to: 'e-enrollment' },
        { from: 'e-enrollment', to: 'e-course' },
        { from: 'e-department', to: 'e-professor' },
        { from: 'e-professor', to: 'e-course' }
    ];

    connections.forEach(conn => {
        const el1 = document.getElementById(conn.from);
        const el2 = document.getElementById(conn.to);

        if (el1 && el2) {
            const r1 = el1.getBoundingClientRect();
            const r2 = el2.getBoundingClientRect();

            // Calculate center points relative to the wrapper
            const x1 = (r1.left + r1.right) / 2 - wrapperRect.left;
            const y1 = (r1.top + r1.bottom) / 2 - wrapperRect.top;
            const x2 = (r2.left + r2.right) / 2 - wrapperRect.left;
            const y2 = (r2.top + r2.bottom) / 2 - wrapperRect.top;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('class', 'er-line');

            svg.appendChild(line);
        }
    });
}

// Initialize connections on load & window resize
window.addEventListener('load', drawConnections);
window.addEventListener('resize', drawConnections);