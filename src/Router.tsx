import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import HeroSection from "./components/HeroSection";
import Search from "./components/Search";
import ScrollToTop from "./ScrollToTop";
import ErrorPage from "./components/ErrorPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Layout>
        <Switch>
          <Route exact path="/search">
            <Search/>
          </Route>
          <Route exact path="/">
            <HeroSection />
          </Route>
            <Route>
                <ErrorPage/>
            </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
