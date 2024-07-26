import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Eye } from 'lucide-react';
import { useNotifications, useBell } from "@suprsend/react-headless";

const NotificationItem = ({ notification, markClicked }) => {
  const message = notification.message;
  const created = new Date(notification.created_on).toLocaleString();
  
  return (
    <div
      onClick={() => markClicked(notification.n_id)}
      className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100 transition-colors duration-200 bg-blue-50"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{message.header}</h3>
        <span className="text-blue-500 text-xs font-bold px-2 py-1 bg-blue-100 rounded-full">New</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{message.text}</p>
      <p className="text-xs text-gray-400 mt-2">{created}</p>
    </div>
  );
};

const EnhancedNotificationSystem = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const { unSeenCount, markAllSeen } = useBell();
  const { notifications, markAllRead, markClicked } = useNotifications();
  const notificationRef = useRef(null);

  const unseenNotifications = notifications.filter(notification => !notification.seen_on);
  const displayedNotifications = showAllNotifications ? notifications : unseenNotifications;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(prevState => !prevState);
    if (!showNotifications) {
      markAllSeen();
    }
  };

  const handleMarkAllRead = () => {
    markAllRead();
    setShowAllNotifications(false);
  };

  return (
    <div className="fixed right-8 top-4 z-50" ref={notificationRef}>
      <button
        onClick={toggleNotifications}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-white shadow-md transition-all duration-200 relative"
      >
        <Bell className={`h-6 w-6 ${unSeenCount > 0 ? 'text-blue-500' : 'text-gray-600'}`} />
        {unSeenCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unSeenCount}
          </span>
        )}
      </button>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-10 transition-all duration-200 ease-out transform origin-top-right">
          <div className="max-h-[80vh] overflow-y-auto" style = {{maxHeight : "95vh", overflowY : "auto"}}>
          {/* // style = {{height : "95vh", overflowY : "auto"}}>  */}
            <div className="sticky top-0 px-4 py-2 bg-gray-100 flex justify-between items-center border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowAllNotifications(!showAllNotifications)}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  title={showAllNotifications ? "Show only unseen" : "Show all"}
                >
                  <Eye size={20} />
                </button>
                <button 
                  onClick={handleMarkAllRead}
                  className="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                  Mark all read
                </button>
              </div>
            </div>
            {displayedNotifications.length > 0 ? (
              displayedNotifications.map((notification) => (
                <NotificationItem
                  key={notification.n_id}
                  notification={notification}
                  markClicked={markClicked}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                {showAllNotifications ? "No notifications" : "No new notifications"}
              </p>
            )}
          </div>
          <button 
            onClick={() => setShowNotifications(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EnhancedNotificationSystem;