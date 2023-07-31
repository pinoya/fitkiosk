import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import fs from 'fs';

const ImageList: React.FC = () => {
  const [imageNames, setImageNames] = useState<string[]>([]);

  useEffect(() => {
    const imageDirectory = './labels/gym';
    fs.readdir(imageDirectory, (err, files) => {
      if (err) {
        console.error('Error reading image directory:', err);
      } else {
        const imageNames = files.filter((file) => file.endsWith('.png') || file.endsWith('.jpg'));
        setImageNames(imageNames);
      }
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Image List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Image Files:</h1>
        <ul>
          {imageNames.map((imageName, index) => (
            <li key={index}>{imageName}</li>
          ))}
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default ImageList;
