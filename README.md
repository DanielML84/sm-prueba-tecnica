# Prueba Técnica Full-Stack - SM Sistemas Medioambientales

Desarrollo de una solución Full-Stack compuesta por una API REST en Laravel y una Single Page Application (SPA) en React, cumpliendo con los requerimientos técnicos del proceso de selección.

## 🔗 Enlaces de Producción

* **Frontend (Vercel):** https://sm-prueba-tecnica.vercel.app
* **Backend API (Railway):** https://sm-prueba-tecnica-production.up.railway.app/api/posts
* **Repositorio:** https://github.com/DanielML84/sm-prueba-tecnica

---

## 🛠️ Decisiones Técnicas

1. **Arquitectura Desacoplada:** Se ha optado por separar Frontend y Backend. Esto facilita la escalabilidad, permite que diferentes perfiles trabajen en paralelo y mejora la seguridad al aislar la base de datos del cliente web.
2. **Backend (Laravel):** * Se ha utilizado el ORM Eloquent para el modelado relacional (Usuarios, Posts y Comentarios), garantizando la integridad referencial mediante claves foráneas.
   * La importación de la API externa (JSONPlaceholder) se ha diseñado utilizando el método `updateOrCreate`. Esto previene la duplicidad de registros en ejecuciones sucesivas, asegurando la idempotencia del Seeder.
   * Se ha implementado un manejo centralizado de respuestas JSON asegurando los códigos de estado HTTP correctos (200 OK, 201 Created, 404 Not Found, 422 Unprocessable Entity).
3. **Frontend (React + Vite):**
   * Estructura modular basada en componentes.
   * Consumo de la API externa mediante `axios`, configurado dinámicamente con variables de entorno para una transición transparente entre entornos de desarrollo y producción.
   * Implementación de estados de carga (loading) y validaciones básicas en el formulario de creación.

---

## 🚀 Pasos de Despliegue en Producción

El despliegue se ha realizado mediante plataformas PaaS conectadas directamente a la rama `main` del repositorio Git.

### Backend (Railway)
1. Provisión de un servicio de base de datos MySQL en Railway.
2. Creación de un servicio web para el directorio `backend-sm`.
3. Configuración de variables de entorno (`DB_HOST`, `DB_PASSWORD`, `APP_KEY`, etc.).
4. Ejecución de migraciones y llenado inicial de datos (`php artisan migrate:fresh --seed --force`).
5. Configuración de reglas CORS en Laravel para permitir peticiones desde el dominio del frontend en Vercel.

### Frontend (Vercel)
1. Importación del repositorio en Vercel apuntando al directorio raíz `frontend-sm`.
2. Configuración de la variable de entorno `VITE_API_URL` apuntando al endpoint público de Railway.
3. Compilación y despliegue automático.

---

## 💻 Instrucciones de Ejecución en Local

### Requisitos Previos
* PHP >= 8.1 y Composer
* Node.js y npm
* Servidor MySQL local

### 1. Configuración del Backend (Laravel)
En la terminal:
cd backend-sm
composer install
cp .env.example .env

Configura tus credenciales de base de datos locales en el archivo .env y ejecuta enla terminal:

php artisan key:generate
php artisan migrate --seed
php artisan serve

La API estará disponible en http://localhost:8000.

2. Configuración del Frontend (React)
Abre una nueva terminal y ejecuta:

cd frontend-sm
npm install

Asegúrate de tener un archivo .env en la raíz de frontend-sm con el siguiente contenido:
VITE_API_URL=http://localhost:8000/api

Ejecuta en la terminal: npm run dev

La aplicación web estará disponible en http://localhost:5173.