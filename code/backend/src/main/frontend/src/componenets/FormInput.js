import { useFormContext } from "react-hook-form";
import Icon from "./Icon";

const FormInput = (props) => {
  const methods = useFormContext();

  return (
    <div className="form-group input-group mb-2">
      <input
        className="form-control text-center"
        placeholder={props.placeHolder}
        type={props.type}
        name={props.name}
        {...methods.register(props.name)}
      />
      <span className="input-group-text">
        <Icon
          currIcon={props.icon}
          iconClass="fa-xl fa-fw"
          type={props.iconType}
          onClick={props.onClick}
        />
      </span>
    </div>
  );
};

export default FormInput;
