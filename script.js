document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('iconCanvas');
    const ctx = canvas.getContext('2d');

    // Controlli
    const shapeSelector = document.getElementById('shape');
    const bgColorPicker = document.getElementById('bgColor');
    const textInput = document.getElementById('iconText');
    const textColorPicker = document.getElementById('textColor');

    function drawIcon() {
        const shape = shapeSelector.value;
        const bgColor = bgColorPicker.value;
        const size = canvas.width;

        // Pulisce il canvas
        ctx.clearRect(0, 0, size, size);

        // Disegna lo sfondo
        ctx.fillStyle = bgColor;

        if (shape === 'circle') {
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (shape === 'square') {
            ctx.fillRect(0, 0, size, size);
        } else if (shape === 'squircle') {
            const radius = size * 0.2; // Raggio per gli angoli arrotondati
            ctx.beginPath();
            ctx.moveTo(radius, 0);
            ctx.lineTo(size - radius, 0);
            ctx.quadraticCurveTo(size, 0, size, radius);
            ctx.lineTo(size, size - radius);
            ctx.quadraticCurveTo(size, size, size - radius, size);
            ctx.lineTo(radius, size);
            ctx.quadraticCurveTo(0, size, 0, size - radius);
            ctx.lineTo(0, radius);
            ctx.quadraticCurveTo(0, 0, radius, 0);
            ctx.closePath();
            ctx.fill();
        }

        // Disegna il testo
        const text = textInput.value;
        const textColor = textColorPicker.value;

        if (text) {
            ctx.fillStyle = textColor;
            ctx.font = `bold ${size * 0.5}px Arial`; // Dimensione del font relativa alla dimensione dell'icona
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text.toUpperCase(), size / 2, size / 2);
        }
    }

    // Event listeners per aggiornare l'icona
    shapeSelector.addEventListener('change', drawIcon);
    bgColorPicker.addEventListener('input', drawIcon);
    textInput.addEventListener('input', drawIcon);
    textColorPicker.addEventListener('input', drawIcon);


    // Disegna l'icona iniziale
    drawIcon();

    // Logica per il download
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'icon.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
