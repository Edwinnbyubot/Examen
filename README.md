# Examen - Aplicación MVC

Una aplicación web sencilla pero estética para gestionar estudiantes y sus calificaciones, desarrollada siguiendo el patrón MVC (Model-View-Controller).

## 🚀 Características

- **Patrón MVC**: Arquitectura organizada y mantenible
- **Diseño Responsivo**: Funciona en dispositivos móviles y desktop
- **Almacenamiento Local**: Los datos se guardan en localStorage
- **Interfaz Moderna**: Diseño con gradientes y animaciones
- **Validación de Datos**: Validación en tiempo real de formularios
- **Estadísticas**: Dashboard con métricas en tiempo real

## 🛠️ Estructura del Proyecto

```
Examen/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   └── style.css         # Estilos CSS
│   └── js/
│       ├── models/
│       │   └── AppModel.js   # Modelo de datos
│       ├── views/
│       │   └── AppView.js    # Vista/Interfaz
│       └── controllers/
│           └── AppController.js # Controlador
└── README.md                 # Este archivo
```

## 💻 Funcionalidades

### Dashboard
- Contador de estudiantes registrados
- Contador de exámenes completados
- Contador de estudiantes aprobados
- Animaciones de contadores

### Gestión de Estudiantes
- Agregar nuevos estudiantes
- Validación de datos (nombre, email, calificación)
- Visualización de lista de estudiantes
- Eliminación de estudiantes
- Calificaciones con códigos de colores

### Características Técnicas
- Persistencia de datos con localStorage
- Validación en tiempo real
- Animaciones CSS
- Responsive design
- Patrón MVC completo

## 🎯 Pasos para Subir a GitHub Pages

### 1. Crear un Repositorio en GitHub
```bash
# Inicializar git en el proyecto
git init

# Agregar archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: MVC Exam App"

# Conectar con repositorio remoto
git remote add origin https://github.com/TU_USUARIO/examen-app.git

# Subir a GitHub
git push -u origin main
```

### 2. Habilitar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. Busca la sección **Pages** en el menú lateral
4. En **Source**, selecciona **Deploy from a branch**
5. Selecciona la rama **main** 
6. Selecciona **/ (root)** como carpeta
7. Haz clic en **Save**

### 3. Acceder a tu Aplicación
- GitHub Pages generará una URL como: `https://TU_USUARIO.github.io/examen-app/`
- La aplicación estará disponible en unos minutos

### 4. Comandos Git Útiles
```bash
# Para actualizar cambios
git add .
git commit -m "Descripción de cambios"
git push

# Para crear una nueva rama
git checkout -b nueva-funcionalidad
git push -u origin nueva-funcionalidad

# Para cambiar entre ramas
git checkout main
git checkout nueva-funcionalidad
```

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en `assets/css/style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #28a745;
    --danger-color: #dc3545;
}
```

### Agregar Nuevos Campos
1. Actualiza el modelo en `AppModel.js`
2. Modifica la vista en `AppView.js`
3. Ajusta el controlador en `AppController.js`

## 📱 Compatibilidad

- ✅ Chrome/Edge (versión moderna)
- ✅ Firefox (versión moderna)
- ✅ Safari (versión moderna)
- ✅ Dispositivos móviles
- ✅ Tablets

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox/Grid
- **JavaScript ES6+**: Lógica de la aplicación
- **Font Awesome**: Iconos
- **localStorage**: Persistencia de datos
- **Patrón MVC**: Arquitectura de software

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

¡Desarrollado con ❤️ siguiendo las mejores prácticas de desarrollo web!
