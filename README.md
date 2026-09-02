# ABP Practica M6

Aplicacion backend construida con Node.js, Express y Sequelize para gestionar usuarios y pedidos mediante una base de datos relacional PostgreSQL.

## Requisitos

- Node.js 18 o superior.
- npm.
- PostgreSQL ejecutandose localmente con una base `abp_m6`.

## Instalacion

```bash
npm install
```

Crea un archivo `.env` con las credenciales del entorno:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=abp_m6
DB_SSL=false
DATABASE_URL=postgres://postgres:postgres@localhost:5432/abp_m6
```

## Base de datos

Puedes crear la estructura inicial ejecutando el script SQL ubicado en `src/db/init.sql` en PostgreSQL.

```bash
psql -U postgres -f src/db/init.sql
```

## Ejecucion

```bash
npm start
```

Modo desarrollo:

```bash
npm run dev
```

## Rutas principales

- `GET /api/users` - lista todos los usuarios.
- `GET /api/users?nombre=Juan` - filtro por nombre.
- `GET /api/users/:id` - usuario por id.
- `GET /api/users/email/:email` - usuario por email.
- `POST /api/users` - crear usuario.
- `PUT /api/users/:id` - actualizar usuario.
- `DELETE /api/users/:id` - eliminar usuario.
- `POST /api/users/transaccion` - creación de usuario + pedido con transacción.
- `GET /api/users/:id/pedidos` - usuario con sus pedidos usando `include`.
- `GET /status` - estado del servidor.

## Justificacion del enfoque

Se eligio PostgreSQL + Sequelize porque permite trabajar con consultas SQL tradicionales y una abstraccion moderna ORM con relaciones claras. Las credenciales se almacenan en `.env`, evitando exponer secretos en el codigo fuente. El proyecto elimina datos sensibles como `password_hash` antes de responder JSON.

## Trasabilidad y validaciones

- Se validan campos obligatorios en creation/update.
- Se evita responder información sensible.
- Se implementa rollback en la operacion transaccional si falla alguna parte.
- Se usan mensajes claros para errores de conexión, validacion y ausencia de registros.

## Estructura

```text
server.js              # Punto de entrada HTTP
src/app.js             # Configuracion de Express
src/db/                # Conexion DB y scripts SQL
src/routes/            # Rutas web y API
src/controllers/        # Logica de las respuestas
src/models/             # Modelos Sequelize
src/utils/              # Utilidades de sanitizacion y filtros
public/                # Recursos estaticos
logs/                  # Registro de visitas
src/views/             # Plantillas Handlebars
```
