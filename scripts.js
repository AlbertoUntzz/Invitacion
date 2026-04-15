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
const form = document.getElementById("formAsistencia");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        nombre: form.nombre.value,
        asistencia: form.asistencia.value,
        acompanantes: form.acompanantes.value
    };

    await fetch("https://script.google.com/macros/s/AKfycbwUJdV0PoZND629gichOTvvd9TlRkrruSrBcrNpq7SxKIJZ9fEHgqLCEhuMbpZuNap5/exec", {
        method: "POST",
        body: JSON.stringify(data)
    });

    document.getElementById("mensaje").textContent = "¡Gracias por confirmar!";
    form.reset();
});

