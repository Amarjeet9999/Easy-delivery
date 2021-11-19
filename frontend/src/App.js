import "./App.css";
import { NavContainer } from "./Components/Navbar/NavContainer";
import { LoginPage } from "./Pages/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <NavContainer page={"landing"} />
      <LoginPage />
    </div>
  );
}

export default App;
