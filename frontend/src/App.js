import "./App.css";

import Home from "./Components/Home/Home";
import { DriverSignUp } from "./Components/Registration/DriverSignUp";

import { VendorDashBoard } from "./Components/VendorDashBoard/VendorDashBoard";
function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <VendorDashBoard />
    </div>
  );
}

export default App;
