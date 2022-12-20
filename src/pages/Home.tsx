import { IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonImg, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { home, heart, logOut, star, call, globe, basket, barbell, trash, person, list, car, camera } from 'ionicons/icons';
import AvionAccueil from '../components/AvionAccueil';
import { usePhotoGallery } from '../components/TakeAndUploadPhoto';

const Home: React.FC = () => {
  return (
    <>
        <AvionAccueil />
    </>
  );
};

export default Home;
