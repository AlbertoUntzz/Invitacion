window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    const contenido = document.getElementById('todo-el-contenido');

    // Esperar 3 segundos (3000 milisegundos)
    setTimeout(() => {
        // Desvanecer la pantalla negra
        loader.classList.add('fade-out');
        
        // Mostrar la invitación
        contenido.style.display = 'block';
        
        // Opcional: Eliminar el loader del código después de que desaparezca
        setTimeout(() => {
            loader.remove();
        }, 1000);
    }, 3000); 
});

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