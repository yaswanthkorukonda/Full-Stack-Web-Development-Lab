// QR code generation for browser using a library like 'qrious'
document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector(".input-field");
    const button = document.querySelector(".generate-btn");
    const inputGroup = document.querySelector(".input-group");

    // Create or select a container for QR preview
    let qrPreview = document.getElementById("qr-preview");
    if (!qrPreview) {
        qrPreview = document.createElement("div");
        qrPreview.id = "qr-preview";
        qrPreview.style.marginTop = "24px";
        qrPreview.style.display = "flex";
        qrPreview.style.flexDirection = "column"; 
        qrPreview.style.justifyContent = "center";
        qrPreview.style.alignItems = "center"; 
        inputGroup.appendChild(qrPreview);
    }

    function generateQR() {
        const url = input.value.trim();
        if (!url) {
            qrPreview.innerHTML = "<span style='color:red;'>Please enter a URL.</span>";
            return;
        }
        const validurl = url.match(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/);
        if (!validurl) {
            qrPreview.innerHTML = "<span style='color:red;background-color: #46616a;'>Please enter a valid URL. 😕</span>";
            return;
        }

        qrPreview.innerHTML = "";
        const qr = document.createElement("canvas");
        if (window.QRious) {
            new QRious({
                element: qr,
                value: url,
                size: 200,
                background: "#fff",
                foreground: "#1A2E35"
            });
            qrPreview.appendChild(qr);
            const info = document.createElement("div");
            info.style.marginTop = "12px";
            info.style.textAlign = "center";
            info.innerHTML = "Right click on QR code and choose <em style='color:red;background-color: #46616a;'>Save image as...</em> to Download 🤩";
            qrPreview.appendChild(info);
        } else {
            qrPreview.innerHTML = "QRious library not loaded.";
        }
    }

    button.addEventListener("click", generateQR);

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            generateQR();
        }
    });
});
