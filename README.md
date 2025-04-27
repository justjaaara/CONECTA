# Conecta

## Descripción del Proyecto

Conecta es una aplicación web moderna desarrollada con Next.js 15, utilizando las últimas características y mejores prácticas de desarrollo frontend.

## Tecnologías Utilizadas

- **Next.js 15.3.1**: Framework de React que permite renderizado del lado del servidor (SSR), generación estática y otras optimizaciones de rendimiento.
- **React 19**: Biblioteca JavaScript para construir interfaces de usuario.
- **TailwindCSS 4**: Framework de CSS utilitario para diseños rápidos y consistentes.
- **Shadcn/ui**: Componentes de interfaz de usuario reutilizables y personalizables construidos con Radix UI y estilizados con TailwindCSS.
- **Zod**: Biblioteca de validación de esquemas TypeScript-first para validar datos de formularios.
- **React Hook Form**: Biblioteca para manejo eficiente de formularios en React con validación y mejor rendimiento.
- **Turbopack**: Empaquetador de alta velocidad para mejorar los tiempos de desarrollo.
- **Geist Font**: Tipografía moderna y legible que proporciona una experiencia de usuario refinada.

## Estructura del Proyecto

```
src/
├── app/                       # Directorio principal de la aplicación (Next.js App Router)
│   ├── layout.js              # Diseño raíz que aplica en toda la aplicación
│   ├── page.js                # Página de inicio que redirige al login
│   ├── globals.css            # Estilos globales con configuración de Tailwind y temas
│   └── auth/                  # Módulo de autenticación
│       ├── sign-in/           # Componentes y página de inicio de sesión
│       └── sign-up/           # Componentes y página de registro
├── components/                # Componentes reutilizables
│   └── ui/                    # Componentes de interfaz de usuario (Shadcn)
│       ├── button.jsx         # Componente de botón estilizado
│       ├── form.jsx           # Componente de formulario
│       ├── input.jsx          # Componente de entrada
│       └── label.jsx          # Componente de etiqueta
├── lib/                       # Utilidades y funciones auxiliares
│   └── utils.js               # Funciones de utilidad generales
└── validations/               # Esquemas de validación usando Zod
    ├── SignInSchema.js        # Esquema para validar el formulario de inicio de sesión
    └── SignUpSchema.js        # Esquema para validar el formulario de registro
```

## Características Arquitectónicas Clave

### App Router de Next.js

El proyecto utiliza el sistema de enrutamiento basado en el sistema de archivos de Next.js (App Router), lo que permite una organización intuitiva y facilita las características como layouts anidados, carga de datos, y manejo de rutas.

### Sistema de Temas

La aplicación incluye un sistema de temas claro y oscuro implementado con variables CSS personalizadas, permitiendo una experiencia visual consistente y personalizable.

### Componentes Reutilizables con Shadcn

Los componentes de UI están construidos usando Shadcn, que proporciona componentes accesibles, personalizables y con un diseño consistente, basados en Radix UI y estilizados con TailwindCSS.

### Validación de Formularios

La combinación de React Hook Form con Zod proporciona una validación robusta y tipada de formularios, mejorando la experiencia del usuario y reduciendo errores.

### Optimización de Rendimiento

El uso de Turbopack durante el desarrollo y las optimizaciones incorporadas de Next.js garantizan tiempos de carga rápidos y una experiencia fluida para los usuarios.

## Instrucciones de Instalación y Ejecución

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/justjaaara/CONECTA.git
   cd conecta
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

4. **Construir para producción**:

   ```bash
   npm run build
   ```

5. **Iniciar en modo producción**:
   ```bash
   npm start
   ```

## Modo de desarrollo con Turbopack

Este proyecto está configurado para usar Turbopack en desarrollo para una experiencia de desarrollo más rápida:

```bash
npm run dev
```

## Linting

Para ejecutar el linter y verificar errores de código:

```bash
npm run lint
```

## Personalización de Componentes

Los componentes Shadcn se pueden personalizar modificando los archivos en `src/components/ui/`. Cada componente está diseñado para ser extensible y adaptable a las necesidades del proyecto.
