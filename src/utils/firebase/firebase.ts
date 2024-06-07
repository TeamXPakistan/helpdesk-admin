import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { check_notification_permission_toast } from "./notification";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
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


