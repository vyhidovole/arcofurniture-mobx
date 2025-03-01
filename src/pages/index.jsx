import React from "react";
import Head from "next/head";
import Catalogue from "@/components/Catalogue";
import MenuBar from "@/components/MenuBar";

/* Домашнаяя страница */
const Home = () => (
  <>
  <Head>
    <title>Arcofurniture</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <MenuBar/>
  <Catalogue/>
  </>
  
  
);

export default Home;
