import React from 'react';
import './css/App.css';
import MasonryGallery from './Components/Gallery/MasonryGallery';
import ActionsProvider from './Contexts/ActionsContext';
import ImageProvider from './Contexts/imageContext';


type Props = {
  children: any
}

function App(props: Props) {

  return (
    <div className="App">
      {props.children}
    </div>
  );
}

export default App;
