import React from "react";
import { Link } from "react-router-dom";

const RepostoryListItem = (props) => 
  {
    return (
      <li className="nav-item">
        <Link className="nav-link active" to={"/repo/" + props.name}>
          {props.name}
          <span className="badge badge-secondary watchers-badge">
            <i className="far fa-eye watchers-icon"></i>
            {props.watchers_count}
          </span>
        </Link>
        
      </li>
    );
  }
;

export default RepostoryListItem;