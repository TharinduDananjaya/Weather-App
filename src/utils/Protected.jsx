import {Navigate} from "react-router-dom";

export default function Protected(props) {
  const Component = props.component;
  const isAuthenticated = localStorage.getItem("username");
  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to={{ pathname: "/login" }} />
  );
}