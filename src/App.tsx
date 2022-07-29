import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavLink } from "react-router-dom";


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

  const [openForm, setOpenForm] = useState(false);

  const [openForm2, setOpenForm2] = useState(false);

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
    setOpenForm(false);
  };

  const create = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:3005/posts/`, {
      method: "POST",
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
    setOpenForm2(false);
  };

  return (
    <div className="App">
      <input
        className="create-button"
        type="submit"
        value="Создать пост"
        onClick={() => {
          setOpenForm2(true);
        }}
      />

      {data?.map((post) => {
        return (
          <div className="post" key={post.id}>
            <NavLink
              to={`/posts/${post.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="text">
                <h3 className="title">
                  {post.id}. {post.title}
                </h3>
                <p className="description">{post.description}</p>
              </div>
            </NavLink>
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

      {openForm && (
        <div className="popup-fade">
          <div className="form-edit popup">
            <a className="popup-close" onClick={() => setOpenForm(false)}>
              Закрыть
            </a>
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
        </div>
      )}

      {openForm2 && (
        <div className="popup-fade">
          <div className="form-create popup">
            <a className="popup-close" onClick={() => setOpenForm2(false)}>
              Закрыть
            </a>
            <form
              onSubmit={(e) => {
                create(e);
              }}
            >
              <input
                className="create"
                type="text"
                onChange={(e) => {
                  setBodyCreate({
                    title: e.target.value,
                    description: bodyCreate.description,
                  });
                }}
              />

              <input
                className="create"
                type="text"
                onChange={(e) => {
                  setBodyCreate({
                    title: bodyCreate.title,
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
        </div>
      )}
    </div>
  );
}
export default App;
