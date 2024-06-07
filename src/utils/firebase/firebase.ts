import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { check_notification_permission_toast } from "./notification";

const firebaseConfig = {
    apiKey: "AIzaSyA83XQaSGuZ5GuAPjZNR7FF7zDPb7iFVH8",
    authDomain: "helpdesk-eeb0f.firebaseapp.com",
    projectId: "helpdesk-eeb0f",
    storageBucket: "helpdesk-eeb0f.appspot.com",
    messagingSenderId: "68545883903",
    appId: "1:68545883903:web:34fd512b6d8502ee11a6ca",
    measurementId: "G-KHFMNR14K5"
};
export const app = initializeApp(firebaseConfig);

export const requestForToken = async () => {

    const messaging = getMessaging(app);
    try {
        check_notification_permission_toast()
        const token = await getToken(messaging, { vapidKey: "BK06WKZj6iWeP6rdZtSpbePbNQprSTIApEVfIQoORyFKpozLnm_0svxvnhT4SAXKADzu9RhhwAPUjg6J-fg6imM" })
        return token;
    } catch (err) {
        console.log(err);
    }
};


