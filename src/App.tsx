import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:3005/posts")
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setData(result);
      });
  }, []);

  console.log(data)

  return (
    <div className="App">
      <div className="post">
        <div className="text">
          <h3 className="title">1. Заголовок поста</h3>
          <p className="description">Описание поста</p>
        </div>
        <div className="buttons">
          <input type="button" value="Удалить" />
          <input type="button" value="Редактировать" />
        </div>
      </div>

      <div className="post">
        <div className="text">
          <h3 className="title">2. Заголовок поста</h3>
          <p className="description">Описание поста</p>
        </div>
        <div className="buttons">
          <input type="button" value="Удалить" />
          <input type="button" value="Редактировать" />
        </div>
      </div>
    </div>
  );
}

export default App;
