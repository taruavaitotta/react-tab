import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonImg,
  IonText,
  IonSearchbar,
  IonButtons,
  IonMenuButton, // Importoidaan valikkonappi
} from '@ionic/react';

const Home: React.FC = () => {
  const [dogImage, setDogImage] = useState<string>('');
  const [dogBreed, setDogBreed] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>(''); 

  const fetchDogImage = async (breed: string = '') => {
    setLoading(true);
    try {
      const url = breed
        ? `https://dog.ceo/api/breed/${breed}/images/random`
        : 'https://dog.ceo/api/breeds/image/random';
      const response = await fetch(url);
      const result = await response.json();
      setDogImage(result.message);

      const breedFromUrl = extractBreedFromUrl(result.message);
      setDogBreed(breedFromUrl);
    } catch (error) {
      console.error('Error fetching dog image:', error);
    } finally {
      setLoading(false);
    }
  };

  const extractBreedFromUrl = (url: string): string => {
    const parts = url.split('/');
    const breedInfo = parts[4];
    const breed = breedInfo.includes('-') ? breedInfo.split('-').reverse().join(' ') : breedInfo; 
    return capitalizeWords(breed);
  };

  const capitalizeWords = (text: string): string => {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  const handleSearch = () => {
    const breed = searchText.toLowerCase(); 
    fetchDogImage(breed); 
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"> {/* button */}
            <IonMenuButton /> {/* button opens menu */}
          </IonButtons>
          <IonTitle>Learn Dog Breeds</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar
          value={searchText}
          onIonInput={(e: CustomEvent) => setSearchText(e.detail.value as string)}
          debounce={500} 
          placeholder="Search by breed (e.g., hound, labrador)"
        ></IonSearchbar>
        <IonButton expand="block" onClick={handleSearch}>
          Search
        </IonButton>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <IonImg src={dogImage} alt="Random Dog" />
            <IonText color="primary">
              <h2>Breed: {dogBreed}</h2>
            </IonText>
          </>
        )}

        <IonButton expand="block" onClick={() => fetchDogImage()}>
          Get Another Dog Image
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

