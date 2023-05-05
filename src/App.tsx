import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa'
import './App.css';
import MasonryGallery from './Components/Gallery/MasonryGallery';
import ImageProvider from './Contexts/imageContext';
import Menu from './Components/Menu/Menu';
import IconKnob from './Components/Controls/IconKnob';



function App() {
  const [isMenuVisible, setIsMenuVisible] = useState<Boolean>(false)
  return (
    <div className="App">
      <ImageProvider>
        {isMenuVisible ? <Menu closeAction={(event) => setIsMenuVisible(false)}></Menu>
          : <IconKnob icon={<FaCog />} onClick={(event: React.MouseEvent) => setIsMenuVisible(true)}></IconKnob>}
        <MasonryGallery></MasonryGallery>
      </ImageProvider>
    </div>
  );
}

export default App;
