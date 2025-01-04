# How to integrate select dropdowns with React Hook Form

React Hook Form is a popular form library for React. It's easy to use, but it's not easy to integrate with select dropdowns.

In this guide, we'll show you how to integrate select dropdowns with React Hook Form.

## Step 1: Install React Hook Form

First, install the React Hook Form package:

```sh
yarn add react-hook-form
```

## Step 2: Import React Hook Form

Next, import the useForm hook:

```jsx
import { useForm } from 'react-hook-form'
```

## Step 3: Use React Hook Form in your JSX

Finally, use the useForm hook in your JSX:

```jsx
const { register, handleSubmit } = useForm()
```

And your form will look like this

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('firstName')} />
  <input {...register('lastName')} />
  <input type="submit" />
</form>
```

## The problem with select dropdowns

The problem with select dropdowns is that they don't have a value attribute. So you can't use the register prop to register them.

```jsx
<select {...register('firstName')}>
  <option value="John">John</option>
  <option value="Jane">Jane</option>
</select>
```

## Step 4: The solution

The solution is to use the Controller component from React Hook Form. The Controller component is a wrapper around the select dropdown that allows you to register it.

```jsx
import { Controller, useForm } from 'react-hook-form'

const { register, handleSubmit, control } = useForm()

;<Controller
  name="firstName"
  control={control}
  render={({ field }) => (
    <select {...field}>
      <option value="John">John</option>
      <option value="Jane">Jane</option>
    </select>
  )}
/>
```

## Step 5: Use a third party dropdown component

We will use `react-select` which is a popular dropdown component library for React.

The other libraries will work in a similar way.

You can install it like this.

```sh
yarn add react-select
```

```jsx
import { Controller, useForm } from 'react-hook-form'

const { register, handleSubmit, control } = useForm()

;<Controller
  name={label}
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]}
      value={options.find((option) => option.value === field.value)}
      onChange={(selectedOption) => field.onChange(selectedOption?.value ?? '')}
    />
  )}
/>
```

And that's it! You can now use select dropdowns with React Hook Form.
