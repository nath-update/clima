 // --- CONFIGURACIÓN ---
        // ¡IMPORTANTE! Los estudiantes deben obtener su propia API Key gratuita.
        // 1. Ir a https://openweathermap.org/
        // 2. Crear una cuenta gratuita.
        // 3. Ir a la sección "API keys" y copiar la clave.
        const apiKey = '37af9c4e9ef55d3ba71a017d24a347f4'; // <--- PEGA TU API KEY AQUÍ

        // --- ELEMENTOS DEL DOM ---
        // Obtenemos referencias a los elementos HTML que vamos a manipular.
        const cityInput = document.getElementById('cityInput');
        const searchButton = document.getElementById('searchButton');
        const weatherResult = document.getElementById('weatherResult');
        const cityName = document.getElementById('cityName');
        const weatherIcon = document.getElementById('weatherIcon');
        const temperature = document.getElementById('temperature');
        const description = document.getElementById('description');
        const errorMessage = document.getElementById('errorMessage');
        const loader = document.getElementById('loader');
        const welcomeMessage = document.getElementById('welcomeMessage');
       
        // Inicializamos Lucide Icons
        lucide.createIcons();

        // --- EVENT LISTENERS ---
        // Agregamos un evento al botón de búsqueda para que llame a la función getWeather cuando se haga clic.
        searchButton.addEventListener('click', getWeather);
       
        // Agregamos un evento al input para que también se pueda buscar presionando la tecla "Enter".
        cityInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                getWeather();
            }
        });

        // --- FUNCIÓN PRINCIPAL PARA OBTENER EL CLIMA ---
        async function getWeather() {
            const city = cityInput.value.trim();

            // Validación: si el campo está vacío, mostramos un error.
            if (!city) {
                showError('Por favor, ingresa el nombre de una ciudad.');
                return;
            }
           
            // Preparamos la URL de la API. Usamos encodeURIComponent para asegurar que los caracteres especiales (como acentos) se envíen correctamente.
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`;
           
            // Mostramos el spinner de carga y ocultamos otros elementos.
            showLoading();

            try {
                // Hacemos la llamada a la API usando fetch. 'await' pausa la ejecución hasta que la promesa se resuelva.
                const response = await fetch(apiUrl);
               
                // Si la respuesta no es exitosa (ej. error 404 Ciudad no encontrada), lanzamos un error.
                if (!response.ok) {
                    throw new Error('Ciudad no encontrada. Verifica el nombre e inténtalo de nuevo.');
                }
               
                // Convertimos la respuesta a formato JSON.
                const data = await response.json();
               
                // Si todo sale bien, mostramos los datos del clima.
                displayWeather(data);

            } catch (error) {
                // Si ocurre cualquier error en el bloque 'try', lo capturamos aquí.
                showError(error.message);
            }
        }

        // --- FUNCIONES AUXILIARES ---

        // Función para mostrar los datos del clima en la interfaz.
        function displayWeather(data) {
            // Ocultamos el loader, el mensaje de bienvenida y los errores.
            loader.classList.add('hidden');
            welcomeMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
           
            // Actualizamos el contenido de los elementos HTML con los datos de la API.
            cityName.textContent = data.name;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            description.textContent = data.weather[0].description;
           
            // Construimos la URL del ícono del clima.
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherIcon.alt = data.weather[0].description;
           
            // Mostramos el contenedor de resultados.
            weatherResult.classList.remove('hidden');
        }

        // Función para mostrar un mensaje de error.
        function showError(message) {
            loader.classList.add('hidden');
            weatherResult.classList.add('hidden');
            welcomeMessage.classList.add('hidden');
           
            errorMessage.textContent = message;
            errorMessage.classList.remove('hidden');
        }

        // Función para mostrar el indicador de carga.
        function showLoading() {
            errorMessage.classList.add('hidden');
            weatherResult.classList.add('hidden');
            welcomeMessage.classList.add('hidden');
            loader.classList.remove('hidden');
        }


