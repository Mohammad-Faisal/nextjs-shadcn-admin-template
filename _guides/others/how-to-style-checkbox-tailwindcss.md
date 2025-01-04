# How to style a checkbox in Tailwind CSS and NextJS

## Introduction

In this guide, we will learn how to style a checkbox in Tailwind CSS.

## The problem

Styling a checkbox is not as straightforward as styling a button. The checkbox is a native HTML element and it is not possible to style it directly. We need to use a workaround to style it.

## The solution

First, install the tailwind forms plugin.

```bash
npm install @tailwindcss/forms
```

Then, add the plugin to your `tailwind.config.js` file.

```js
module.exports = {
  // ...
  plugins: [require('@tailwindcss/forms')]
}
```

We will use the `appearance-none` class to remove the default appearance of the checkbox.

Then we will use the `checked:bg-blue-600` class to change the background color of the checkbox when it is checked.

```html
<input type="checkbox" className="checked:bg-blue-600 focus:ring-0" />
```

## Conclusion

In this guide, we learned how to style a checkbox in Tailwind CSS. The magic is done by the `@tailwindcss/forms` plugin.
