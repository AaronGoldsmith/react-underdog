import './App.css';
import { useState } from 'react';
import { Sidebar } from './Components/Sidebar';
import { SplitScreen } from './Components/SplitScreen';
import { ContentContainer } from './Components/ContentContainer';



function App() {
  const [pageSelection, setPageSelection] = useState(0)
  return (
    <div className="App">
      <SplitScreen leftWeight={1} rightWeight={4}>
        <Sidebar onSelection={setPageSelection} />
        <ContentContainer>
          <div>Component {pageSelection} </div>
        </ContentContainer>
      </SplitScreen>
    </div>
  );
}

export default App;
