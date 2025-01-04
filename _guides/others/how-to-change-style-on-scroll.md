# How to change style of header on scroll in Tailwind + NextJS

## Introduction

In this guide, we will learn how to change the style of the header on scroll in NextJS.

## Prerequisites

- Basic knowledge of NextJS
- Basic knowledge of CSS

## Getting Started

Let's create a new NextJS project using the following command:

```bash
npx create-next-app
```

## What we want?

We want to create a header component that will change its style when the user scrolls down the page. The background will be transparent initially, but when you scroll the page it will change itself to white.

The color of the text will change accordingly.

## Complete code

Now, open the project in your favorite code editor and create a new file called `Header.js` inside the `components` folder.

Now, add the following code inside the `Header.js` file:

```jsx
'use client'
import React, { useState, useEffect } from 'react'

const Header = () => {
  const [background, setBackground] = useState('bg-transparent')
  const [color, setColor] = useState('bg-white')

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setBackground('bg-white')
      setColor('text-primary')
    } else {
      setBackground('bg-transparent')
      setColor('text-white')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeColor)
    return () => window.removeEventListener('scroll', changeColor)
  }, [])

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 px-16 py-8 ${background} transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-between">
        <div className={`flex items-center ${color} text-3xl`}>Logo</div>
      </div>
    </nav>
  )
}

export default Header
```

In the above code, we have created a functional component called `Header`. Let's understand what we did here.

## Control the styles

We have created two state variables. These are utility values for tailwind css. Feel free to add more if you need more control.

```js
const [background, setBackground] = useState('bg-transparent')
const [color, setColor] = useState('bg-white')
```

Here,

`background`: Will control the background of the header.
`color`: Will control the color of the text.

## Change color function

Now, we have created a function called `changeColor` that will change the value of the `background` and `color` variables based on the `window.scrollY` value.

```js
const changeColor = () => {
  //here, 90 means 90 px. Feel free to change the scroll value
  if (window.scrollY >= 90) {
    setBackground('bg-white')
    setColor('text-primary')
  } else {
    setBackground('bg-transparent')
    setColor('text-white')
  }
}
```

## Register event listener

Then we have used the `useEffect` hook to register an event listener to the `scroll` event.

```js
useEffect(() => {
  window.addEventListener('scroll', changeColor)
  return () => window.removeEventListener('scroll', changeColor)
}, [])
```

## Return the header

Then, we have returned a `nav` element with some classes. We have used the `background` and `color` variables to set the background and color of the header.

```jsx
<nav className={`fixed left-0 right-0 top-0 z-50 px-16 py-8 ${background} transition-all duration-300 ease-in-out`}>
  <div className="flex items-center justify-between">
    <div className={`flex items-center ${color} text-3xl`}>Logo</div>
  </div>
</nav>
```

## Test it

Now, open the `pages/index.js` file and add the following code:

```jsx
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Header />
      <h1>Home</h1>
    </div>
  )
}
```

In the above code, we have imported the `Header` component and rendered it inside the `Home` component.

Now, if you run the app using the following command:

```bash
npm run dev
```

You will see that the header changes its style when you scroll down the page.

## Conclusion

That's it for today! Have a wonderful day!
