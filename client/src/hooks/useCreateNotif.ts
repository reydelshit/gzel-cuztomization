import axios from 'axios';
import { useState } from 'react';

interface NotifData {
  title: string;
  message: string;
  receiver_id: number;
}

const useCreateNotif = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createNotif = async (data: NotifData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_LINK}/notif/create`,
        data,
      );
      console.log(res.data, 'New notification created');

      if (String(res.data.status) === 'success') {
        console.log('Notification created successfully');
      }
    } catch (err) {
      console.error('Error creating notification:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { createNotif, loading, error };
};

export default useCreateNotif;
