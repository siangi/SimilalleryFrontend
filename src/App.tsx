import React, { useContext, useState } from 'react';
import './App.css';
import MasonryGallery from './Components/Gallery/MasonryGallery';
import ImageProvider, { ImageContext } from './Contexts/imageContext';
import Menu from './Components/Menu/Menu';
import QuickControls from './Components/Menu/QuickControls';




function App() {
  const [isMenuVisible, setIsMenuVisible] = useState<Boolean>(false)
  
  return (
    <div className="App">
      <ImageProvider>
        {isMenuVisible ? <Menu closeAction={(event) => setIsMenuVisible(false)}></Menu>
          : (<QuickControls toggleMenu={setIsMenuVisible}></QuickControls>)}
        <MasonryGallery></MasonryGallery>
      </ImageProvider>
    </div>
  );
}

export default App;
