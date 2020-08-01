import React from "react";
import dynamic from "next/dynamic";
import Router from "next/router";

const LoginPage = dynamic(() => import("./login"));
const DashboardPage = dynamic(() => import("./dashboard"));

function Index({ loggedIn }) {
  React.useEffect(() => {
    if (loggedIn) {
      Router.replace("/", "/dashboard", { shallow: true });
    } else {
      Router.replace("/", "/login", { shallow: true });
    }
  }, [loggedIn]);

  // some hooks here that need to be before the condition
  if (!loggedIn) return <LoginPage />;
  // the JSX the private page will render

  return <DashboardPage loggedIn={true} />;
}

Index.getInitialProps = async () => {
  return { loggedIn: true };
};

export default Index;
