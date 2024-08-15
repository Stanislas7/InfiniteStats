'use client';
import { useState, useEffect } from 'react';

export default function Notification() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const handleCustomEvent = (event: CustomEvent) => {
      setNotificationMessage(event.detail.message);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    window.addEventListener('showNotification' as any, handleCustomEvent);

    return () => {
      window.removeEventListener('showNotification' as any, handleCustomEvent);
    };
  }, []);

  if (!showNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 px-4 py-2 bg-green-500 text-white text-sm rounded-md shadow-lg transition-all duration-300 transform translate-x-0 opacity-100 animate-slide-in">
      {notificationMessage}
    </div>
  );
}