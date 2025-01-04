# Setting up a NextJS project with Tailwind CSS and Prettier

Today we will start by creating a new NextJS project with Tailwind CSS. Then we will configure ShandCN UI library to style our components.

## Create a new NextJS project

First, we need to create a new NextJS project. We can create a new NextJS project using the following command.

```bash
npx create-next-app@latest next-ease --typescript --tailwind --eslint
```

This will create a new NextJS project with TypeScript, Tailwind CSS, and Eslint.

## Install ShandCN UI

Let's install ShandCN UI in our project. We can install it using npm or yarn.

```bash
npx shadcn-ui@latest init
```

It will prompt you for the following. The defaults are mostly okay.

```sh
Would you like to use TypeScript (recommended)? no / yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › app/globals.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes
```

But be careful about the following question.

```sh
Where is your global CSS file? › › app/globals.css
```

Because if you are using `src` folder for your project you need to change it to `src/app/globals.css`. Othwerwise you will get 404 error for `globals.css` file.

## Use it

Now you are ready to use ShandCN UI in your project. You can import any component from `@shadcn/ui` and use it in your project.

```sh
npx shadcn-ui@latest add button
```

It will add a button component in your project. You can import it in your project and use it.

```js
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```

Now you can make any changes you want in the `tailwind.config.js` file and it will be reflected in your project.
