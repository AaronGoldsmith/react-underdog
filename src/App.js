// import logo from './logo.svg';
import './App.css';
import { Sidebar } from './Components/Sidebar';
import { SplitScreen } from './Components/SplitScreen';


function App() {
  return (
    <div className="App">
      <SplitScreen leftWeight={1} rightWeight={4}>
        <Sidebar />
        <div>Thing Two</div>
      </SplitScreen>
    </div>
  );
}

export default App;
