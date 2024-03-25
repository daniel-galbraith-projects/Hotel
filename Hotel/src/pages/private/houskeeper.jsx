import React, { useState, useEffect } from "react";
import axios from "axios";
import Logout from "../../component/logout";

function Housekeeper() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/getHousekeepingNotifications"
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleStatusUpdate = async (notificationID) => {
    try {
      const updatedNotifications = notifications.map((notification) =>
        notification.NotificationID === notificationID
          ? { ...notification, Status: "Confirm" }
          : notification
      );
      setNotifications(updatedNotifications);

      await axios.put("http://localhost:5000/updateNotificationStatus", {
        notificationID,
        status: "Confirm",
      });
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  return (
    <div className="housekeeperContainer">
      <Logout />
      <h1>Housekeeping Tasks - Pending Rooms</h1>

      <table className="reservation-table">
        <thead>
          <tr>
            <th>Notification ID</th>
            <th>Notification Type</th>
            <th>Notification Time</th>
            <th>Room ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.NotificationID}>
              <td>{notification.NotificationID}</td>
              <td>{notification.NotificationType}</td>
              <td>{notification.NotificationTime}</td>
              <td>{notification.RoomID}</td>
              <td>
                {notification.Status === "New" ? (
                  <div
                    className="notificationNew"
                    onClick={() =>
                      handleStatusUpdate(notification.NotificationID)
                    }
                  >
                    New
                  </div>
                ) : (
                  notification.Status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Housekeeper;
