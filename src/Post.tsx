import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IData {
  id: number;
  title: string;
  description: string;
}

export default function Post() {
  const params = useParams();

  const [data, setData] = useState<IData>();

  const getData = (id: string | undefined) => {
    return fetch(`http://localhost:3005/posts/${id}`).then((result) => {
      return result.json();
    });
  };

  useEffect(() => {
    getData(params.id).then((result) => {
      setData(result);
    });
  }, []);
  console.log(data);
  return (
    <div className="text">
      <h3 className="title">
        {data?.id}. {data?.title}
      </h3>
      <p className="description">{data?.description}</p>
    </div>
  );
}
