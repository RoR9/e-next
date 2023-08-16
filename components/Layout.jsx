import Head from "next/head";
import React from "react";
import { Footer, Navbar } from "@components/index";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>JS Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
