# AnimalRescue

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0e80c3817c6640f6a4704da3eca21092)](https://www.codacy.com/app/Wathsara/AnimalRescue_2?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=scorelab/AnimalRescue&amp;utm_campaign=Badge_Grade) [![Node version](https://img.shields.io/node/v/react-native.svg?style=flat)](http://nodejs.org/download/) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## About

A common sight on today’s streets is the number of abandoned animals languishing on the streets suffering with injuries and disease and live without any shelter. The silent suffering of these souls caught the attention of dynamic, animal lover, so Animal Rescue App initiative to develop a mobile app to track animals that are in need of help. Animal Rescue App Connect animal lovers, vets, and other NGOs in real time. They Can Track the Animals That Actually Need the Help.

## How To Run

We are using reat-native-cli. So make sure to install react-native-cli.Follow the link below for details

[Install Reat-Native](https://facebook.github.io/react-native/docs/0.59/getting-started)

1. *Fork the original repository and use your own branch for your developments*.
    `https://github.com/<github username>/AnimalRescue.git`

2. *Install npm packages*
    `npm install`

3. *Configure firebase* 
Make a copy of `firebaseConfig.exaple.js` which is in `app/config` and rename it to `firebaseConfig.js`.
Then copy your credentials and paste it.
```
var firebaseConfig = {
  apiKey: "your credentials",
  authDomain: "your credentials",
  databaseURL: "your credentials",
  projectId: "your credentials",
  storageBucket: "your credentials",
  messagingSenderId: "your credentials",
  appId: "your credentials"
};
```

4. *Google & Facebook Sign In Configuration*
#### Google
follow the given link with correct steps.

[Config Google Sign-In](https://github.com/react-native-community/react-native-google-signin/blob/master/docs/android-guide.md)

> Note : Once you follow the above link, you'll find a way to get the web-client id for the application. Copy it and paste it in the `firebaseConfig.js` file under  `export const webClinetID = "your google web client id"` 

Make sure to include every files (google-service.json, your-key.keystore) in the project for getting working model of google sign in.

#### Facebook

First You should have a facebook acoount and an app id. Follow the link below to obatai the app id

[Obtain Facebook App Id](https://developers.facebook.com/)

Once you get the facebook app id, copy and paste it in the following location

`/android/app/src/main/res/values/strings.xml <string name="facebook_app_id">your app id</string>`

> Once you've done with those processes, make sure to enable google sign in and facebook sign in methods in firebase.
> 

5. *Google Map Configuration*
 FIrst you should obtain a google map api key. Follow the link to get the map api key.
 [Map Api Key](https://cloud.google.com/maps-platform/)

Once you get the map api key, copy and paste in the following files.
> /android/app/main/src/AndroidManifest.xml
>     `android:name="com.google.android.geo.API_KEY"`
>     `android:value="Your api key goes here"/>`
> 


> app/components/SearchAndFixLocation/searchView.js
> ```
> query={{
>           key: 'Your api key goes here',
>           language: 'en', 
>         }}
> ```

You've now done with configurations 💯.

6. Run the project

`react-native run-android`

Enjoy coding 👍