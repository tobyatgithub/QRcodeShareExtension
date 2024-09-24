# QR Code Chrome Extension

## Description

This Chrome extension generates a QR code for the current webpage and displays it in the lower right corner of the browser window. The QR code includes the website's logo in the center and displays the website's domain name and title below.

## Features

- Generates a QR code for the current webpage
- Displays the QR code in the lower right corner of the browser window
- Includes the website's favicon as a logo in the center of the QR code
- Shows the website's domain name and title below the QR code

## Installation

1. Clone this repository or download the source code.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

Once installed, the extension will automatically generate and display a QR code for every webpage you visit. The QR code will appear in the lower right corner of the browser window.

## Files

- `manifest.json`: Defines the extension's properties and permissions
- `content.js`: Contains the main logic for generating and displaying the QR code
- `styles.css`: Defines the styling for the QR code container and related elements
- `qrcode.min.js`: Third-party library for generating QR codes

## Development

This extension is built using HTML, CSS, and JavaScript. It uses the [qrcodejs](https://github.com/davidshimjs/qrcodejs) library for QR code generation.

## Troubleshooting

If the QR code doesn't appear or disappears quickly, check the browser console for error messages. The extension includes debug logging to help identify issues.

## Future Improvements

- Add options to customize QR code appearance
- Implement a toggle to show/hide the QR code
- Optimize performance for faster QR code generation

## References

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [qrcodejs Library](https://github.com/davidshimjs/qrcodejs)

## License

[MIT License](LICENSE)