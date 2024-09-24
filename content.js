(function() {
    console.log("QR Code extension script started");

    // Ensure the script runs only once
    if (window.qrCodeExtensionRun === true) {
        console.log("QR Code script has already run. Exiting.");
        return;
    }
    window.qrCodeExtensionRun = true;

    function createQRCode() {
        console.log("Creating QR code");

        // Remove any existing QR code containers
        const existingContainers = document.querySelectorAll('#qr-code-container');
        existingContainers.forEach(container => container.remove());

        // Create container for QR code
        const container = document.createElement('div');
        container.id = 'qr-code-container';
        document.body.appendChild(container);

        // Generate QR code
        try {
            new QRCode(container, {
                text: window.location.href,
                width: 256,
                height: 256,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            console.log("QR code generated");

            // Hide the img element
            const qrCodeImg = container.querySelector('img');
            if (qrCodeImg) {
                qrCodeImg.style.display = 'none';
            }

            // Add website name and title
            const infoContainer = document.createElement('div');
            infoContainer.id = 'qr-code-info';
            infoContainer.innerHTML = `
                <p>${document.domain}</p>
                <p>${document.title}</p>
            `;
            container.appendChild(infoContainer);
            console.log("Website info added");

            // Add logo after a short delay to ensure QR code is fully rendered
            setTimeout(() => addLogoToQRCode(container), 100);

        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    }

    function addLogoToQRCode(container) {
        const logo = document.querySelector('link[rel*="icon"]');
        if (logo && logo.href) {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = logo.href;
            img.onload = function() {
                const canvas = container.querySelector('canvas');
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    const size = 64;
                    ctx.drawImage(img, 96, 96, size, size);
                    console.log("Logo added to QR code");
                } else {
                    console.log("Canvas not found");
                }
            };
            img.onerror = function() {
                console.log("Error loading logo");
            };
        } else {
            console.log("No logo found");
        }
    }

    // Create the QR code only once, when the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createQRCode);
    } else {
        createQRCode();
    }

    // Remove the 'load' event listener to prevent potential double execution
    window.removeEventListener('load', createQRCode);

    // Add a visible debug element
    const debugElement = document.createElement('div');
    debugElement.id = 'qr-code-debug';
    debugElement.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 10px;
        border: 1px solid black;
        z-index: 10000;
    `;
    debugElement.textContent = 'QR Code Extension Active';
    document.body.appendChild(debugElement);
})();
