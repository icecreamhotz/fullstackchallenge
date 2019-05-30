import React from "react";
import Navbar from "react-bootstrap/Navbar";
import GearGeekLogo from "../resources/images/geargeek-logo.png";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <img
          alt="igeargeek"
          src={GearGeekLogo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <Link to="/locker" style={{ textDecoration: "none", color: "white" }}>
          {" I Gear Locker"}
        </Link>
      </Navbar.Brand>
    </Navbar>
  );
};

export default HeaderComponent;
