import { NavContainer } from "../Navbar/NavContainer";
import Banner from "./Banner";
import Footer from "./Footer";
import Main from "./Main";

function Home() {
  return (
    <>
      <NavContainer page={"home"} />
      <Main />
      <Banner />
      <Footer />
    </>
  );
}

export default Home;
