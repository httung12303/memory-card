import { useState } from 'react';
import HomeScreen from './components/home-screen/HomeScreen';
import PlayScreen from './components/play-screen/PlayScreen';
import 'normalize.css';
import './style/styles.css';

export default function App() {
  const [region, setRegion] = useState(0);
  return (
    <>
      {region === 0 ? (
        <HomeScreen onRegionClick={setRegion}></HomeScreen>
      ) : (
        <PlayScreen
          region={region}
          onReturn={() => setRegion(0)}
        ></PlayScreen>
      )}
    </>
  );
}
