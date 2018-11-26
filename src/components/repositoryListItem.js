import React from "react";
import { Link } from "react-router-dom";

const RepostoryListItem = (props) => 
  {
    return (
    < div>
      <Link to={"/repo/" + props.name}>{props.name}</Link>
      <span class="badge badge-light">
        <i class="far fa-eye"></i>
        {props.watchers_count}
      </span>
    </div>
    );
  }
;

export default RepostoryListItem;