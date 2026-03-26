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