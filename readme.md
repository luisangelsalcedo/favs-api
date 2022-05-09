# Favs api

<div>
<img src="https://img.icons8.com/fluency/32/000000/node-js.png"/>&nbsp;&nbsp;
<img src="https://camo.githubusercontent.com/6686b9ef0e21e13c9e7c846340303765c0f36e40a0490bcad453ea9d0d433ea0/68747470733a2f2f7777772e6d656d656e746f746563682e696e2f6173736574732f696d616765732f69636f6e732f657870726573732e706e67" width='30'/>&nbsp;&nbsp;
<img src="https://img.icons8.com/color/32/000000/mongodb.png"/>&nbsp;&nbsp;
<img src="https://mongoosejs.com/docs/images/favicon/ms-icon-144x144.png" width='28'/>&nbsp;&nbsp;&nbsp;
<img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" width='28'/>&nbsp;&nbsp;
<img src="https://img.icons8.com/color/32/000000/java-web-token.png"/>&nbsp;&nbsp;
<img src="https://img.stackshare.io/package/19054/default_2be036aaca5c71baf790e00f1ef80dd37a625905.png" width='28'/>&nbsp;&nbsp;
<img src="https://progsoft.net/images/ejs-icon-bccf3f017751a71ee75c69021ee1020fc0d9067e.jpg" width='28'/>&nbsp;&nbsp;
<img src="https://img.icons8.com/color/32/000000/bootstrap.png"/>&nbsp;&nbsp;
<img src="https://iconape.com/wp-content/png_logo_vector/jest-logo.png" width="26"/>&nbsp;&nbsp;
<img src="https://img.icons8.com/color/32/000000/heroku.png"/>&nbsp;&nbsp;
</div>

## [Repositorio](https://github.com/luisangelsalcedo/bootcamp-challenges/tree/main/assesment2/favs-backend) &nbsp;&nbsp;|&nbsp;&nbsp; [Deploy](https://favs-backend.herokuapp.com/)

<br>
<img src="./public/img/screenshot.jpg"/>
<br>

## Requirements

As minimum requirements you need to have installed:

- [node.js](https://nodejs.org/download/release/v16.13.0/) version 16.13.0 or higher.
- npm version 8.1.4 or higher.

Set environment variables:

- Create a file called **dev.env**
- Use [reference](./.env.example)

## Project Installation:

1. **Download the project** by opening the terminal and running the following command:
   ```
   git clone https://github.com/luisangelsalcedo/favs-api.git
   ```
2. **Get into the project directory** by running the following command:
   ```
   cd favs-api
   ```
3. **Install all dependencies** by running the following command:
   ```
   npm install
   ```
4. **Run the application** by executing the following command:
   ```
   npm run dev
   ```
5. Open the following URL <http://localhost:5000> in your browser.

   > If you have any questions, [contact us](mailto://seemc9@gmail.com)

## Documentation

You can find all the functionalities of the api documented in the following link: [Favs api documentation](https://documenter.getpostman.com/view/11240421/UyxdLpRF)

<br><br><br>

---

## Questions

### 1. Indicate which are the parts of the following url: `https://backend.mega-app.com.co:8080/api/articles/search?docid=1020&hl=en#dayone`

   <img src="./public/img/url-screenshot.png"/>

- 1 - Protocolo (`https://`)
- 2 - Subdominio (`backend.`)
- 3 - Dominio (`mega-app`)
- 4 - Dominio de alto nivel generico - gTLD (`.com`)
- 5 - Dominio de alto nivel con código de país - cTLD (`.co`)
- 6 - Puerto (`:8080`)
- 7 - Path (`/api/articles/search`)
- 8 - Query string (`?docid=1020&hl=en`)
- 9 - Fragmento / Etiqueta (`#dayone`)
- 10 - Host (`backend.mega-app.com.co`)

---

### 2. Define what is a Web API, Restful and what are the statusCode 200-, 400-, 500-

- Un Web API es un tipo de API que utiliza el protocolo HTTP como forma de comunicación.
- Restful es la implementación de la arquitectura Rest para conectar varios sistemas basados en el protocolo HTTP.
- StatusCode `200`: La solicitud ha tenido éxito.
- StatusCode `400`: Esta respuesta significa que el servidor no pudo interpretar la solicitud dada una sintaxis inválida.
- StatusCode `500`: El servidor ha encontrado una situación que no sabe cómo manejarla.

---

### 3. When we talk about `CRUD`, what does it mean?

El CRUD se refiere a un acrónimo formado por las primeras letras de las cuatro operaciones más importantes para la creación y gestión de una base de datos.

Sirve para crear (`create`), leer (`read`), actualizar (`update`) y eliminar (`delete`) información usando los verbos de HTTP.

---
