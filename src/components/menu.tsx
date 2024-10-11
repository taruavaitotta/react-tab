import React from 'react';
import {
  IonContent,
  IonList,
  IonItem,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/home">Home</IonItem>
          
          {/* Lisää muita navigointilinkkejä tarpeen mukaan */}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
