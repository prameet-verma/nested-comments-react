import { useState } from "react";
import { usePost } from "../context/PostContext";
import CommentList from "./CommentList";

export function CommentForm({
  editOrReplyActive = false,
  onSubmit = undefined,
  autoFocus = false,
  initialValue = ""
}) {
  console.log("Comment form");
  const [message, setMessage] = useState(initialValue);
  const { rootComments, createComment } = usePost();
  function handleSubmit(e) {
    e.preventDefault();
    if (message.length > 0) {
      onSubmit ? onSubmit(message) : createComment(message);
      setMessage("");
    }
  }
  console.log("Message", message, rootComments);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="comment-form-row">
          <textarea
            autoFocus={autoFocus}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
          />
          <button className="btn" type="submit">
            Post a Comment
          </button>
        </div>
      </form>
      {!editOrReplyActive && rootComments != null && rootComments.length > 0 && (
        <div className="mt-4">
          <CommentList comments={rootComments} />
        </div>
      )}
    </>
  );
}
