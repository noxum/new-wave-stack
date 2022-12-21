# NovaDB meets Remix - New Wave Stack

This remix stack contains components and api helpers to build a website maintained with NovaDB.

Learn more about [Remix Stacks](https://remix.run/stacks).

> **This stack is still in an early stage.**

## What's in the stack

-   Examples how to fetch NovaDB data using the Delivery Api endpoints
-   Some sample components and pages to get a feeling how NovaDb data could be fed to the Remix framework
-   Static Types with [TypeScript](https://typescriptlang.org)
-   Styling with [Tailwind](https://tailwindcss.com/)
-   Local third party request mocking with [MSW](https://mswjs.io)
-   Code formatting with [Prettier](https://prettier.io)
-   Linting with [ESLint](https://eslint.org)


## Quickstart

```
npx create-remix --template noxum/new-wave-stack
```

> *After the install phase, you will be asked for an Delivery Api endpoint. If you don't have one yet, just answer with **no**,
by default the app will use mocked data for all api requests. If you want to connect to a real NovaDB instance, please contact us.*

> *The api setup prompt does **not** support Windows yet*

## Development

-   Start dev server:

    ```sh
    cd <your project folder>
    npm run dev
    ```

This starts your app in development mode, rebuilding assets on file changes.


### Relevant code:

-   api settings are stored locally in `.env`.
    - **If you change the api endpoint here, please update the handlers too, otherwise the mocking won't take effect.**
-   helpers for accessing the Delivery API [./app/api/novaDb.ts](./app/api/novaDb.ts)
-   A set of components [./app/components](./app/components)
-   mock request handlers used by [MSW](https://mswjs.io) [./mocks/handlers.ts](./mocks/handlers.ts)

## Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

> The existing typings are still weak. We will replace them with auto-generated types in the future.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

### More to come

This is just the start, we will continuously improve this stack.  

- use of a code generator for typings 
- example to build a dynamic website based on a NovaDB sitemap tree
