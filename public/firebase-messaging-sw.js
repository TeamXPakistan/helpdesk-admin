importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js')

firebase.initializeApp({
    apiKey: "AIzaSyA83XQaSGuZ5GuAPjZNR7FF7zDPb7iFVH8",
    authDomain: "helpdesk-eeb0f.firebaseapp.com",
    projectId: "helpdesk-eeb0f",
    storageBucket: "helpdesk-eeb0f.appspot.com",
    messagingSenderId: "68545883903",
    appId: "1:68545883903:web:34fd512b6d8502ee11a6ca",
    measurementId: "G-KHFMNR14K5"
});

const messaging = firebase.messaging();