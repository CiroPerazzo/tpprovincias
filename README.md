# TP Provincias — Node.js + Express + PostgreSQL

API REST para la gestión de provincias, desarrollada con Node.js, Express y PostgreSQL.

---

## Requisitos

- Node.js 18+
- PostgreSQL 14+
- npm

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/CiroPerazzo/tpprovincias.git
cd tpprovincias

# Instalar dependencias
npm install
```

---

## Configuración

Copiar el archivo de ejemplo y completar los valores:

```bash
cp .env-template .env
```

Variables de entorno disponibles:

| Variable               | Descripción                          | Ejemplo          |
|------------------------|--------------------------------------|------------------|
| `PORT`                 | Puerto del servidor                  | `3000`           |
| `DB_HOST`              | Host de PostgreSQL                   | `localhost`      |
| `DB_PORT`              | Puerto de PostgreSQL                 | `5432`           |
| `DB_NAME`              | Nombre de la base de datos           | `tpprovincias`   |
| `DB_USER`              | Usuario de PostgreSQL                | `postgres`       |
| `DB_PASSWORD`          | Contraseña de PostgreSQL             | `tu_password`    |
| `LOG_FILE_PATH`        | Carpeta donde se guardan los logs    | `./logs/`        |
| `LOG_FILE_NAME`        | Nombre del archivo de log            | `app.log`        |
| `LOG_TO_FILE_ENABLED`  | Activar escritura de logs a archivo  | `true`           |
| `LOG_TO_CONSOLE_ENABLED` | Activar logs por consola           | `true`           |

---

## Base de datos

Crear la tabla en PostgreSQL antes de levantar la app:

```sql
CREATE TABLE provinces (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  full_name     VARCHAR(150) NOT NULL,
  latitude      DOUBLE PRECISION,
  longitude     DOUBLE PRECISION,
  display_order INTEGER
);
```

---

## Ejecución

```bash
# Producción
npm start

# Desarrollo (con hot-reload via nodemon)
npm run dev
```

El servidor queda disponible en `http://localhost:3000`.

---

## Estructura del proyecto

```
tpprovincias/
├── src/
│   ├── configs/
│   │   └── db-config.js          # Config de conexión a PostgreSQL (leída del .env)
│   ├── controllers/
│   │   └── province-controller.js # Router Express con los 5 endpoints
│   ├── entities/
│   │   └── province.js            # Clase Province (mapea columnas de la tabla)
│   ├── helpers/
│   │   ├── log-helper.js          # Singleton de logging a archivo y/o consola
│   │   └── validaciones-helper.js # Validaciones de entrada
│   ├── modules/
│   │   └── province-routes.js     # Definición de rutas
│   ├── repositories/
│   │   └── province-repository.js # Acceso a DB — cada método gestiona su propio Client
│   └── services/
│       └── province-service.js    # Lógica de negocio y validaciones previas a escritura
├── .env                           # Variables de entorno (no commitear)
├── .env-template                  # Plantilla de variables de entorno
├── index.js                       # Entry point — configura Express y levanta el servidor
└── package.json
```

---

## Endpoints

Base URL: `http://localhost:3000/api/province`

| Método   | Ruta   | Descripción                        | Body requerido        | Respuesta exitosa |
|----------|--------|------------------------------------|-----------------------|-------------------|
| `GET`    | `/`    | Lista todas las provincias         | —                     | `200` + array     |
| `GET`    | `/:id` | Obtiene una provincia por id       | —                     | `200` + objeto    |
| `POST`   | `/`    | Crea una nueva provincia           | JSON con los campos   | `201` + objeto    |
| `PUT`    | `/`    | Actualiza una provincia (id en body)| JSON con los campos  | `201` + objeto    |
| `DELETE` | `/:id` | Elimina una provincia por id       | —                     | `200` + objeto eliminado |

### Códigos de respuesta

| Código | Significado                          |
|--------|--------------------------------------|
| `200`  | OK                                   |
| `201`  | Creado / Actualizado correctamente   |
| `400`  | Datos inválidos (falla de validación)|
| `404`  | Provincia no encontrada              |
| `500`  | Error interno del servidor           |

### Ejemplo de body (POST / PUT)

```json
{
  "id": 1,
  "name": "Buenos Aires",
  "full_name": "Provincia de Buenos Aires",
  "latitude": -34.6037,
  "longitude": -58.3816,
  "display_order": 1
}
```

> Para `POST` el campo `id` es ignorado (lo genera la DB). Para `PUT` es obligatorio.

---

## Dependencias

| Paquete            | Uso                                      |
|--------------------|------------------------------------------|
| `express`          | Framework HTTP                           |
| `cors`             | Middleware de CORS                       |
| `pg`               | Cliente PostgreSQL                       |
| `dotenv`           | Carga de variables de entorno            |
| `http-status-codes`| Constantes de códigos HTTP               |
| `nodemon`          | Hot-reload en desarrollo                 |
