// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Sidebar } from './Components/Sidebar';
import { SplitScreen } from './Components/SplitScreen';



function App() {
  const [pageSelection, setPageSelection] = useState(0)
  return (
    <div className="App">
      <SplitScreen leftWeight={1} rightWeight={4}>
        <Sidebar onSelection={setPageSelection} />
        <div>Component {pageSelection} </div>
      </SplitScreen>
    </div>
  );
}

export default App;
