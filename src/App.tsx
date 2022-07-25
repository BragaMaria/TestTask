import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface IData {
  id: number;
  title: string;
  description: string;
}

function App() {
  const [data, setData] = useState<IData[]>();

  const getData = () => {
    return fetch("http://localhost:3005/posts").then((result) => {
      return result.json();
    });
  };

  
  useEffect(() => {
    getData().then((result) => {
      setData(result);
    });
  }, []);

  
  const remove = (id: number) => {
    fetch(`http://localhost:3005/posts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        return result.json();
      })
      .then(() => {
        getData().then((result) => {
          setData(result);
        });
      });
  };

  return (
    <div className="App">
      {data?.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="text">
              <h3 className="title">
                {post.id}. {post.title}
              </h3>
              <p className="description">{post.description}</p>
            </div>
            <div className="buttons">
              <input type="button" value="Удалить" onClick={()=>{remove(post.id)}}/>
              <input type="button" value="Редактировать" />
            </div>
          </div>
        );
      })}
      <input className="edit" type="text" />
      <input className="edit" type="text" />
      <input className="edit_button" type="button" value="Редактировать пост"/>

    </div>
  );
}
export default App;
