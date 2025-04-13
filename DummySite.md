instrall YARN to run the dummy site

```node
npm install yarn@1.22.22 -g
```

Navigate to the root folder of the dummy site files.
Install all the dependencies.

```node
yarn;
```

RUN the site.

```node
yarn dev
```

The site will run in localhost in port 3000 by default.

You can login to the app with any of the example app users.
The default password for all users is _s3cret_.
Example users can be seen by running

```node
yarn list:dev:users

Heath93
Arvilla_Hegmann
Dina20
Reyes.Osinski
Judah_Dietrich50
```

While using the site in cypress, you can use the following url to access the site.

```link
http://localhost:3000
```

Note: Keep the project running in the background while using cypress (or any other testing tool) in another instance.
