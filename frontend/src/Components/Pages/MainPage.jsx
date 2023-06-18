import { Link } from "react-router-dom"

const MainPage = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Main Page</Link>
      </li>
      <li>
        <Link to="/login">Login Page</Link>
      </li>
      <li>
        <Link to="/*">Not Found Page</Link>
      </li>
    </ul>
  </div>
);

export default MainPage;
