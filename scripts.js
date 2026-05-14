// =========================
// CONTADOR
// =========================
const formularioCerrado = true;
const mensaje = document.getElementById("mensaje");

const fechaEvento = new Date("2026-05-16T21:00:00").getTime();

function actualizarContador() {

    const ahora = new Date().getTime();

    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {
        clearInterval(intervalo);

    document.getElementById("contador")
    .innerHTML = `

    <div class="cumpleanos-mensaje">

        <h2>
                FELIZ CUMPLEAÑOS JESÚS 
        </h2>

        <p>
            Que te la pases bien
            <br>
            chicle bomba en tu cumpleaños 
        </p>

    </div>

    `;

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

const intervalo = setInterval(actualizarContador, 1000);


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

 
if (formularioCerrado) {

    form.style.display = "none";

    // SI YA CONFIRMÓ
    if (yaRespondio) {

        document.getElementById("tituloAsistencia")
        .innerHTML = `

        <div class="estado-confirmado">

            <h3>
                Tu confirmación ya fue enviada
            </h3>

            <p>
                Habrá alberca
            </p>

            <p>
                No olvides llevar tu consumo
            </p>

            <br>

            <p>
                Confirmaciones cerradas
            </p>

        </div>
        `;

    } else {

        // SI NO CONFIRMÓ
        document.getElementById("tituloAsistencia")
        .innerHTML = `

        <div class="estado-confirmado">

            <h3>
                Confirmaciones cerradas
            </h3>

            <p>
                Gracias por el interés
            </p>

            <p>
                El aforo del evento
                ha sido completado
            </p>

        </div>
        `;
    }
}


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

        boton.textContent = "Confirmar";k

        enviado = false;
    }
});