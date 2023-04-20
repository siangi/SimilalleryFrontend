import React, {useEffect, useState} from 'react';
import './App.css';
import MasonryGallery from './Components/Gallery/MasonryGallery';
import GalleryImage from './Models/GalleryImage';
import ImageLoader from './Models/ImageLoader';

function App() {
  const [similarImages, setSimilarImages] = useState([])
  useEffect(() => {
    const loader = new ImageLoader()
    loader.loadImagesFromLocalAPI(Math.floor(Math.random()*20000), setSimilarImages)
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <MasonryGallery images={similarImages}></MasonryGallery>
      </header>
    </div>
  );
}

export default App;
