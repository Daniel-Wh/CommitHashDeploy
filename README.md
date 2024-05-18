# Commit Hash Deploy

This project is an example of one of my favorite deploy strategies for SPAs. 

Single Page Applications can be served as static files and this project is an example of how to build, test, deploy, and route to
a specific build of a SPA. This can be utilized for validating code changes in CI as shown in this repo or for easy roll back or deploy actions
or for A/B testing a build in a production environment or validate UI changes with production data.

## How it works

This example relies on knowledge of the following AWS services: S3, Cloudfront, Lambda Edge, and Route 53

We'll start with what happens when you host a static site (SPA or otherwise) on S3.

A call is made from a client which first hits Route 53, which is pointing at a Cloudfront distribution, which is subsequently pointing at
your S3 bucket. After the call is resolved, the page loads with the content of your S3 bucket.

In this project there are two entry points in that process that let us route to a specific build. 

### Build

When a pr is made and the code changes successfully build, lint, and clear unit tests, a copy of that build is stored in S3 using the
following folder structure: `/myproject/this_pr_commit_hash/build_content`

When that pr is succesfully merged into develop another deploy step kicks off which results in a new entry in the following folder structure: 
`/myproject/develop/build_content`

### Routing

In this repo is the code for the Lambda Edge function which is triggered by the Cloudfront Distribution when an origin request call comes from
a client. In none AWS lingo, when the server is hit by the front end, it must first decide which build to return.

The routing logic first must parse the request and point it to the develop build env. The develop branch is using the cloudfront distribution set for dev.devopswithme.net the staging environnent will hit staging.deveopswithme.net 

Then the routing logic checks for a `X-source` cookie, if the cookie exist, it will replace the key `develop` with the commit hash parsed from the `X-source` cookie.
This exchange is how, by adding a `X-source` cookie to the browser, we can dynamically serve a different build at dev.devopswithme.net

There is logic to allow for passthrough of files needed for the app

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
