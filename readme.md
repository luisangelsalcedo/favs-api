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

## [Repositorio](https://github.com/luisangelsalcedo/favs-api) &nbsp;&nbsp;|&nbsp;&nbsp; [Deploy](https://favs-api-luissg.herokuapp.com/) &nbsp;&nbsp;|&nbsp;&nbsp; [Frontend](https://github.com/luisangelsalcedo/favs-frontend)

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

1. **Download the project** by opening the terminal and executing the following command:
   ```
   git clone https://github.com/luisangelsalcedo/favs-api.git
   ```
2. **Get into the project directory** by executing the following command:
   ```
   cd favs-api
   ```
3. **Install all dependencies** by executing the following command:
   ```
   npm install
   ```
4. **Run the application** by executing the following command:
   ```
   npm run dev
   ```
5. Open the following URL <http://localhost:5000> in your browser.

   > If you have any questions, [contact us](https://mailto:seemc9@gmail.com)

## Documentation

You can find all the functionalities of the api documented in the following link: [Favs api documentation](https://documenter.getpostman.com/view/11240421/UyxdLpRF)

## Run tests

Set environment variables for tests:

- Create a file called **test.env**
- Use [reference](./.env.example)

Run the application in the test environment:

- Running the command: `npm run dev-test` to start the application in the test environment.
- Open another terminal
- Running the command: `npm run test` to run all the tests.

> Test endpoint **auth [user](./src/testing/user.test.js)**  
> ![](./public/img/test-user.png)

> Test endpoint **auth [favs](./src/testing/favs.test.js)**  
> ![](./public/img/test-favs.png)


