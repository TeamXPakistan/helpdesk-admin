import Router from 'next/router'
import { toast } from 'react-toastify';

export const notification_function = (refetchNotifications?: any) => {
    navigator?.serviceWorker?.addEventListener("message", (event) => {
        if (event.data.firebaseMessaging.type && event.data.firebaseMessaging.type === 'push-received') {
            refetchNotifications();

            const pushData = event.data.firebaseMessaging.payload;

            const notification = new Notification(
                pushData.notification.title,
                {
                    body: pushData?.notification?.body,
                    icon: pushData?.notification?.icon,
                });

            notification?.addEventListener('click', function (event) {
                event.preventDefault();
                Router.push(pushData?.notification?.click_action)
            });

        }
    });
}

export const check_notification_permission_toast = () => {

    if (Notification.permission !== 'granted') {
        toast.info('Allow notifications to get notifications', {
            position: "bottom-left",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            // progress: ,
            theme: "colored",
        });
    }
}