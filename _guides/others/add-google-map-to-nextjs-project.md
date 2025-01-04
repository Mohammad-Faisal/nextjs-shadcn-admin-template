# How to add Google map to Next.js project?

Google map is a great way to show the location of your business or event. It's also a great way to show the location of your business or event.

In this tutorial, we'll learn how to add Google map to Next.js project.

## Prerequisites

Before we start, make sure you have the following installed:

- Node.js
- npm
- Next.js

## Create a new Next.js project

First, let's create a new Next.js project using the following command:

```bash
npx create-next-app next-google-map
```

Next, change the directory to the newly created project:

```bash
cd next-google-map
```

Finally, start the development server:

```bash
npm run dev
```

## Install Google Maps React

Next, we need to install the Google Maps React package:

```bash
npm i google-map-react
```

## Get a Google Maps API key

First, you will need to log in to the Google Cloud Platform Console. You can do it from [here](https://console.cloud.google.com/).

Then, create a new project and give it a name. For example, `next-google-map`.

Then, go to the API & Services page and click Enable APIs and Services. Search for Google Maps JavaScript API and click Enable.

It will take a few minutes for the API to be enabled. Once it is enabled, you will see a message like this:

> You have successfully enabled the Google Maps JavaScript API.

It will also show you the API key. Copy the API key and save it somewhere safe. We will need it later.

## Create a Google Map component

Next, we need to create a Google Map component. Create a new file called `GoogleMap.js` inside the `components` directory and add the following code:

```jsx
import React, { useMemo, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY";

const GoogleMap = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div className="w-full h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <MarkerComponent lat={10.99835602} lng={77.01502627} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;

interface MarkerProps {
  lat: number;
  lng: number;
  text: string;
}

const MarkerComponent = ({ lat, lng, text }: MarkerProps) => {
  return (
    <div className="">
      {lat} {text}
    </div>
  );
};
```

## Updating the center

Next, we need to update the center of the map. We can do it by using the `useMemo` hook. Add the following code inside the `GoogleMap` component:

```jsx
const center = useMemo(() => {
  return {
    lat: 10.99835602,
    lng: 77.01502627
  }
}, [])
```

Then, update the `center` prop of the `GoogleMapReact` component:

```jsx
<GoogleMapReact
  bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
  center={center}
  defaultZoom={defaultProps.zoom}
>
```

Make sure that your `lat` and `lng` values are not string. Otherwise it will not work.

## Styling the map

You can `styles` property under the `options` prop of the `GoogleMapReact` component to style the map. For example:

```jsx
<GoogleMapReact
  bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
  center={center}
  defaultZoom={defaultProps.zoom}
  options={{
    styles: [] // here goes the values
  }}
>
```

You can use the [Snazzy Maps](https://snazzymaps.com/) to pick a style of your choice. Just copy the style and paste it inside the `styles` property.

For example for the [following style](https://snazzymaps.com/), you will find the styles array on the left panne. Just copy and paste it inside the `styles` property.
