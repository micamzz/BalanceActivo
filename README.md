#   Balance Activo - Curso React - Talento Tech

 **Sitio desplegado:** https://balanceactivo.netlify.app/

Balance Activo es una tienda online de artículos deportivos, desarrollada como proyecto final del curso de **React** de **Talento Tech**.

La aplicación permite a cualquier visitante navegar el catálogo, ver el detalle de cada producto, agregarlo al carrito y simular una compra (como usuario registrado o como invitado). Además, cuenta con un panel de administración privado donde el rol `admin` puede gestionar el catálogo de productos y los cupones de descuento.

### Tecnologías utilizadas
---

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![imgbb](https://img.shields.io/badge/imgbb-4285F4?style=for-the-badge&logoColor=white)

### Funcionalidades principales
---

- **Catálogo de productos**: listado y vista de detalle, con control de stock en tiempo real.
- **Carrito de compras**: agregar/quitar productos, aplicar cupones de descuento, y un checkout simulado (pago exitoso). El carrito se guarda de forma independiente para cada usuario.
- **Autenticación**: registro e inicio de sesión con email y contraseña (Firebase Authentication).
- **Roles de usuario**: los usuarios comunes solo pueden comprar; el rol `admin` accede además a los paneles de gestión.
- **Gestión de productos** (solo admin): alta, edición y baja de productos, con subida de imágenes.
- **Gestión de cupones** (solo admin): alta, edición y baja de cupones de descuento con fecha de vigencia.
- **Rutas protegidas**: las secciones de administración están restringidas por rol; un usuario sin permisos es redirigido a una pantalla de "No autorizado".
- **Diseño responsive**: adaptado para celulares, tablets y escritorio, con menú de navegación tipo hamburguesa en pantallas chicas.

###  Ingresar como administrador
---

Para probar el panel de gestión (productos y cupones), iniciá sesión con la cuenta de administrador:

- **Usuario:** `admin@gmail.com`
- **Contraseña:** *(solicitar al autor del proyecto)*

Con esta cuenta vas a ver las secciones "Gestión" y "Cupones" en el menú, que no aparecen para un usuario común. Cualquier otra cuenta que te registres desde "Registrarse" queda con permisos de usuario estándar (solo compra).

###  Cupón de prueba
---

Para probar el descuento en el carrito, hay un cupón ya cargado:

- **Código:** `TALENTOTECH`
- **Descuento:** 10%
- **Vigencia:** del 8 al 30 de julio de 2026


##  Instalación y ejecución en local
---

### Requisitos previos

- Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
- Tener una cuenta de [Firebase](https://firebase.google.com/) con un proyecto creado (con **Authentication** y **Firestore** habilitados).

### Pasos

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar las dependencias**

   ```bash
   npm install
   ```

3. **Configurar Firebase**

   El proyecto se conecta a Firebase a través de `src/firebase/config.js`. Si vas a usar tu propio proyecto de Firebase, reemplazá el objeto `firebaseConfig` de ese archivo con las credenciales de tu proyecto (Configuración del proyecto → Tus apps → SDK de Firebase, en la consola de Firebase).

   Además, necesitás:
   - Habilitar **Authentication → Sign-in method → Correo electrónico/contraseña**.
   - Crear la colección `usuarios` en **Firestore**, con un documento cuyo ID sea el UID del usuario administrador y un campo `rol: "admin"` (cualquier otro usuario que se registre queda con rol estándar automáticamente).

4. **Ejecutar el proyecto en modo desarrollo**

   ```bash
   npm run dev
   ```

   La aplicación va a estar disponible en `http://localhost:5173` (o el puerto que indique la terminal).

5. **Generar el build de producción** (opcional)

   ```bash
   npm run build
   npm run preview
   ```

   `npm run build` genera la carpeta `dist/` lista para subir a un servidor; `npm run preview` permite probar ese build localmente antes de desplegarlo.


