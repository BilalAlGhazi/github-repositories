import React from "react";

const RepostoryListItem = (props) => 
  {
    console.log(props);
    return (
    < div>{props.name} / {props.watchers_count}</div>
    );
  }
;

export default RepostoryListItem;