import React from "react";
import SideMenu from "./SideMenu";
import MessageInput from "./MessageInput";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <SideMenu />
      <MessageInput />
    </div>
  );
};

export default Home;
