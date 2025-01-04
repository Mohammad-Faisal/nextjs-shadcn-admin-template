# Conditional styles in Tailwind CSS + Next.js

Tailwind CSS is a utility-first CSS framework that makes it easy to create responsive layouts and components. It's built on top of PostCSS, which means you can use it with any CSS preprocessor or build tool.

In this tutorial, I will show you how to do conditional styles in Tailwind CSS + Next.js.

## The Problem

Let's say I want to create a tag component that as two variant. Normal and Inverted.

Now I want to use this component in my application like this:

```jsx
<Tag>Normal</Tag>

<Tag inverted>Inverted</Tag>
```

So I go and create a reusable component.

```jsx
interface TagProps {
  title: string;
  inverted?: boolean;
}

const Tag = ({ title, inverted = false }: TagProps) => {
  return (
    <div
      className={`text-xs text-black p-2 rounded-sm ${
        inverted ? "bg-black text-white" : "text-black bg-gray-300"
      }`}
    >
      {title}
    </div>
  );
};
```

To make it reusable, I need to add some conditional styles:

```jsx
${inverted ? "bg-black text-white" : "text-black bg-gray-300"}
```

Now using string interpolation to style a component gets the job done but the code gets very ugly very quick.

## Solution

First let's install 2 packages.

```bash
npm install clsx tailwind-merge
```

## What are these packages?

`clsx` is a utility for constructing className strings conditionally. It's similar to classnames but smaller and with better TypeScript support.

`tailwind-merge` is a utility that allows you to merge two or more Tailwind classes together. This is useful for creating reusable styles that can be applied to multiple elements.

In tailwind css `px-2 and py-2` is equivalent to `p-2`. So we can use `twJoin` to merge the classes.

## Create the utility function

Create a new file called `utils.js` and add the following code:

```js
import clsx, { ClassValue } from "clsx";
import { twJoin } from "tailwind-merge";

export const cn = (...input: ClassValue[]) => {
  return twJoin(clsx(input));
};
```

This utility function will allow us to use Tailwind CSS classes in our components. It will also allow us to use Tailwind CSS with Next.js' built-in CSS modules.

## Let's use this

Now Let's refactor our component to use this utility function.

```jsx
import { cn } from "../utils";

interface TagProps {
  title: string;
  inverted?: boolean;
}

const Tag = ({ title, inverted = false }: TagProps) => {
  return (
    <div
      className={cn(
        "text-xs text-black p-2 rounded-sm",
        inverted ? "bg-black text-white" : "text-black bg-gray-300"
      )}
    >
      {title}
    </div>
  );
};
```

Now as you can see the `cn` function takes the conditional styles as arguments and merge them.

This makes the code much cleaner and easier to read.
