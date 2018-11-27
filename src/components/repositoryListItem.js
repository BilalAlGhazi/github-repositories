import React from "react";
import { Link } from "react-router-dom";

const RepostoryListItem = (props) => 
  {
    return (
      <li class="nav-item">
        <Link className="nav-link active" to={"/repo/" + props.name}>
          {props.name}
          <span class="badge badge-secondary watchers-badge">
            <i class="far fa-eye watchers-icon"></i>
            {props.watchers_count}
          </span>
        </Link>
        
      </li>
    );
  }
;

export default RepostoryListItem;