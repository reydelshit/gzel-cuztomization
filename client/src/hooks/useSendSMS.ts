import { toast } from './use-toast';

const apiKey = `${import.meta.env.VITE_SMS_API_KEY}`;

const useSendSMS = () => {
  // const [content, setContent] = useState('');
  // const [to, setTo] = useState('');

  const sendSMS = async ({
    content = '',
    to = '',
  }: {
    content: string;
    to: string;
  }) => {
    console.log('Sending SMS with content:', content, 'to:', to);

    if (!content || !to) {
      console.error('Content or recipient number is not set.');
      return;
    }

    try {
      const response = await fetch('https://api.httpsms.com/v1/messages/send', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          from: '+639063093543',
          to: `+${to}`,
        }),
      });

      // Check for a successful response
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error sending SMS:', errorData);
        return;
      }

      const data = await response.json();
      console.log('SMS sent successfully:', data);

      toast({
        title: 'SMS Sent',
        description: 'The SMS has been sent successfully',
      });
    } catch (err) {
      console.error('Failed to send SMS:', err);
    }
  };

  return { sendSMS };
};

export default useSendSMS;
