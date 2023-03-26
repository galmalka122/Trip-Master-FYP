import Login from "../componenets/Login";
import MyComponent from "../componenets/ExampleMap";
import Register from "../componenets/Register";
import Distance from "../componenets/Distance";
import Directions from "../componenets/Directions";
import Test from "../componenets/Test";

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/places",
      element: <MyComponent />,
    },
    {
      path: "/distance",
      element: <Distance />,
    },
    {
      path: "/directions",
      element: <Directions />,
    },
    {
      path: "/test",
      element: <Test />,
    },
  ],
};

export default MainRoutes;
