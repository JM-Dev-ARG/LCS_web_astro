# Prompt para quien redacta los artículos del blog — La Chica del Seguro

Pegá este bloque completo al inicio de la conversación con Claude (o cualquier IA) antes de pedirle que redacte o formatee un artículo nuevo del blog.

---

Vas a redactar/formatear un artículo para el blog de **La Chica del Seguro**, un sitio Astro que guarda cada post como un archivo Markdown con frontmatter en `src/content/posts/{slug}.md`. El resultado final tiene que ser un archivo `.md` completo, listo para pegar en esa carpeta sin que nadie tenga que corregirlo. Seguí estas reglas exactamente, sin excepciones:

## 1. Frontmatter obligatorio

El frontmatter usa estas claves (y solo estas, no inventes ni agregues otras):

```yaml
---
id: <número>
title: "<ver punto 8>"
description: "<ver punto 9>"
date: "<D/Mes/YYYY>"
author: "<ver punto 4>"
imgAuthor: "<ver punto 4>"
img: "<ver punto 3>"
altImg: "<ver punto 5>"
imgAuthorAlt: "<ver punto 4>"
categories: ["<ver punto 10>"]
tags: ["<ver punto 10>"]
---
```

⚠️ **La clave se llama `description`, en inglés, NUNCA `descripción` con tilde.** Este es el error más común y el que más rompe: si la escribís mal, el sitio no valida el post y el build falla. Revisala dos veces antes de entregar.

`authorDescription` es opcional y solo se usa para Mariel Adaro (ver punto 4).

## 2. Nombre de archivo = slug del artículo

- El nombre del archivo (sin `.md`) arma la URL final del post: `lachicadelseguro.com/blog/{slug}`.
- Formato: kebab-case, todo en minúscula, sin tildes ni caracteres especiales (ñ → n, á → a, etc.), corto y descriptivo — 3 a 8 palabras que resuman el tema central. NO uses el título completo palabra por palabra si es largo.
- Ejemplo: título *"Por qué 'el seguro más barato' casi siempre termina siendo el más caro"* → slug `por-que-el-seguro-mas-barato-termina-siendo-el-mas-caro`.
- Definí el slug primero: se reutiliza también para el nombre de la imagen de portada (punto 3).

## 3. Imagen de portada (`img`)

- Siempre: `img: "/img/blog/{slug}.avif"`, usando el **mismo slug exacto** del nombre de archivo (punto 2).
- La imagen todavía puede no existir en el momento de redactar el `.md` — no importa, se sube después con ese mismo nombre. Nunca inventes otra ruta ni otra extensión.
- Si entregás también la imagen de portada como archivo aparte, nombrala igual: `{slug}.avif` (o `.jpg`/`.png` si no la convertiste a avif — avisá el formato real).

## 4. Foto y firma del autor (depende de quién firma)

Hoy hay solo dos autoras posibles. Usá EXACTAMENTE estos bloques, sin modificar nada:

**Si firma Micaela Tissieres:**
```yaml
author: "Micaela Tissieres - La Chica del Seguro"
imgAuthor: "/img/img_academia/micaela.avif"
imgAuthorAlt: "Foto de La Chica del Seguro"
```
(no agregues `authorDescription`)

**Si firma Mariel Adaro:**
```yaml
author: "Mariel Adaro - La Doc del Seguro"
imgAuthor: "/img/img_academia/mariel.avif"
imgAuthorAlt: "Foto de La Doc del Seguro"
authorDescription: "Abogada, periodista y docente especialista en Seguros"
```

Si te piden un artículo firmado por alguien que no sea ninguna de las dos, preguntá antes cuál es la ruta de la foto y el texto de firma — no inventes un patrón nuevo.

## 5. `altImg` (texto alternativo de la imagen de portada)

- Describe lo que **se ve** en la imagen de portada (para accesibilidad/SEO), no repite el título del artículo.
- Ejemplo correcto: `"Balanza entre un escudo de protección y una alcancía, representando la diferencia entre seguro de vida y seguro de retiro"`.
- Ejemplo incorrecto (no hacer esto): repetir el título tal cual como alt.

## 6. `date` (formato y orden)

- Formato exacto: `D/Mes/YYYY`, en español, con el mes en mayúscula inicial y el día SIN cero adelante. Ejemplos válidos: `"1/Julio/2026"`, `"22/Junio/2026"`.
- Si te piden **un solo artículo puntual**: usá la fecha real de publicación que te indiquen (o la fecha de hoy si piden "publicar ya").
- Si te piden **una tanda de varios artículos sin fecha real** (para llenar el calendario editorial): las fechas se asignan en cadencia de **lunes y miércoles**, arrancando en el primer lunes o miércoles disponible después de la fecha del último post ya publicado, uno por artículo, en el mismo orden en que te los pasan.

## 7. `id`

- Es un número entero, no se puede repetir con ningún post existente.
- **Antes de asignar un id, preguntame (o preguntale a quien te encargó el artículo) cuál es el id más alto usado hasta ahora** — este dato cambia cada vez que se agrega contenido nuevo, así que no asumas un número fijo. Asigná `id` = ese máximo + 1 (y +2, +3... si son varios artículos en la misma tanda).

## 8. `title`

- Largo objetivo: **45 a 95 caracteres** (contando espacios y signos). Por debajo de 45 suena pobre, por arriba de 95 se corta feo en el listado del blog y en Google.
- Estructura que usa la casa, elegí la que mejor calce con el tema:
  - **Concepto + ángulo**, separados por dos puntos: `"Cómo leer una póliza sin ser abogado: las 10 cláusulas que nadie lee y deberían"`, `"Historia del seguro en Argentina: de las mutuales de inmigrantes al mercado actual"`.
  - **Listicle con número** cuando el artículo es una lista de pasos/ítems: `"3 formas de cobrar un siniestro en tiempo récord"`, `"...las 10 cláusulas que nadie lee..."`.
  - **Mito/creencia entre comillas + explicación**, cuando el artículo desarma una idea instalada: `"El mito de \"a mí no me va a pasar\": la psicología detrás de no asegurarse"`.
  - **Pregunta directa**, cuando conecta con una situación cotidiana del lector: `"¿Manejás para Uber o Cabify como un \"extra\"?"`.
- Si el título lleva comillas dobles adentro (para citar una frase o creencia), escapalas con `\"` porque el título va entre comillas dobles en YAML. Ejemplo: `title: "Por qué \"el seguro más barato\" casi siempre termina siendo el más caro"`.
- El título tiene que dejar clara la keyword/tema principal en los primeros 4-5 términos (SEO): no arranques con relleno tipo "Sobre cómo..." o "Algunas ideas sobre...".

## 9. `description`

- Es el resumen que se usa como meta description (SEO/redes) y también se muestra en la card del listado del blog. Largo objetivo: **120 a 155 caracteres**, 1 o 2 oraciones. No hace falta forzarlo si el tema pide un poco más, pero no te vayas de rango como en `"Cuando elegiste una aseguradora con solvencia y liquidez..."` (300+ caracteres) — eso es un ejemplo de lo que **no** hay que hacer.
- No repitas el título palabra por palabra: reformulalo agregando el "para qué le sirve al lector" — la promesa concreta de leer el artículo.
- Fórmula que funciona bien: `[Tema/keyword principal] + : + [qué va a entender o lograr el lector después de leerlo]`.
- Ejemplos reales que cumplen el objetivo:
  - `"Aprendé a leer una póliza de seguro sin ser abogado: las 10 cláusulas clave que definen si vas a cobrar tu siniestro sin problemas."` (134 caracteres)
  - `"Penetración de seguros en Argentina: por qué asegura menos que la región y qué significa esta brecha para tu protección financiera."` (136 caracteres)
  - `"Por qué asegurarse es un acto de amor y no de miedo: un cambio de enfoque cultural para entender el verdadero valor de un seguro."` (130 caracteres)

## 10. `categories` y `tags`

### Categorías: usá una taxonomía fija, no inventes una nueva por post

El blog organiza el contenido en **pilares editoriales**. Cada pilar son 2 valores fijos en `categories` (pilar + sub-tema), y hoy existen exactamente estos dos:

```yaml
# Pilar 1 — contenido de educación financiera básica (glosario, cómo leer una póliza, cómo comparar, etc.)
categories: ["Educación Financiera con Seguros", "Fundamentos y alfabetización"]

# Pilar 2 — contenido sobre la cultura/psicología de asegurarse y el mercado argentino
categories: ["Conciencia Aseguradora", "Baja penetración y cultura del seguro"]
```

- Si el artículo nuevo encaja en uno de estos dos pilares, **copiá el array tal cual**, no lo reformules ni cambies mayúsculas/tildes.
- Si el tema no encaja en ninguno de los dos (por ejemplo, seguros de auto, siniestros, legales/regulatorio, tecnología aplicada), **preguntá antes de inventar un pilar nuevo** — proponé el nombre del pilar + sub-tema y esperá confirmación, para no terminar con una tercera categoría suelta que nadie más vuelve a usar.
- Vas a ver posts viejos con categorías sueltas en minúscula (`["seguros", "información"]`) o vacías (`categories: []`): son de antes de que existiera esta taxonomía — no los tomes como modelo a seguir.

### Tags: libres, pero concretos

- 3 a 5 tags por artículo, en minúscula salvo siglas o nombres propios (`SSN`, `PAS`, `Ley 17.418`, `LATAM`, `Argentina`).
- Tienen que ser específicos del contenido del artículo (términos, conceptos o entidades que aparecen en el texto), no una repetición de las categorías ni palabras genéricas tipo "seguros" o "información" sueltas.
- Ejemplos reales: `["prima", "suma asegurada", "franquicia", "deducible", "glosario de seguros"]`, `["psicología del seguro", "sesgo de optimismo", "cultura aseguradora", "prevención"]`.

## 11. Cuerpo del artículo

- Markdown estándar, con subtítulos `##` para las secciones.
- Tono cercano, directo, en español rioplatense, con la voz de la autora correspondiente (Micaela: más conversacional/de opinión; Mariel: más técnico-legal).
- Cerrar siempre con un párrafo/CTA invitando a compartir el artículo.

## 12. Checklist final antes de entregar cada artículo

- [ ] `description` (no `descripción`)
- [ ] `id` único, confirmado como el próximo disponible
- [ ] nombre de archivo = slug corto en kebab-case
- [ ] `img` = `/img/blog/{slug}.avif` con el mismo slug del archivo
- [ ] `imgAuthor` / `imgAuthorAlt` / `author` (y `authorDescription` si corresponde) según la autora exacta
- [ ] `altImg` describe la imagen, no repite el título
- [ ] `date` en formato `D/Mes/YYYY`, respetando el orden/cadencia si es una tanda
- [ ] `title` entre 45-95 caracteres, con la keyword principal al frente
- [ ] `description` entre 120-155 caracteres, sin repetir el título palabra por palabra
- [ ] `categories` = uno de los dos pilares fijos (o confirmado con quien encarga si es un pilar nuevo)
- [ ] `tags` (3-5) específicos del contenido, no genéricos ni duplicados de las categorías

Entregá el resultado como un bloque de código Markdown completo (frontmatter + cuerpo), listo para guardar directamente como `src/content/posts/{slug}.md`.
