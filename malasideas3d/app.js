// Función para crear el splash screen con barra de progreso
function fSplashScreen(pIdIdentificador, pDirImagen, pTamano, pContenedor) {
    // Crear contenedor del splash screen
    const splashDiv = document.createElement('div');
    splashDiv.id = pIdIdentificador;
    splashDiv.style.position = 'fixed';
    splashDiv.style.top = '0';
    splashDiv.style.left = '0';
    splashDiv.style.width = '100%';
    splashDiv.style.height = '100%';
    splashDiv.style.backgroundColor = '#6a11cb';
    splashDiv.style.display = 'flex';
    splashDiv.style.flexDirection = 'column';
    splashDiv.style.justifyContent = 'center';
    splashDiv.style.alignItems = 'center';
    splashDiv.style.zIndex = '1000';
    splashDiv.style.transition = 'opacity 0.5s ease';
    
    // Crear imagen
    const img = document.createElement('img');
    img.src = pDirImagen;
    img.style.width = pTamano;
    img.style.height = pTamano;
    img.style.animation = 'spin 2s linear infinite';
    
    // Crear contenedor de barra de progreso
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    // Crear barra de progreso
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);
    
    // Crear texto de progreso
    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.textContent = '0%';
    
    // Crear texto de carga
    const loadingText = document.createElement('p');
    loadingText.textContent = 'Cargando datos desde Google Sheets...';
    loadingText.style.color = 'white';
    loadingText.style.fontSize = '1.2rem';
    loadingText.style.marginTop = '20px';
    
    // Crear detalles de carga
    const loadingDetails = document.createElement('div');
    loadingDetails.className = 'loading-details';
    loadingDetails.textContent = 'Conectando con Google Sheets...';
    
    // Añadir elementos al contenedor
    splashDiv.appendChild(img);
    splashDiv.appendChild(progressContainer);
    splashDiv.appendChild(progressText);
    splashDiv.appendChild(loadingText);
    splashDiv.appendChild(loadingDetails);
    
    // Añadir estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Añadir el splash screen al contenedor especificado
    const container = pContenedor ? document.getElementById(pContenedor) : document.body;
    container.appendChild(splashDiv);
    
    // Devolver una promesa para controlar cuando ocultar el splash
    return new Promise((resolve) => {
        // Función para actualizar la barra de progreso
        const updateProgress = (percentage, details) => {
            progressBar.style.width = percentage + '%';
            progressText.textContent = percentage + '%';
            if (details) {
                loadingDetails.textContent = details;
            }
        };
        
        // Función para ocultar el splash screen
        const hideSplash = () => {
            splashDiv.style.opacity = '0';
            setTimeout(() => {
                splashDiv.style.display = 'none';
                document.getElementById('mainContent').classList.remove('hidden');
                resolve();
            }, 500);
        };
        
        // Cargar datos de Google Sheets
        loadDataFromSheets(updateProgress)
            .then((data) => {
                console.log('Datos cargados:', data);
                updateProgress(100, '¡Carga completada!');
                // Añadir un tiempo mínimo de visualización (1 segundo)
                setTimeout(hideSplash, 1000);
            })
            .catch((error) => {
                console.error('Error al cargar datos:', error);
                updateProgress(100, 'Error al cargar datos. Mostrando información de ejemplo.');
                // Ocultar splash incluso si hay error después de 2 segundos
                setTimeout(hideSplash, 2000);
            });
    });
}

// Función para cargar datos desde Google Sheets con actualización de progreso
async function loadDataFromSheets(updateProgress) {
    // URL pública de ejemplo de una hoja de cálculo de Google Sheets
    const sheetId = '1eWp23FwcH1fKGnhEByq90lnOS1xJS1BA2Mt59LWfG4o';
    const sheetName = 'Configuracion';
    const apiKey = '0d72ec0753ee11a2509a51e0ea1c697a3e54ab92'; // Esta clave es de ejemplo
    
    try {
        updateProgress(10, 'Iniciando conexión con Google Sheets...');
        
        // Simular progreso de conexión
        await new Promise(resolve => setTimeout(resolve, 800));
        updateProgress(30, 'Conectando con Google Sheets API...');
        
        // Construir la URL de la API
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A1:Z2?key=${apiKey}`;
        
        // Simular progreso de preparación de solicitud
        await new Promise(resolve => setTimeout(resolve, 600));
        updateProgress(50, 'Solicitando datos...');
        
        // Hacer la solicitud a la API
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        
        updateProgress(70, 'Procesando datos obtenidos...');
        
        // Simular progreso de procesamiento
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const data = await response.json();
        
        updateProgress(90, 'Organizando información...');
        
        // Procesar los datos
        if (data.values && data.values.length >= 2) {
            const headers = data.values[0];
            const values = data.values[1];
            
            // Crear objeto con los datos
            const result = {};
            headers.forEach((header, index) => {
                result[header] = values[index] || '';
            });
            
            // Mostrar datos en la página
            displayData(result);
            
            return result;
        } else {
            throw new Error('No hay suficientes datos en la hoja');
        }
    } catch (error) {
        console.error('Error al cargar desde Google Sheets:', error);
        
        // Datos de ejemplo en caso de error
        const sampleData = {
            'Nombre': 'Juan Pérez',
            'Edad': '28',
            'Ciudad': 'Madrid',
            'Email': 'juan@example.com',
            'Ocupación': 'Desarrollador'
        };
        
        // Mostrar datos de ejemplo
        displayData(sampleData);
        
        return sampleData;
    }
}

// Función para mostrar los datos en la página
function displayData(data) {
    const container = document.getElementById('dataDisplay');
    container.innerHTML = '';
    
    for (const [key, value] of Object.entries(data)) {
        const card = document.createElement('div');
        card.className = 'data-card';
        card.innerHTML = `
            <h3>${key}</h3>
            <div class="data-value">${value}</div>
        `;
        container.appendChild(card);
    }
}

// Inicializar la aplicación cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Crear el splash screen
    fSplashScreen(
        'mySplash', 
        '/media/logo.png', 
        '120px', 
        'splashContainer'
    );
    
    // Configurar botones
    document.getElementById('reloadBtn').addEventListener('click', function() {
        document.getElementById('mainContent').classList.add('hidden');
        document.getElementById('mySplash').style.display = 'flex';
        document.getElementById('mySplash').style.opacity = '1';
        
        setTimeout(() => {
            loadDataFromSheets((percentage, details) => {
                const progressBar = document.querySelector('.progress-bar');
                const progressText = document.querySelector('.progress-text');
                const loadingDetails = document.querySelector('.loading-details');
                
                if (progressBar) progressBar.style.width = percentage + '%';
                if (progressText) progressText.textContent = percentage + '%';
                if (loadingDetails && details) loadingDetails.textContent = details;
            }).then(() => {
                document.getElementById('mainContent').classList.remove('hidden');
                document.getElementById('mySplash').style.display = 'none';
            });
        }, 1000);
    });
    
    document.getElementById('showSplashBtn').addEventListener('click', function() {
        document.getElementById('mainContent').classList.add('hidden');
        document.getElementById('mySplash').style.display = 'flex';
        document.getElementById('mySplash').style.opacity = '1';
        
        // Simular progreso para la demostración
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            const progressBar = document.querySelector('.progress-bar');
            const progressText = document.querySelector('.progress-text');
            const loadingDetails = document.querySelector('.loading-details');
            
            if (progressBar) progressBar.style.width = progress + '%';
            if (progressText) progressText.textContent = progress + '%';
            
            if (progress < 30) {
                if (loadingDetails) loadingDetails.textContent = 'Conectando con Google Sheets...';
            } else if (progress < 60) {
                if (loadingDetails) loadingDetails.textContent = 'Descargando datos...';
            } else if (progress < 90) {
                if (loadingDetails) loadingDetails.textContent = 'Procesando información...';
            } else {
                if (loadingDetails) loadingDetails.textContent = 'Finalizando...';
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    document.getElementById('mainContent').classList.remove('hidden');
                    document.getElementById('mySplash').style.opacity = '0';
                    setTimeout(() => {
                        document.getElementById('mySplash').style.display = 'none';
                    }, 500);
                }, 800);
            }
        }, 150);
    });
});