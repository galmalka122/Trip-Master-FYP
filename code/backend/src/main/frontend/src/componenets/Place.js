import Card from "./Card";

const Place = (props) => {
  return (
    <Card title={"Add place"} onClick={props.setShowCard}>
      <h1>{props.name}</h1>
      <h3>{props.address}</h3>
      <ul>
        <li>Opening hours</li>
        {props.hours.map((element) => {
          return <li key={element}>{element}</li>;
        })}
      </ul>
      <h4>Rating: {props.rating}</h4>
      <button onClick={props.onSaveClick}>Save Place</button>
    </Card>
  );
};
export default Place;
