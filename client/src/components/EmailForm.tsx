import emailjs from '@emailjs/browser';
import axios from 'axios';
import { Send } from 'lucide-react';
import React, { useState } from 'react';

type InputType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

const EmailForm = ({
  sendTo,
  sendToName,
  setShowEmailForm,
  reservationID,
  fetchReservations,
}: {
  sendTo: string;
  sendToName: string;
  setShowEmailForm: (e: boolean) => void;
  reservationID: number;
  fetchReservations: () => void;
}) => {
  const [formData, setFormData] = useState({
    to_email: sendTo || '',
    to_name: sendToName || '',
    from_name: 'Matutum Mapping',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const SERVICE_ID = 'service_d6xu2co';
  const TEMPLATE_ID = 'template_yckybkd';
  const PUBLIC_KEY = 'FeDjyzRYzhIc6nVNC';

  const handleChange = (e: InputType) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        formData,
        PUBLIC_KEY,
      );

      console.log(result.text);
      setStatus('Email sent successfully!');
      setFormData({
        to_email: '',
        to_name: '',
        from_name: 'Matutum Mapping',
        subject: '',
        message: '',
      });

      const changeStatusReservations = await axios.put(
        `${
          import.meta.env.VITE_SERVER_LINK
        }/api/reservation/status/${reservationID}`,
        {
          status: 'Done',
        },
      );

      console.log(changeStatusReservations.data);

      fetchReservations();
    } catch (error) {
      setStatus('Failed to send email');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-start">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Compose Email</h2>
        <p className="text-white">Create and send your email message</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">To:</label>
          <input
            type="email"
            name="to_email"
            value={formData.to_email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-black"
            required
            placeholder="recipient@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-black"
            required
            placeholder="Enter subject"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-black h-48"
            required
            placeholder="Type your message here..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              fetchReservations();
              setShowEmailForm(false);
            }}
            className="bg-white text-black px-4 py-2 rounded-md  flex items-center gap-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-md  flex items-center gap-2"
          >
            <Send size={16} />
            Send Email
          </button>
        </div>
      </form>

      {status && (
        <div
          className="bg-white p-2 rounded-md"
          style={{
            marginTop: '20px',
            color: status.includes('Failed') ? 'red' : 'green',
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default EmailForm;
