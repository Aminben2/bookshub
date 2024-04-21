// NotificationComponent.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001/api/v1/sendNotification"); // Replace with your backend URL

const Notfications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("notification", (notificationData) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notificationData,
      ]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notfications;
