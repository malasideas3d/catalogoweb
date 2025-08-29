
// Iniciar la simulación de carga cuando la página se cargue
window.onload = simulateDataLoading;

// Función para mostrar una pantalla específica
function showScreen(screenId) {
    // Ocultar todas las pantallas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla seleccionada
    const selectedScreen = document.getElementById(screenId);
    selectedScreen.classList.add('active');
}

// Función para simular la carga de datos desde Google Sheets
function simulateDataLoading() {
    const progressBar = document.getElementById('progress');
    const loadingText = document.getElementById('loading-text');
    const splashScreen = document.getElementById('splash-screen');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Actualizar la barra de progreso y texto
            progressBar.style.width = progress + '%';
            loadingText.textContent = '¡Carga completada!';
            
            // Esperar un momento y luego mostrar la pantalla principal
            setTimeout(() => {
                // Ocultar completamente el splash screen
                splashScreen.classList.add('hidden');
                // Mostrar la pantalla principal
                document.getElementById('home-screen').classList.add('active');
            }, 800);
        } else {
            // Actualizar la barra de progreso y texto
            progressBar.style.width = progress + '%';
            
            // Mensajes de carga según el progreso
            if (progress < 30) {
                loadingText.textContent = 'Conectando con Google Sheets...';
            } else if (progress < 60) {
                loadingText.textContent = 'Descargando datos...';
            } else {
                loadingText.textContent = 'Procesando información...';
            }
        }
    }, 300);
}
