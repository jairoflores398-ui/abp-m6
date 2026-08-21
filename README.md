# ABP Practica M6

Aplicacion backend construida con Node.js, Express y Handlebars para gestionar usuarios mediante vistas web y una API REST.

## Requisitos

- Node.js 18 o superior.
- npm.

## Instalacion

```bash
npm install
```

Copia `.env.example` como `.env` si deseas configurar el puerto:

```env
PORT=3000
```

## Ejecucion

Para ejecutar en modo normal:

```bash
npm start
```

Para desarrollo, `nodemon` reinicia el servidor cuando detecta cambios:

```bash
npm run dev
```

Tambien puedes indicar el puerto desde la linea de comandos:

```bash
node server.js --port 3001
```

Se eligio `server.js` como archivo principal porque concentra el arranque HTTP y la configuracion del puerto, mientras `src/app.js` exporta la aplicacion Express. Esta separacion mantiene independiente la configuracion de la aplicacion y su ejecucion.

## Rutas principales

- `GET /`: vista HTML de inicio.
- `GET /status`: respuesta JSON con el estado del servidor.
- `GET /api/users`: lista de usuarios en JSON.
- `GET /users`: vista HTML de usuarios.
- `GET /users/add`: formulario para agregar usuarios.
- `/assets/...`: archivos estaticos publicados desde `public/`.

Cada solicitud se registra en `logs/log.txt` con fecha, hora, metodo y ruta accedida. El archivo incluye tres accesos iniciales para cumplir el ejercicio de persistencia en archivos planos.

## Postman

Importa `CRUD ABP M6.postman_collection.json` en Postman. La coleccion incluye las rutas web, el estado del servidor y las operaciones CRUD de usuarios.

La variable de coleccion `baseUrl` apunta por defecto a `http://localhost:3000`. Si ejecutas el servidor en otro puerto, cambia esa variable antes de enviar las solicitudes.

## Estructura

```text
server.js              # Punto de entrada HTTP
src/app.js             # Configuracion de Express
src/routes/            # Rutas web y API
src/controllers/        # Logica de las respuestas
src/middlewares/        # Middlewares reutilizables
src/models/             # Modelo de usuario
src/db/                 # Persistencia JSON
src/utils/              # Utilidades de archivos
public/                 # Recursos estaticos
logs/                   # Registro de visitas
src/views/              # Plantillas Handlebars
```

## Flujo servidor-cliente

```text
Cliente -> solicitud HTTP -> Express -> middleware de logs -> ruta -> controlador -> respuesta HTML o JSON
```

Node.js proporciona el entorno de ejecucion JavaScript del servidor. Express aporta enrutamiento, middlewares, manejo de solicitudes y respuestas, y publicacion de archivos estaticos.
