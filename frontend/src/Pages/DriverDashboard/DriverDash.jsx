import React from "react";
import { NavContainer } from "../../Components/Navbar/NavContainer";
// import { useSelector } from "react-redux";

export const DriverDash = () => {
  return (
    <div>
      <NavContainer user={"driver"} page={"home"} />
    </div>
  );
};
