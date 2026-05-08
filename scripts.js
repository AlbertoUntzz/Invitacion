// =========================
// CONTADOR
// =========================

const mensaje = document.getElementById("mensaje");

const fechaEvento = new Date("2026-05-16T21:00:00").getTime();

function actualizarContador() {

    const ahora = new Date().getTime();

    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {

        document.getElementById("contador")
        .innerHTML = "🎉 ¡ES HOY!";

        return;
    }

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (diferencia / 1000) % 60
    );

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

setInterval(actualizarContador, 1000);

actualizarContador();


// =========================
// VERIFICAR SI YA RESPONDIÓ
// =========================

const yaRespondio = localStorage.getItem("confirmado");

if (yaRespondio) {

    document.getElementById("formAsistencia")
    .style.display = "none";

    document.getElementById("tituloAsistencia")
    .innerHTML = `

    <div class="estado-confirmado">

        <h3>
            Ya confirmaste tu asistencia
        </h3>

        <p>
            Habrá alberca
        </p>

        <p>
            No olvides llevar tu consumo
        </p>

    </div>
    `;
}


// =========================
// FORMULARIO
// =========================

const form = document.getElementById("formAsistencia");

const boton = form.querySelector("button");

let enviado = false;


// =========================
// ENVIAR FORMULARIO
// =========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (enviado) return;

    enviado = true;


    // =========================
    // VALIDAR ACOMPAÑANTES
    // =========================

    const acompanantes = parseInt(
        form.acompanantes.value
    );

    if (acompanantes > 3) {

        mensaje.innerHTML = `

        <div class="mensaje-error">
            No puedes llevar más de 3 acompañantes
        </div>

        `;

        enviado = false;

        return;
    }


    // =========================
    // DATOS
    // =========================

    const datos = {

        nombre: form.nombre.value,

        asistencia: form.asistencia.value,

        acompanantes: form.acompanantes.value
    };


    // =========================
    // BLOQUEAR BOTÓN
    // =========================

    boton.disabled = true;

    boton.textContent = "Enviando...";


    // =========================
    // UI INMEDIATA
    // =========================

    localStorage.setItem("confirmado", "true");

    document.getElementById("tituloAsistencia")
    .innerHTML = `

    <div class="estado-confirmado">

        <h3>
            Ya confirmaste tu asistencia
        </h3>

        <p>
            Habrá alberca
        </p>

        <p>
            No olvides llevar tu consumo
        </p>

    </div>
    `;

    form.style.display = "none";


    // =========================
    // ENVIAR A GOOGLE SHEETS
    // =========================

    try {

        await fetch(
            'https://script.google.com/macros/s/AKfycbzVHEep8OabHSTtCBBxsseqaIQIciMTRGFO8LIqsMsreKo-5_YFwxopLaK6o0M0A99l/exec',
            {
                method: "POST",
                body: JSON.stringify(datos)
            }
        );

        form.reset();

    } catch (error) {

        mensaje.innerHTML = `

        <div class="mensaje-error">
            Error al enviar la confirmación
        </div>

        `;

        boton.disabled = false;

        boton.textContent = "Confirmar";

        enviado = false;
    }
});