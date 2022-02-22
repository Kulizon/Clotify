import { Link } from "react-router-dom";

import styles from "./Group.module.css";

const Group = (props) => {
  return (
    <div className={styles.group}>
      <div>
        <h3>{props.heading}</h3>
      </div>

      {props.models.map((m) => {
        return (
          <div key={m.name}>
            <Link to={"/admin/list/" + m.name.toLowerCase()}>
              <h3>{m.name} </h3>
            </Link>
            {!props.hideLinks && (
              <div>
                <Link to={`/admin/add/${m.name.toLowerCase()}`}>Add</Link>
                {props.displayChange && <Link to={`/admin/list/${m.name.toLowerCase()}`}>Change</Link>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Group;
