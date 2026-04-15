// =========================
// CONTADOR FUNCIONANDO
// =========================

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
    document.getElementById("mensaje").textContent = "✅ Ya confirmaste tu asistencia";
}*/


const form = document.getElementById("formAsistencia");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
        nombre: form.nombre.value,
        asistencia: form.asistencia.value,
        acompanantes: form.acompanantes.value
    };

    try {
        await fetch(URL, {
            method: "POST",
            body: JSON.stringify(datos)
        });

        // 🔥 GUARDAR QUE YA RESPONDIÓ
        localStorage.setItem("confirmado", "true");

        mensaje.textContent = "✅ Confirmación enviada";
        form.reset();

        // Ocultar formulario
        form.style.display = "none";

    } catch (error) {
        mensaje.textContent = "❌ Error al enviar";
    }
});