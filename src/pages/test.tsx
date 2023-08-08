import { camera, trash, close } from 'ionicons/icons';
import { images, square, triangle } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
  IonModal,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Capacitor } from '@capacitor/core';



import { UserPhoto, usePhotoGallery } from '../hooks/usePhotoGallery';
import { useState } from 'react';

const Test: React.FC = () => {

  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  const [isgalleryOpen, setGalleryOpen] = useState(false);

  const openModal = () => {
    setGalleryOpen(true);
  };

  const closeModal = () => {
    setGalleryOpen(false);
  };


  {photos.map((photo) => (
    console.log(photo.webviewPath)
  ))}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>


          <IonRow>

            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>


        {/* <IonImg src ={"data://photos/1691461849170.jpg"}></IonImg> */}
        {/* <IonImg src = {photo.webviewPath}></IonImg> */}


        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />


      </IonContent>
    </IonPage>
  );
};

export default Test;