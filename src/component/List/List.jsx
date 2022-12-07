import "./List.css";
import SingleList from "./SingleList";

const List = (props) => {
  return (
    <div className="list-area">
      <h3>{props.title} List</h3>
      <table>
        <thead>
          <tr>
            <th className="id">ID</th>
            <th className="firstName">First Name</th>
            <th className="lastName">Last Name</th>
            <th className="type">Type</th>
            <th className="Action">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <SingleList key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
