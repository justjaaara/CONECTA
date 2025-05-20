<div align="center">
  <img alt="Conecta - Optimización energética para el hogar" src="/public/conecta-logo.svg">
  <h1 align="center">CONECTA</h1>
</div>

<p align="center">
 Plataforma web para el monitoreo y optimización del consumo energético en el hogar
</p>
<p align="center">
<a href="conecta-rouge.vercel.app/">Enlace a producción</a>

</p>
<p align="center">
  <a href="#características"><strong>Características</strong></a> ·
  <a href="#tecnologías"><strong>Tecnologías</strong></a> ·
  <a href="#instalación"><strong>Instalación</strong></a> ·
  <a href="#uso"><strong>Uso</strong></a> ·
  <a href="#estructura-del-proyecto"><strong>Estructura</strong></a> ·
  <a href="#equipo-de-desarrollo"><strong>Equipo</strong></a>
</p>
<br/>

## Características

- **Monitoreo en tiempo real** del consumo energético de dispositivos en el hogar
- **Dashboard interactivo** con visualización de datos de consumo
- **Análisis por zonas** de la vivienda para identificar áreas de alto consumo
- **Recomendaciones personalizadas** para optimizar el consumo energético
- **Seguimiento histórico** del consumo para analizar tendencias
- **Autenticación segura** mediante email y contraseña
- **Interfaz de usuario moderna e intuitiva** adaptada a diferentes dispositivos

## Tecnologías

- **Frontend**:

  - [Next.js](https://nextjs.org/) - Framework de React con renderizado del lado del servidor
  - [React](https://reactjs.org/) - Biblioteca para interfaces de usuario
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
  - [Shadcn UI](https://ui.shadcn.com/) - Componentes de UI reutilizables
  - [Recharts](https://recharts.org/) - Biblioteca de visualización de datos
  - [ApexCharts](https://apexcharts.com/) - Gráficos interactivos

- **Backend**:

  - [Supabase](https://supabase.com/) - Plataforma de backend como servicio
  - [Supabase Auth](https://supabase.com/auth) - Autenticación y gestión de usuarios
  - [Supabase Database](https://supabase.com/database) - Base de datos PostgreSQL

- **Otros**:
  - [TypeScript](https://www.typescriptlang.org/) - Tipado estático para JavaScript
  - [Zod](https://zod.dev/) - Validación de esquemas
  - [React Hook Form](https://react-hook-form.com/) - Manejo de formularios

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/conecta.git
   cd conecta
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env.local` en la raíz del proyecto:

   ```
   NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-de-supabase
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Uso

1. **Registro e inicio de sesión**:

   - Regístrate con tu correo electrónico y contraseña
   - Verifica tu cuenta a través del enlace enviado al correo
   - Completa tu perfil con información personal

2. **Dashboard principal**:

   - Visualiza el consumo energético total
   - Analiza tendencias semanales
   - Identifica la zona de mayor consumo

3. **Monitoreo por zonas**:

   - Selecciona diferentes zonas del hogar
   - Visualiza el consumo de los dispositivos en cada zona
   - Recibe recomendaciones específicas para optimizar el consumo

4. **Informes y estadísticas**:
   - Genera informes personalizados de consumo
   - Compara períodos para identificar tendencias
   - Analiza el impacto de tus acciones en el consumo energético

## Estructura del proyecto

```
app/                   # Directorio principal de la aplicación Next.js
├── actions.ts         # Acciones del servidor para interactuar con Supabase
├── (auth-pages)/      # Páginas relacionadas con autenticación
├── protected/         # Páginas protegidas (requieren autenticación)
│   ├── dashboard/     # Dashboard de visualización de consumo energético
│   ├── home/          # Página principal del usuario
│   └── reports/       # Reportes y estadísticas
components/            # Componentes reutilizables
├── ui/                # Componentes de UI básicos
├── PowerChartComponent.tsx  # Componente para gráficos de consumo
└── ZoneDeviceSelector.tsx   # Selector de dispositivos por zona
types/                 # Definiciones de tipos TypeScript
utils/                 # Utilidades y funciones auxiliares
validations/           # Esquemas de validación para formularios
```

## Equipo de trabajo

Este proyecto fue desarrollado como parte del curso de Ingeniería de Proyectos I.

- [Felipe Villa Jaramillo](mailto:villajaramillofelipe4@gmail.com)
- [Juan Manuel Yepes]()
- [Isabella Ceballos]()
- [Juliana Ocampo]()

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo [LICENSE](LICENSE) para más detalles.
