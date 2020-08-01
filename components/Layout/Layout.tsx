import React from "react";
import Header from "../Header";

const Layout = ({ children }) => (
  <>
    <Header />
    <div className="h-full pt-24 pb-4 overflow-auto">{children}</div>
  </>
);

export default Layout;
