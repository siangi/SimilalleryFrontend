import React from 'react';
import './App.css';
import MasonryGallery from './Components/Gallery/MasonryGallery';
import ImageProvider from './Contexts/imageContext';



function App() {
  return (
    <div className="App">
      <ImageProvider>
        <header className="App-header">
          <MasonryGallery></MasonryGallery>
        </header>
      </ImageProvider>
    </div>
  );
}

export default App;
