import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
    notficatin: null,
    showNotification: function (notifcationData) { },
    hideNotification: function () { }
})

export const NotificationContextProvider = ({ children }) => {
    const [activeNotification, setActiveNotification] = useState();
    useEffect(() => {
        if (activeNotification
            && (activeNotification.status == "success" || activeNotification.status == "error")) {

            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3000);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [activeNotification])
    const showNotificationHandlder = (notifcationData) => {
        console.log(notifcationData);
        setActiveNotification(notifcationData);

    }
    const hideotificationHandlder = () => {
        setActiveNotification(null);

    }
    const context = { notification: activeNotification, showNotification: showNotificationHandlder, hideNotification: hideotificationHandlder };
    return <NotificationContext.Provider value={context}>
        {children}
    </NotificationContext.Provider>

};


export default NotificationContext;