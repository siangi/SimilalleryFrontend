import React from 'react';
import './App.css';
import MasonryGallery from './Components/Gallery/MasonryGallery';
import ImageProvider from './Contexts/imageContext';
import Menu from './Components/Menu/Menu';



function App() {
  return (
    <div className="App">
      <ImageProvider>
        <Menu></Menu>
        <MasonryGallery></MasonryGallery>
      </ImageProvider>
    </div>
  );
}

export default App;
