# 🌐 Sitio Web de La Chica del Seguro

Este es el repositorio oficial del sitio web de **La Chica del Seguro**, una aplicación web construida con Astro. La Chica del Seguro es una página web para una empresa de asesoramiento de seguros.

## ![Captura del sitio](https://lcs-astro.netlify.app/img/lcs_web.png) <!-- No se pudo encontrar una imagen de captura de pantalla del sitio, se recomienda actualizar esta URL -->

## 🚀 Estructura del Proyecto

El proyecto sigue la estructura estándar de una aplicación Astro.

```text
/
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

- `public/`: Contiene todos los activos estáticos como imágenes, fuentes y logos.
- `src/`: Contiene el código fuente de la aplicación.
- `src/components/`: Contiene componentes reutilizables de Astro y React.
- `src/content/`: Contiene colecciones de contenido, como posts de blog y términos.
- `src/layouts/`: Contiene los layouts de página de Astro.
- `src/lib/`: Contiene utilidades y funciones para el envío de correos y la interacción con bases de datos.
- `src/pages/`: Contiene las páginas del sitio, incluyendo páginas de servicios, blog y endpoints de API.
- `astro.config.mjs`: Archivo de configuración principal de Astro.
- `tailwind.config.mjs`: Archivo de configuración para Tailwind CSS.
- `package.json`: Lista las dependencias y scripts del proyecto.

---

## ✨ Características

- **Vitrina de Servicios**: Presentación detallada de los servicios ofrecidos.
- **Blog**: Sección de blog con posts en formato Markdown.
- **Formulario de Contacto**: Formularios de contacto para solicitar información y servicios.
- **Diseño Responsivo**: El sitio web es completamente responsivo.
- **Animaciones**: Animaciones sutiles al hacer scroll, implementadas con AOS (Animate On Scroll).
- **Notificaciones**: Alertas personalizadas con SweetAlert2.
- **Múltiples proveedores de correo**: Integración con MailerLite, MailerSend y Mailgun para el envío de correos.

---

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando           | Acción                                                     |
| :---------------- | :--------------------------------------------------------- |
| `npm install`     | Instala las dependencias                                   |
| `npm run dev`     | Inicia el servidor de desarrollo local en `localhost:4321` |
| `npm run build`   | Compila el sitio de producción en la carpeta `./dist/`     |
| `npm run preview` | Previsualiza la compilación localmente, antes de desplegar |

---

## 👀 Stack Tecnológico & Dependencias

- **Framework**: [Astro](https://astro.build/)
- **UI Framework**: [React](https://react.dev/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Despliegue**: [Netlify](https://www.netlify.com/)
- **Animaciones**: [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
- **Email**: [MailerLite](https://www.mailerlite.com/), [MailerSend](https://www.mailersend.com/), [Mailgun](https://www.mailgun.com/)
- **Alertas**: [SweetAlert2](https://sweetalert2.github.io/)
- **Typescript**

---

## 📸 Demo

🔗 [Ver sitio en producción](https://lachicadelseguro.com/)

---

## 📄 Licencia

Este proyecto es privado y fue desarrollado para **La Chica del Seguro**.

---

## 🙌 Agradecimientos

- A [Astro](https://astro.build) por hacer el desarrollo web más simple y rápido.
- A la comunidad de [Tailwind CSS](https://tailwindcss.com) por su enfoque moderno de estilos.
- A [React](https://react.dev/) por su ecosistema de componentes.
