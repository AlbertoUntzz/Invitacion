// =========================
// CONTADOR FUNCIONANDO
// =========================
const mensaje = document.getElementById("mensaje");
// Fecha del evento (prueba cercana primero)
const fechaEvento = new Date("2026-05-16T21:00:00").getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    // Debug (puedes quitar luego)
    console.log("Tiempo restante:", diferencia);

    if (diferencia <= 0) {
        document.getElementById("contador").innerHTML = "🎉 ¡ES HOY!";
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

// Ejecutar
setInterval(actualizarContador, 1000);

actualizarContador();

// Verificar si ya respondió
/*const yaRespondio = localStorage.getItem("confirmado");


if (yaRespondio) {
    document.getElementById("formAsistencia").style.display = "none";
    mensaje.innerHTML =  `
    <div class="mensaje-exito">
    Ya confirmaste tu asistencia
    </div>
    `;
}*/


const form = document.getElementById("formAsistencia");
const boton = form.querySelector("button");

let enviado = false;

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (enviado) return;
    enviado = true;

    const acompanantes = parseInt(form.acompanantes.value);

    if (acompanantes > 3) {
    mensaje.innerHTML = `
    <div class="mensaje-error">
     No puedes llevar más de 3 acompañantes
    </div>
    `;
    return;
}
    const datos = {
        nombre: form.nombre.value,
        asistencia: form.asistencia.value,
        acompanantes: form.acompanantes.value
    };

    // bloquear botón
    boton.disabled = true;

    boton.textContent = "Enviando...";

    try {
        await fetch('https://script.google.com/macros/s/AKfycbzVHEep8OabHSTtCBBxsseqaIQIciMTRGFO8LIqsMsreKo-5_YFwxopLaK6o0M0A99l/exec', {
            method: "POST",
            body: JSON.stringify(datos)
        });

        // 🔥 GUARDAR QUE YA RESPONDIÓ
        localStorage.setItem("confirmado", "true");

        mensaje.innerHTML = `
        <div class="mensaje-exito">
        ¡Asistencia confirmada!
        </div>
        `;
        document.getElementById("modal").classList.add("active");
        form.reset();

        // Ocultar formulario
        form.style.display = "none";

    } catch (error) {
        mensaje.innerHTML = `
        <div class="mensaje-error">
        Error al enviar la confirmación
        </div>
        `;

        boton.disabled = false;

        boton.textContent = "Confirmar";
    }
});

function cerrarModal(){
    document.getElementById("modal").classList.remove("active");
}