import React from "react";
import { Comment } from "./Comment";

function CommentList({ comments }) {
  console.log("CommentList component");
  return comments.map((comment) => {
    return (
      <div key={comment.id} className="comment-stack">
        <Comment {...comment} />
      </div>
    );
  });
}

export default CommentList;
