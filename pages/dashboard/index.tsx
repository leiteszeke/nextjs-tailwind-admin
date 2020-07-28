import React from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet";

const LoginPage = dynamic(() => import("../login"));
// more imports here

function Dashboard({ loggedIn }) {
  React.useEffect(() => {
    if (loggedIn) return; // do nothing if the user is logged in
    Router.replace("/dashboard", "/login", { shallow: true });
  }, [loggedIn]);

  // some hooks here that need to be before the condition
  if (!loggedIn) return <LoginPage />;
  // the JSX the private page will render

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Layout>
        <h1>Dashboard</h1>
      </Layout>
    </>
  );
}

Dashboard.getInitialProps = async () => {
  return { loggedIn: true };
};

export default Dashboard;
