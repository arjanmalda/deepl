import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import TranslationForm from "./components/TranslationForm";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <TranslationForm />
    </>
  );
};

export default App;
