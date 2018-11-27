# Facebook Repository Viewer

the GitHub API.
Facebook repository viewer is a sample app based on React JS to demonstrate basic interaction with the application is built on V3 of the API rather than the GraphQL V4 because of some issues faced in sorting the results.

## About the Project

The project is created using create-react-app to minimize the setup work required. It uses Axios to handel API calls, and it uses Saga and Redux.

## Running the Project

Clone the repository then run npm install in order to install the dependencies, then the application can be started.

```shell
git clone https://github.com/BilalAlGhazi/github-repositories.git
cd github-repositories
npm install
npm run start
```

This will run the application in development mode usint the development server that comes as part os the react scripts.

## Building the Project

In order to generate the production build, run the `npm run build` command, this will generate the production static files required for distribution.