# La Chica del Seguro — Convenciones del blog

Reglas para crear o normalizar posts en `src/content/posts/*.md` (colección `posts`, schema en `src/content/config.ts`). Aplicar siempre que se redacte, importe o corrija un artículo de blog, sin necesidad de que se pida explícitamente.

## 1. Campo `description` (no `descripción`)

El schema exige la clave en inglés `description`. **Nunca** escribir `descripción` (con tilde) en el frontmatter: Zod no reconoce esa clave, el campo queda vacío/inválido y rompe el build silenciosamente. Doble check antes de terminar: `grep -n "^descripción:" src/content/posts/*.md` debe devolver vacío.

## 2. Nombre de archivo = slug del artículo

- El nombre del archivo (sin `.md`) es el `slug` que arma la URL final: `/blog/{slug}`.
- Formato: kebab-case, sin tildes ni caracteres especiales, corto y descriptivo (3–8 palabras que capturen el tema central), NO el título completo palabra por palabra si es muy largo.
- Ese mismo slug es el que se usa para nombrar la imagen de portada (ver punto 4). Definir el slug primero y reusarlo en todos lados.
- Ejemplo: título "Por qué 'el seguro más barato' casi siempre termina siendo el más caro" → slug `por-que-el-seguro-mas-barato-termina-siendo-el-mas-caro`.

## 3. `id`

- Es un número (`z.number()`), no debe repetirse.
- Antes de asignar uno nuevo, revisar el `id` más alto entre **todos** los `.md` existentes en `src/content/posts/` (no asumir un valor de memoria, puede haber cambiado) y continuar desde ahí (`max + 1`, `max + 2`, ...).
- Comando rápido: `grep -h "^id:" src/content/posts/*.md | sort -t: -k2 -n`

## 4. Rutas de imagen (dependen del autor)

### Imagen de portada del artículo (`img`)
- Siempre: `/img/blog/{slug}.avif` (mismo slug que el nombre de archivo del post, ver punto 2).
- Si la imagen todavía no fue subida por el usuario, igual dejar la ruta con ese nombre esperado — el usuario sube el archivo después y ya va a coincidir sin tocar el `.md` de nuevo.

### Foto y firma del autor (`imgAuthor`, `imgAuthorAlt`, `author`)
Solo hay dos autoras posibles hoy. Usar exactamente estos valores según quién firme:

**Micaela Tissieres**
```yaml
author: "Micaela Tissieres - La Chica del Seguro"
imgAuthor: "/img/img_academia/micaela.avif"
imgAuthorAlt: "Foto de La Chica del Seguro"
```
(sin `authorDescription`, salvo que se indique lo contrario)

**Mariel Adaro**
```yaml
author: "Mariel Adaro - La Doc del Seguro"
imgAuthor: "/img/img_academia/mariel.avif"
imgAuthorAlt: "Foto de La Doc del Seguro"
authorDescription: "Abogada, periodista y docente especialista en Seguros"
```

Si en algún momento se suma una tercera autora/autor, preguntar el patrón exacto (foto en `/img/img_academia/`, alt de firma de marca) antes de inventar uno nuevo.

## 5. `altImg` (alt de la imagen de portada)

- Describe el **contenido visual** de la imagen de portada, no repite el título del artículo.
- Debe ser útil para accesibilidad/SEO: qué se ve en la imagen, no de qué habla el texto.
- Ejemplo: `"Balanza entre un escudo de protección y una alcancía, representando la diferencia entre seguro de vida y seguro de retiro"`.

## 6. `date`

- Formato: `D/Mes/YYYY` en español, mes con mayúscula inicial, sin cero a la izquierda en el día. Ejemplos válidos: `"1/Julio/2026"`, `"22/Junio/2026"`.
- Publicación de un solo artículo puntual: usar la fecha real que indique el usuario (o la fecha de hoy si pide "publicar ahora").
- Importación de un lote de artículos sin fecha real (backfill): asignar fechas en cadencia lunes/miércoles, empezando el primer lunes o miércoles disponible **después** de la fecha del último post ya publicado (revisar `date` más reciente entre los posts existentes), en el mismo orden en que se listan los artículos a publicar.

## 7. Checklist final antes de dar por terminado un post

- [ ] `description` (no `descripción`)
- [ ] `id` único, mayor a todos los existentes
- [ ] nombre de archivo = slug corto en kebab-case
- [ ] `img` = `/img/blog/{slug}.avif` (mismo slug que el archivo)
- [ ] `imgAuthor` / `imgAuthorAlt` / `author` según la autora correspondiente (punto 4)
- [ ] `altImg` describe la imagen, no repite el título
- [ ] `date` en formato `D/Mes/YYYY`
- [ ] correr `npx astro build` (o al menos revisar visualmente el frontmatter) para confirmar que no rompe el schema
