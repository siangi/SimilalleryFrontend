import React, { useContext, useState, useRef } from 'react';
import './css/App.css';
import MasonryGallery from './Components/Gallery/MasonryGallery';
import ActionsProvider from './Contexts/ActionsContext';
import ImageProvider, { ImageContext } from './Contexts/imageContext';
import Menu from './Components/Menu/Menu';
import QuickControls from './Components/Menu/QuickControls';




function App() {
  const [isMenuVisible, setIsMenuVisible] = useState<Boolean>(false)
  const overflowRef: any = useRef(null)

  function checkForOverfow(): Boolean {
    if (overflowRef !== null) {
      return overflowRef.current.scrollHeight > overflowRef.current.clientHeight
    } else {
      return false
    }
  }

  return (
    <div className="App">
      <ImageProvider>
        <ActionsProvider>
          {isMenuVisible ? <Menu closeAction={(event) => setIsMenuVisible(false)}></Menu>
            : (<QuickControls toggleMenu={setIsMenuVisible}></QuickControls>)}

          <div className="overflow-checker" ref={overflowRef}>
            <MasonryGallery overflowChecker={checkForOverfow}></MasonryGallery>
          </div>
        </ActionsProvider>
      </ImageProvider>
    </div>
  );
}

export default App;
