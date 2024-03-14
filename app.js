/* La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
solo debe aceptar minusculas, sin acentos y sin caracteres especiales */

document.addEventListener('DOMContentLoaded', function () {
    var miAudio = document.querySelector('.audio');
    var boton = document.getElementById("boton");

    miAudio.volume = 0.2; // Establecer el volumen al 20%
    miAudio.play(); // Iniciar la reproducción automáticamente al cargar la página

    boton.addEventListener("click", function () {
        if (miAudio.paused) {
            miAudio.play();
            boton.classList.toggle("play-button", false);
            boton.classList.toggle("pause-button", true);
            boton.textContent = "Pause";
        } else {
            miAudio.pause();
            boton.classList.toggle("play-button", true);
            boton.classList.toggle("pause-button", false);
            boton.textContent = "Play";
        }
    });
});

const textoIngresado = document.querySelector("#ingreso");
const textoResultado = document.querySelector("#resultado");

function limpiarIngreso() {
    textoIngresado.value = "";
}

function limpiarResultado() {
    textoResultado.value = "";
}

function validarTexto(texto) {
    const regex = /^[a-z\s]+$/; //letras minúsculas sin acentos ni caracteres especiales
    return regex.test(texto); // Verificar si el texto ingresado cumple la condicion
}

function toggleModal(displayStyle) {
    var modal = document.getElementById("modal");
    modal.style.display = displayStyle;
}

function encriptar() {
    if (!validarTexto(textoIngresado.value)) {
        alert('Ingrese solo letras minúsculas sin acentos ni caracteres especiales.');
        return;
    }
    toggleModal("inline-block");
    var video = document.getElementById("candado");
    if (video) {
        video.currentTime = 0; // Reiniciar el tiempo de reproducción del video
        video.play();
        setTimeout(function () {
            video.pause();
            toggleModal("none");
            setTimeout(function () {
                let textoEncriptado = textoIngresado.value.replace(/e/g, "enter")
                    .replace(/i/g, "imes")
                    .replace(/a/g, "ai")
                    .replace(/o/g, "ober")
                    .replace(/u/g, "ufat");
                textoResultado.value = textoEncriptado;
            });
        }, 3000);
    } else {
        console.error("No se pudo encontrar el elemento de video 'candado'.");
    }
}

function desencriptar() {
    if (!validarTexto(textoIngresado.value)) {
        alert('Ingrese solo letras minúsculas sin acentos ni caracteres especiales.');
        return;
    }
    toggleModal("inline-block");
    var video = document.getElementById("candado");
    if (video) {
        video.currentTime = 0; // Reiniciar el tiempo de reproducción del video
        video.play();
        setTimeout(function () {
            video.pause();
            toggleModal("none");
            setTimeout(function () {
                let textoDesencriptado = textoIngresado.value.replace(/ufat/g, "u") // desencriptar
                    .replace(/ober/g, "o")
                    .replace(/ai/g, "a")
                    .replace(/imes/g, "i")
                    .replace(/enter/g, "e");
                textoResultado.value = textoDesencriptado; // Mostrar el resultado
            });
        }, 3000);
    } else {
        console.error("No se pudo encontrar el elemento de video 'candado'.");
    }
}

function copiar() {
    navigator.clipboard.writeText(textoResultado.value)//copiar el texto al portapapeles
        .then(() => {
            limpiarResultado();
            limpiarIngreso();
        })
        .catch((err) => {
            console.error('Error al copiar desde el portapapeles:', err);
        });
}

function pegar() {
    limpiarIngreso();
    navigator.clipboard.readText() // copiar el portapapeles
        .then((clipboardText) => {
            textoIngresado.value = clipboardText; // Pegar el portapapeles en ingreso
        })
        .catch((err) => {
            console.error('Error al pegar desde el portapapeles:', err);
        });
}

