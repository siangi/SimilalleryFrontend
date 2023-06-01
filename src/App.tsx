import React from 'react';
import './css/App.css';


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
