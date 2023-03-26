import { useRef, useEffect, useState } from "react";
import axios from "axios";

const Test = (props) => {
  useEffect(() => {
    console.log("saved");
    post();
  }, []);
  const [route, setRoute] = useState({});
  const post = async () => {
    const res = await axios({
      method: "post",
      url: "http://localhost:16000/api/place/distance",
      headers: {
        "Content-Type": "application/json",
      },
      data: props.places,
    });
    setRoute(res.data);
    console.log(res.data);
  };

  return <h1>Check console</h1>;
};
export default Test;
