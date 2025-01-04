# How to style React Select dropdowns

React Select is a popular dropdown component for React. It's easy to use, but it's not easy to style.

In this guide, we'll show you how to style React Select dropdowns.

## Step 1: Install React Select

First, install the React Select package:

```sh
yarn add react-select
```

## Step 2: Import React Select

Next, import the Select component:

```jsx
import Select from 'react-select'
```

## Step 3: Use React Select in your JSX

Finally, use the Select component in your JSX:

```jsx
<Select options={options} onChange={handleChange} />
```

## Step 4: Create the style

You can customize the items of your dropdown by creating a custom style. Here's an example of how to create a custom style:

```jsx
const colorStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "white",
    border: "none",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled ? "red" : blue,
      color: "#FFF",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};
```

## Step 5: Pass the style to the component

Finally, pass the style to the component:

```jsx
<Select options={options} onChange={handleChange} styles={colorStyles} />
```

So now you have a custom styled `react-select` component.
