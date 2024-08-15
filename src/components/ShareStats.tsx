'use client';
import { useState } from 'react';
import { FaShare } from 'react-icons/fa';

interface ShareStatsProps {
  username: string;
}

export default function ShareStats({ username }: ShareStatsProps) {
  const [isCopying, setIsCopying] = useState(false);

  const copyToClipboard = async () => {
    setIsCopying(true);
    try {
      const url = `${window.location.origin}/stats/${username}`;
      await navigator.clipboard.writeText(url);
      window.dispatchEvent(new CustomEvent('showNotification', { 
        detail: { message: 'Link copied to clipboard!' } 
      }));
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      window.dispatchEvent(new CustomEvent('showNotification', { 
        detail: { message: 'Failed to copy link.' } 
      }));
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      disabled={isCopying}
      className="inline-flex items-center px-3 py-1 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium rounded-md"
    >
      <FaShare className="mr-2" />
      {isCopying ? 'Copying...' : 'Share stats'}
    </button>
  );
}