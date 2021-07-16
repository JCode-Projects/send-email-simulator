/* Variables */
const btnEnviar = document.querySelector("#enviar");
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#enviar-mail");
const btnReset = document.querySelector("#resetBtn");

eventListeners();
function eventListeners() {
    // Cuando la app inicia
    document.addEventListener("DOMContentLoaded", iniciarApp);

    // Campos del formulario
    email.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);

    // Reiniciar el formulario
    btnReset.addEventListener("click", resetearFormulario);

    // Enviar el email
    formulario.addEventListener("submit", enviarEmail);
}

/* Funciones */
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
    if(e.target.value.length > 0) {
        // Elimina los errores
        const error = document.querySelector("p.error");
        error ? error.remove() : null;

        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");
    } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");
        mostrarError("Todos los campos son obligatorios.");
    }
    
    if(e.target.type == "email") {
        const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(er.test(e.target.value)) {

        } else {
            mostrarError("El email debe ser válido.")
        }
    }

    if(email.value.length && asunto.value.length && mensaje.value.length) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    }
}

function mostrarError(msgError) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = msgError;
    mensajeError.classList.add("border", "border-red-500", "background-red-100", "text-red-500", "p-3", "mt-5", "text-center", "error");

    const errores = document.querySelectorAll(".error");

    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

}

function enviarEmail(e) {
    e.preventDefault();

    // Mostrar el spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    // Despues de 3 segundos ocultar
    setTimeout(() => {
        spinner.style.display = "none";

        // Mensaje de exito
        const parrafo = document.createElement("p");
        parrafo.textContent = "El email se envió correctamente.";
        parrafo.classList.add("text-center", "my-10", "p-3", "bg-green-500", "text-white");

        formulario.insertBefore(parrafo, spinner);
        
        setTimeout(() => {
            parrafo.remove();
            resetearFormulario(e);
        }, 4000);
    }, 3000);
}

function resetearFormulario(e) {
    e.preventDefault();

    formulario.reset();
    iniciarApp();
}