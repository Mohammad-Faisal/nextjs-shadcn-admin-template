# Add NextAuth and Protected route to NextJS

## Add NextAuth

```bash
pnpm add next-auth
```

First add a `.env` file to the root of your project with the following:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXT_CALLBACK_URL=http://localhost:3000/api/auth/callback/google
NEXTAUTH_SECRET=XRI3IUVLYRTTDPm2s7igihI0sd+Kd4E9mhWCSG5bdcA=
```

We ran the following code to get the secret. It can be any random string.

```js
openssl rand -base64 32
```

##

## Create the API route.

Create a new route in `app/api/auth/[...nextauth].js` with the following:

```js
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(user, account, profile) {
      return true
    },
    async redirect(url, baseUrl) {
      return baseUrl
    },
    async session(session, user) {
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token
    }
  }
})
```

Here in this code we are using the google's auth provider. But you can use any other provider as well. You can find the list of providers [here](https://next-auth.js.org/configuration/providers).

Let's see the example for using email and password as the provider.

```js
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(user, account, profile) {
      return true
    },
    async redirect(url, baseUrl) {
      return baseUrl
    },
    async session(session, user) {
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token
    }
  }
})
```
