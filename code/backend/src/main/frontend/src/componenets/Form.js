import classes from "./Form.module.css";
import Error from "./Error";
import FormInput from "./FormInput";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

const Form = (props) => {
  const methods = useFormContext();

  return (
    <div className="container-fluid d-flex justify-content-center mt-3">
      <div className="card bg-light">
        <Link to="/"> </Link>
        <article className="card-body mx-auto">
          <h4 className="text-center mb-4">{props.headerText}</h4>

          <form onSubmit={methods.handleSubmit(props.onSubmit)}>
            {props.fields.map((field) => {
              return (
                <Fragment key={field.name}>
                  <FormInput
                    key={field.name}
                    placeHolder={field.placeHolder}
                    type={field.type}
                    name={field.name}
                    icon={field.icon}
                    iconType={field.iconType}
                    onClick={field.onClick}
                  />
                  {methods.formState.errors[field.name] && (
                    <Error
                      message={methods.formState.errors[field.name].message}
                    />
                  )}
                </Fragment>
              );
            })}
            <div className="form-group">
              <button className="btn btn-primary btn-block w-100" type="submit">
                {props.buttonText}
              </button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
};

export default Form;
