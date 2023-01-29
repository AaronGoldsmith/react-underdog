import './App.css';
import { useState } from 'react';
import { Sidebar } from './Components/Sidebar';
import { SplitScreen } from './Components/SplitScreen';
import { ContentContainer } from './Components/ContentContainer';
import  P5Wrapper  from './Components/P5Wrapper'
import  Watermarker  from './Components/Watermarker'



function App() {
  const [pageSelection, setPageSelection] = useState(0)
  return (
    <div className="App">
      <SplitScreen leftWeight={1} rightWeight={4}>
        <Sidebar onSelection={setPageSelection} />
        <ContentContainer title={pageSelection}>
          {pageSelection === "main" && <P5Wrapper />}
          {pageSelection === "secondary" &&  <Watermarker />}
          {/* component 3 */}
        </ContentContainer>
      </SplitScreen>
    </div>
  );
}

export default App;
