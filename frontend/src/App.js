import './App.css';
import logo from './images/logo.png';

function App() {
  return (
    <div className="App">
      <nav class="navbar navbar-light">
        <a class="navbar-brand" href="#">
          <img src={logo} width="50" height="50" class="d-inline-block align-top" alt="" />
          Bills Tracker
        </a>
    </nav>
      <header className="App-header">
        <p>
          App is still in development
        </p>
        <p>Check <a href="https://github.com/gsgghotra/BillTracker">Github</a> for more information</p>
      </header>
    </div>
  );
}

export default App;
