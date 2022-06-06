# nodejs-typescript-api
This is a simple currency exchange API with Nodejs and Typescript.

# Getting started

## Prerequisite
Node version `>14` installed.

## Install
Install project dependencies:
```js
npm install
```

## Run
Run project in developer mode:
```js
npm run dev
```

To exchange currency open below URL in browser:

http://localhost:3000/quote?baseCurrency=USD&quoteCurrency=EUR&baseAmount=200 

Run project in production mode (variables to be defined separately):
```js
npm run build
npm run start
```

## Helpful commands
Run eslint on project:
```js
npm run lint
```

Run eslint on project and fix issues:
```js
npm run lint:fix
```

Clean previous build and remove dependencies:
```js
npm run clean
```