import React from 'react';
import axios from 'axios';

const Test3: React.FC = () => {
  const sendText = () => {
    axios.post('http://localhost:8000/api/image_upload.php', { text: '하이' })
      .then(response => {
        console.log('Server response:', response.data);
      })
      .catch(error => {
        console.error('Error sending text:', error);
      });
  };

  return (
    <div>
      <button onClick={sendText}>Send Text</button>
    </div>
  );
};

export default Test3;
