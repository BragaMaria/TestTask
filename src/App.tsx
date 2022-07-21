import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface IData {
  item: {
    id: string;
    title: string;
    content: string;
  };
}

function App() {
  const post = [
    {
      id: "1",
      title: "Отдых в июле на Черном море",
      content: " ",
    },
  ];
  return (
    <div className="App">
      <h3>Проект </h3>
      <div className="post">Блок 1</div>
    </div>
  );
}
const elems = post.map((elem) => {
  return <Elem item={elem} />;
});
<div>{elems}</div>;

export default App;
