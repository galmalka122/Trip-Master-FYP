//import classes from "./Error.module.css";

const Error = (props) => {
  return (
    <div className={"w-75 mb-2 mt-2 text-danger text-center"}>
      {props.message}
    </div>
  );
};

export default Error;
