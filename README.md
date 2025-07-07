`TODO: Add a nice screenshot of the app!`

# Cohort 51 final project - ELVA (Trip Planner)

This is the final project for the HackYourFuture curriculum we did as a cohort using the [MERN stack](https://www.mongodb.com/resources/languages/mern-stack) by following the agile methodology with our team and a group of mentors. A quick guide to what we built:

## 📝 Description
ELVA is a trip planning tool that helps travelers organize their trips by adding daily activities with details like name, location, price, ratings, notes, and photos, as well as an overall review and rating for each trip. It also allows users to copy existing trips and customize them to their preferences, making trip planning easier without needing to search across multiple apps for activity ideas along their chosen routes.

Main features: 
- Registration & Login
    - Includes "Forgot Password" functionality
- Browse Trips
    - View trip details
- Create Trip
    - Add cover photo
    - Organize by days and activities
    - Activity details include: Name, Location, Price, Rating, Notes, Photos
    - Add overall review and rating
- See Trip Map
    - Displays activity photos on the map
- Copy Trip
    - Duplicate an existing trip
- Add to Bookmarks
    - Save trips for later
- Edit Trip Details
    - Modify trip content
- Delete Trip / Trip Details
    - Remove trip or specific activities
- Manage Profile
    - Upload profile photo
- Trip Management Sections
    - View Published Trips
    - View Draft Trips
    - Access Bookmarks
- View Other Travellers’ Profiles
    - See their published trips

[Click here for the Demo version](https://c51c.hyf.dev/)

## 1. Setup

First, to setup all the directories run the following in the main directory:

`npm install`

`npm run setup`

The first command will install `cypress` and some small libraries needed for running the rest of the commands. The second will go into the `client` and `server` directories and set those up to be ran.

In the `client` and `server` directory there are two `.env.example` files. Create a copy and rename that to `.env`. Then follow the instructions in those files to fill in the right values.

To run the app in dev mode you can run the following command in the main directory:

`npm run dev`

## 2. Code structure

```
client
├── public
└── src
|   └── __tests__
|   └── __testUtils__
|   └── api
|   └── assets
|   └── components
|   └── context
|   └── hooks
|   └── pages
|       └── __tests__
|       └── components
|   └── util
|   index.jsx
cypress
|   └── fixtures
|   └── integration
|   └── plugins
|   └── support
server
└── src
    └── __tests__
    └── __testUtils__
    └── controllers
    └── db
    └── middleware
    └── models
    └── routes
    └── util
    └── validation
    index.js
```

### 2.1 Client structure

- `public` || public facing client code
- `__tests__` || any `jest` tests for specific components will be in a `__tests__` folder on the same level
- `__testUtils__` || any code that is only being used in the tests is put in the `__testUtils__` folder to separate that away from the rest of the code
- `api` || fetches user data by ID from the API
- `components` || all of our shared components that are used over multiple pages
- `context` || React Context providers for managing global auth, error, and loading state
- `hooks` || all of our custom hooks
- `pages` || the page components of our app, any routing will go between these components
- `pages/components` || components used specifically on those pages
- `util` || any utility functions that can be used anywhere on the client side
- `main.jsx` || the start point of the client
- `vite.config.js` || to configure vite

### 2.2 Cypress structure

- `fixtures` || any data/files that `cypress` needs can be placed here
- `integration` || all of our tests are in here, separated in folders based on the pages in our app
- `plugins` || any plugins for our `cypress` configuration can be placed here
- `support` || custom commands and other support files for `cypress` can be placed here

### 2.3 Server structure

- `__tests__` || any `jest` tests for the api endpoints as that is our testing strategy for the backend
- `__testUtils__` || any code that is only being used in the tests is put in the `__testUtils__` folder to separate that away from the rest of the code
- `controllers` || all of our controller functions that interact with the database
- `db` || all of our configuration for the database
- `middleware` || all of our middleware functions like auth, validation
- `models` || all of our `mongoose` models will be placed here
- `routes` || code to match up the API with our controllers
- `util` || any utility functions that can be used anywhere on the server side
- `validation` || all of our validation schemas for data
- `index.js` || the start point of the server

## 3. Stack / external libraries

The base stack of the app is a MERN stack (Mongoose, Express, React, Node). Next to that we make use of the following extras:

### 3.1 Configuration libraries

- `dotenv` || To load the .env variables into the process environment. See [docs](https://www.npmjs.com/package/dotenv)
- `vite` || To bundle our React app and create a static app to host. See [docs](https://vite.dev/)
- `husky` || To run our tests and linter before committing. See [docs](https://typicode.github.io/husky/#/)
- `eslint` || To check our code. We have different configurations for frontend and backend. You can check out the configuration in the `.eslintrc.(c)js` files in the respective `client` and `server` folders. See [docs](https://eslint.org/)
- `prettier` || To automatically format our code. See [docs](https://prettier.io/)
- `concurrently` || To run commands in parallel. See [docs](https://github.com/open-cli-tools/concurrently#readme)

For more information on how these work together including the automatic deployment to heroku, have a look at our detailed [DEV](./DEV.md) file.

### 3.2 Client-side libraries

- `@testing-library/*` || We use React Testing Library to write all of our tests. See [docs](https://testing-library.com/docs/react-testing-library/intro/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `jest-fetch-mock` || To mock out the backend for our testing purposes. See [docs](https://github.com/jefflau/jest-fetch-mock#readme)
- `prop-types` || To type-check our components. See [docs](https://github.com/facebook/prop-types)
- `tailwindcss` || To style our application using utility-first CSS. See [docs](https://tailwindcss.com/docs/installation)
- `leaflet` || To display interactive maps in our app. See [docs](https://leafletjs.com/reference.html)
- `react-icons` || To use popular icon sets as React components. See [docs](https://react-icons.github.io/react-icons/)
- `react-select` || To use customizable dropdown/select components. See [docs](https://react-select.com/home)

### 3.3 Server-side libraries

- `nodemon` || To automatically restart the server when in development mode. See [docs](https://nodemon.io/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `supertest` || To more easily test our endpoints. See [docs](https://github.com/visionmedia/supertest#readme)
- `mongodb-memory-server` || To mock out our database in our backend tests. See [docs](https://github.com/nodkz/mongodb-memory-server)
- `cors` || To open up our API. See [docs](https://github.com/expressjs/cors#readme)
- `mongoose` || To add schemas to our database. See [docs](https://mongoosejs.com/)
- `bcrypt` || To securely hash and compare passwords. See [docs](https://github.com/kelektiv/node.bcrypt.js#readme)
- `cookie-parser` || To parse cookies from incoming requests. See [docs](https://github.com/expressjs/cookie-parser)
- `googleapis` || To interact with Google services like OAuth. See [docs](https://github.com/googleapis/google-api-nodejs-client)
- `imagekit` || To handle image uploading, optimization, and CDN delivery. See [docs](https://imagekit.io/docs)
- `jsonwebtoken` || To generate and verify JSON Web Tokens for authentication. See [docs](https://www.npmjs.com/package/jsonwebtoken)
- `multer` || To handle multipart/form-data for file uploads. See [docs](https://www.npmjs.com/package/multer)
- `nodemailer` || To send emails from the server (e.g. for password resets). See [docs](https://nodemailer.com/about/)
- `uuid` || To generate unique IDs. See [docs](https://github.com/uuidjs/uuid)
- `zod` || To validate and parse server-side request data using schemas. See [docs](https://zod.dev/)
