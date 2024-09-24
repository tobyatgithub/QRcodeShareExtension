console.log("QR Code extension script started");

function generateQRCode() {
  console.log("Generating QR code");

  // Check if QR code container already exists
  let container = document.getElementById('qr-code-container');
  if (container) {
    console.log("QR code container already exists");
    return; // Exit the function if the container already exists
  }

  // Create container for QR code
  container = document.createElement('div');
  container.id = 'qr-code-container';
  document.body.appendChild(container);
  console.log("QR code container created");

  // Generate QR code
  try {
    const qr = new QRCode(container, {
      text: window.location.href,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    console.log("QR code generated");

    // Add website logo to QR code
    const logo = document.querySelector('link[rel*="icon"]');
    if (logo) {
      const img = document.createElement('img');
      img.src = logo.href;
      img.id = 'qr-code-logo';
      img.onload = function() {
        const qrImage = container.querySelector('img');
        if (qrImage) qrImage.style.display = 'none';
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
      container.appendChild(img);
    } else {
      console.log("No logo found");
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

  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}

function ensureQRCodeVisible() {
  const container = document.getElementById('qr-code-container');
  if (!container || !container.querySelector('canvas')) {
    generateQRCode();
  }
}

// Remove any existing QR code containers before generating a new one
function removeExistingQRCodes() {
  const existingContainers = document.querySelectorAll('#qr-code-container');
  existingContainers.forEach(container => container.remove());
}

// Initial generation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    removeExistingQRCodes();
    generateQRCode();
  });
} else {
  removeExistingQRCodes();
  generateQRCode();
}

// Periodically check if the QR code is still visible
setInterval(ensureQRCodeVisible, 1000);

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
