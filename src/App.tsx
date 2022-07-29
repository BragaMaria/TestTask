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

  const [bodyEdit, setBodyEdit] = useState({
    title: "",
    description: "",
  });

  const [openForm, setOpenForm] = useState(true);

  const [idForm, setIdForm] = useState(0);

  const getData = () => {
    return fetch("http://localhost:3005/posts").then((result) => {
      return result.json();
    });
  };

  const [bodyCreate, setBodyCreate] = useState({
    title: "",
    description: "",
  });

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

  const edit = (id: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:3005/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyEdit),
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

  const create = (id: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:3005/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyCreate),
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
      <input className="create-button" type="submit" value="Создать пост" />

      
      
      <div className="popup-fade">
        <div className="popup">
          <a className="popup-close" href="#">
            Закрыть
          </a>
          <p>////////////</p>
        </div>




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
                <input
                  type="button"
                  value="Удалить"
                  onClick={() => {
                    remove(post.id);
                  }}
                />
                <input
                  type="button"
                  value="Редактировать"
                  onClick={() => {
                    setOpenForm(true);
                    setIdForm(post.id);
                  }}
                />
              </div>
            </div>
          );
        })}
        /
      </div>
      {openForm && (
        <div className="form-edit">
          <form
            onSubmit={(e) => {
              edit(idForm, e);
            }}
          >
            <input
              className="edit"
              type="text"
              onChange={(e) => {
                setBodyEdit({
                  title: e.target.value,
                  description: bodyEdit.description,
                });
              }}
            />

            <input
              className="edit"
              type="text"
              onChange={(e) => {
                setBodyEdit({
                  title: bodyEdit.title,
                  description: e.target.value,
                });
              }}
            />

            <input
              className="edit-button"
              type="submit"
              value="Редактировать пост"
            />
          </form>
        </div>
      )}

      {openForm && (
        <div className="form-create">
          <form
            onSubmit={(e) => {
              create(idForm, e);
            }}
          >
            <input
              className="create"
              type="text"
              onChange={(e) => {
                setBodyCreate({
                  title: e.target.value,
                  description: e.target.value,
                });
              }}
            />

            <input
              className="create"
              type="text"
              onChange={(e) => {
                setBodyCreate({
                  title: e.target.value,
                  description: e.target.value,
                });
              }}
            />
            <input
              className="create-button"
              type="submit"
              value="Создать пост"
            />
          </form>
        </div>
      )}
    </div>
  );
}
export default App;
