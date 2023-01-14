import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = (props) => {
  return (
    <span className={props.divClass}>
      <FontAwesomeIcon
        className={props.iconClass}
        icon={props.currIcon}
        type={props.type}
        onClick={props.onClick}
      />
      {props.children}
    </span>
  );
};

export default Icon;
