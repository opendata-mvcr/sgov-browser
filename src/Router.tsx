import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import HeroSection from "./components/HeroSection";
import SearchPage from "./components/SearchPage";
import ScrollToTop from "./ScrollToTop";
import ErrorPage from "./components/ErrorPage";
import DisambiguationPage from "./components/DisambiguationPage";
import TermPage from "./components/TermPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        {/* Routes with the search input in the header*/}
        <Route path={["/term", "/disambiguation"]}>
          <Layout fullHeader={true}>
            <Switch>
              <Route exact path="/term">
                <TermPage />
              </Route>
              <Route exact path="/disambiguation">
                <DisambiguationPage />
              </Route>
            </Switch>
          </Layout>
        </Route>
        {/* Routes without the search input in the header*/}
        <Route path={["/search", "/"]}>
          <Layout>
            <Switch>
              <Route exact path="/search">
                <SearchPage />
              </Route>
              <Route exact path="/">
                <HeroSection />
              </Route>
              <Route>
                <ErrorPage />
              </Route>
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
