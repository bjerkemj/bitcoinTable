import "./App.css";
import Table from "./components/Table";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div className="table-container">
        <h1>Bitcoin data</h1>
        <Table />
      </div>
    </div>
  );
}

export default App;
