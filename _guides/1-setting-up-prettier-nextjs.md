# Setting up Prettier in a Nextjs Project

Today we will learn how to setup NextJs project with Prettier.

## What is Prettier?

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

## Why Prettier?

Prettier is a code formatter that helps you to format your code in a consistent way. It is very easy to setup and use. It is very useful when you are working in a team. It helps you to avoid unnecessary conflicts in your code.

## How to setup Prettier in a NextJS Project?

First, we need to install Prettier in our project. We can install it using npm or yarn.

```bash
yarn add prettier --dev --exact
```

## Configure with Eslint

As we are using Eslint in our project already we need to install `eslint-plugin-prettier` and `eslint-config-prettier` as well.

```bash
yarn add eslint-plugin-prettier eslint-config-prettier --dev
```

Next, we need to add `prettier` to the `plugins` section of our `.eslintrc` file.

```json
{
  "extends": ["prettier"]
}
```

## Create a configuration file for Prettier

Next, we need to create a configuration file for Prettier. We can create a file named `.prettierrc` in the root of our project. We can also create a file named `prettier.config.js` in the root of our project.

```json
{
  "semi": false,
  "singleQuote": true
}
```

This is the basic configuration for Prettier. We can add more configuration options to this file.

## Sort tailwind classes with Prettier

If you are using Tailwind CSS in your project you can sort the Tailwind classes with Prettier. This is [recommended by the Tailwind CSS team](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)

To do that we need to install `prettier-plugin-tailwind` in our project.

```bash
npm install --save-dev prettier-plugin-tailwindcss
```

or

```bash
yarn add prettier-plugin-tailwindcss --dev
```

Next, we need to add `prettier-plugin-tailwind` to the `plugins` section of our `.prettierrc` file.

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

So Now it will look like the following

```json
{
  "semi": false,
  "singleQuote": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```
