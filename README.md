# RecetApp

##  básico y definición del proyecto

**RecetApp** es una aplicación web orientada a la creación de una comunidad digital para personas interesadas en la cocina. Su objetivo principal es facilitar el descubrimiento de recetas, fomentar la interacción entre usuarios y simplificar el proceso de preparación mediante la organización estructurada de ingredientes, pasos y sugerencias.

La aplicación busca resolver dos problemáticas principales:

* Falta de inspiración sobre qué cocinar.
* Dificultad para organizar ingredientes necesarios.

El sistema permite a los usuarios consultar recetas, visualizar su contenido detallado e identificar posibles sustitutos de ingredientes, haciendo más flexible la preparación de platillos.
---

## Tecnologías utilizadas

* **Backend:** ASP.NET Core (.NET 10)
* **Base de datos:** SQL Server
* **Documentación API:** Swagger (Swashbuckle)
* **Lenguaje:** C
* **UI:** Angular
---

## Modelo de datos

El sistema está basado en las siguientes entidades principales:

* Usuario
* Receta
* Ingrediente
* Paso
* Etiqueta
* Comentario

---

##  Funcionalidades principales (Back-End)

* Registro y gestión de usuarios.
* Creación y administración de recetas.
* Asociación de ingredientes con recetas.
* Gestión de pasos de preparación.
* Sistema de etiquetas para clasificación.
* Comentarios en recetas.
* Búsqueda de recetas por:

  * Ingredientes disponibles
  * Coincidencia parcial
  * Coincidencia exacta (incluyendo sustitutos)
---

## Búsqueda inteligente de recetas

El sistema permite:

* Encontrar recetas que coincidan con ingredientes disponibles.
* Considerar sustitutos de ingredientes definidos en la receta.
* Filtrar recetas que puedan realizarse completamente con los ingredientes del usuario.
---
##  Pruebas de la API

La API puede probarse mediante el navegador:

```
https://www.RecetApp.somee.com/{entidad}
```
*Api:* https://github.com/LuisRomanBQ/RecetApp_API.git

Desde ahí es posible ejecutar endpoints como:

* Obtener recetas
* Crear usuarios
* Filtrar recetas por ingredientes

---

## Estado del proyecto

Proyecto en desarrollo académico con enfoque en:

* Modelado de base de datos
* Implementación de lógica backend
* Diseño de FrontEnd

---

## Posibles mejoras futuras

* Sistema de autenticación (JWT)
* Favoritos y menús semanales
* Integración con supermercados

---

## Equipo

Proyecto desarrollado con fines académicos.

---

## Licencia

Uso educativo.
