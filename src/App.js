import "./App.css";
import DateRange from "./Components/DateRange/DateRange";
import Search from "./Components/Search/Search";
import Tables from "./Components/Tables/Tables";

function App() {
  return (
    <div className="App">
      <Search />
      <DateRange />
      <Tables />
    </div>
  );
}

export default App;
