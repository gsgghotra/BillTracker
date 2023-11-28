import './App.css';
import Features from './Features';
import Nav from './Nav';
import Payments from './Payments';
import Transactions from './Transactions';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Payments></Payments>
      <Features></Features>
      <Transactions></Transactions>
    </div>
  );
}

export default App;
