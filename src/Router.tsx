import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import HeroSection from "./components/HeroSection";
import Word from "./components/Word";
import Search from "./components/Search";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/words">
            <Word/>
          </Route>
          <Route path="/search">
            <Search/>
          </Route>
          <Route path="/">
            <HeroSection />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
