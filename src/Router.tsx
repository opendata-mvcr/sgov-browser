import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import HeroSection from "./components/HeroSection";
import SearchPage from "./components/SearchPage";
import ScrollToTop from "./ScrollToTop";
import ErrorPage from "./components/ErrorPage";
import DisambiguationPage from "./components/DisambiguationPage";
import TermPage from "./components/TermPage";
import VocabularyPage from "./components/VocabularyPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Route exact path="/vocabularies/:vocabularyName/terms/:termName">
            <TermPage />
          </Route>
          <Route exact path="/vocabularies/:vocabularyName">
            <VocabularyPage />
          </Route>
          <Route exact path="/disambiguation">
            <DisambiguationPage />
          </Route>
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
    </BrowserRouter>
  );
};

export default Router;
