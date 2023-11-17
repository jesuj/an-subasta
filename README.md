<div align="center">
<h1>🚀 AN-SUBASTA 🌠</h1>
<h2>Esta web sólo está creada para fines educativos. Aduana Nacional es el dueño de todos las imagenes del catalogo. Este proyecto no tiene ánimo de lucro y no se hace responsable del uso que se pueda hacer del mismo.</h2>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<h2><a href='#'>API</a> | <a href='#'>WEB</a></h2>
</div>

<details>
  <summary>Sumario</summary>
  <ol>
    <li>
      <a href="#descripción-del-proyecto">Descripción del proyecto</a>
    </li>
    <li>
      <a href="#tecnologías-usadas">Tecnologías usadas</a>
    </li>
    <li><a href="#api">API</a></li>
    <li><a href="#redes-sociales">Redes sociales</a></li>
		<li><a href="#estadísticas-acerca-del-autor">Estadísticas Acerca del Autor</a></li>
  </ol>
</details>

<!-- [![English](https://img.shields.io/badge/language-English-blue.svg)](README.en.md) -->

## Descripción del proyecto

Este proyecto tiene como objetivo crear una API y página web de la [Aduna Nacional Subasta](https://www.aduana.gob.bo/aduana7/subasta) con fines educativos.

La API proporciona acceso a datos de los catalogos de la subasta.

## Tecnologías usadas

Para recuperar los datos de la API, usamos _Web Scraping_, [Node.js](https://nodejs.org/es/), [Hono](https://honojs.dev/) y el servicio de hosting de APIs [Cloudflare Workers](https://workers.cloudflare.com/) para la construcción y el despliegue.

La página web está desarrollada con el framework [Astro](https://astro.build/) y utilizamos el framework [CSS Tailwind](https://tailwindcss.com/) para estilizar la interfaz de usuario. Además, hemos utilizado la librería [Cheerio](https://github.com/cheeriojs/cheerio) para realizar _Web Scraping_ y obtener datos de la **Aduna Nacional**.

<!-- Para probar y validar el funcionamiento de la aplicación, hemos utilizado la librería de pruebas [Vitest](https://vitest.dev/). -->

<!-- Si quieres ayudarnos, por favor toma un momento para leer el archivo [CONTRIBUTING.md](https://github.com/midudev/kings-league-project/blob/main/CONTRIBUTING.md). Allí encontrarás información útil sobre cómo contribuír de manera efectiva y cómo seguir nuestras guías de estilo. ¡Esperamos que disfrutes colaborando con nosotros! -->

## API

Los endpoints disponibles son:

- GET `/catalogs`: Devuelve todos los catalogos.
- GET `/catalogs/:id`: Devuelve un catalago.
- GET `/catalogs/:lote`: Devuelve un catalago de acuerdo al lote.

## Redes Sociales

¡Sígueme en mis redes para ver los proximos proyectos!

- [Linkedin](https://www.linkedin.com/in/angeloniterceros/)
- [Twitter](https://twitter.com/jesuz194)

## Estadísticas Acerca del Autor

<p>&nbsp;<img align="center" src="https://jordinodejs.vercel.app/api?username=jesuj&show_icons=true&locale=es&theme=calm" alt="midudev" /></p>

<p><img align="left" src="https://jordinodejs.vercel.app/api/top-langs?username=jesuj&show_icons=true&locale=es&layout=compact&theme=calm&langs_count=8&hide=php,coffeescript" alt="midudev" /></p>
