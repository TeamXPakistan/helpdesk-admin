import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { check_notification_permission_toast } from "./notification";

const firebaseConfig = {
    apiKey: "AIzaSyAnLo0ejCEMH_cPgZaokWej4UdgyIIy5HI",
    authDomain: "hatly-app-da903.firebaseapp.com",
    projectId: "hatly-app-da903",
    storageBucket: "hatly-app-da903.appspot.com",
    messagingSenderId: "42990662374",
    appId: "1:42990662374:web:e0f567bed344e7f5368127",
    measurementId: "G-7FKKWCYDSD"
};
export const app = initializeApp(firebaseConfig);

export const requestForToken = async () => {

    const messaging = getMessaging(app);
    try {
        check_notification_permission_toast()
        const token = await getToken(messaging, { vapidKey: "BLWfKeEQQMrsqoIdW5UrMlhIZw05Livs_ZUvnwGup3WdVOWQj9copZZnpbayHIHwr0bYck2gwzeWzd7F-iCNQNE" })
        return token;
    } catch (err) {
        console.log(err);
    }
};


