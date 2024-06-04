importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js')

firebase.initializeApp({
    apiKey: "AIzaSyAnLo0ejCEMH_cPgZaokWej4UdgyIIy5HI",
    authDomain: "hatly-app-da903.firebaseapp.com",
    projectId: "hatly-app-da903",
    storageBucket: "hatly-app-da903.appspot.com",
    messagingSenderId: "42990662374",
    appId: "1:42990662374:web:e0f567bed344e7f5368127",
    measurementId: "G-7FKKWCYDSD"
});

const messaging = firebase.messaging();