import React from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet";
import { fetcher } from "../../utils/request";
import { GetServerSidePropsContext } from "next";
import Table from "../../components/Table";
import useSWR from "swr";
import { getToken } from "../../utils/cookies";
import { Resource, Stadium } from "#types";
import Button, { ButtonVariant } from "#components/Button";
import { Plus } from "#components/Icons";

const LoginPage = dynamic(() => import("../login"));
// more imports here

function Stadiums({ loggedIn }) {
  const { data, isValidating } = useSWR<Resource<Stadium[]>>(
    "/api/stadiums",
    fetcher
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Dirección",
        accessor: "complex.address",
      },
    ],
    []
  );

  console.log("Rerender");

  React.useEffect(() => {
    if (loggedIn) return; // do nothing if the user is logged in
    Router.replace("/stadiums", "/login", { shallow: true });
  }, [loggedIn]);

  if (!loggedIn) return <LoginPage />;

  return (
    <>
      <Helmet>
        <title>Canchas</title>
      </Helmet>
      <Layout>
        <div className="w-full flex p-4 pb-8">
          <div className="flex flex-1 flex-wrap">
            <span className="font-bold text-gray-800 leading-none w-full m-0 text-4xl">
              Canchas
            </span>
            <span className="text-sm text-gray-600">
              {data?.meta?.total} canchas
            </span>
          </div>
          <div className="flex items-center flex-1 justify-end">
            <input className="shadow appearance-none border rounded flex-1 py-2 px-3 text-gray-700 mr-2 leading-tight focus:outline-none focus:shadow-outline" />
            <Button
              label="Agregar"
              icon={Plus}
              iconSize={30}
              onClick={() => {}}
              variant={ButtonVariant.PRIMARY}
            />
          </div>
        </div>
        <Table columns={columns} meta={data?.meta || {}} items={data || []} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const loggedIn = !!getToken(context);

  return {
    props: {
      loggedIn,
    },
  };
}

export default Stadiums;
