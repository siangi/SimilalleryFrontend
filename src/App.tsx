import React from 'react';
import './App.css';
import MasonryGallery from './Components/Gallery/MasonryGallery';
import ImageProvider from './Contexts/imageContext';
import ActionsProvider from './Contexts/ActionsContext';

function App() {
  return (
    <div className="App">
      <ImageProvider>
        <ActionsProvider>
          <MasonryGallery></MasonryGallery>
        </ActionsProvider>
      </ImageProvider>
    </div>
  );
}

export default App;
