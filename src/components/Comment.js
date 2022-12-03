import IconButton from "./IconButton";
import { FaEdit, FaReply, FaTrash } from "react-icons/fa";
import CommentList from "./CommentList";
import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { usePost } from "../context/PostContext";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short"
});

export function Comment({ id, commentText, createdAt }) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { getReplies, createComment, updateComment, deleteComment } = usePost();
  const childComments = getReplies(id);

  console.log("Comment component");
  function onCommentReply(message) {
    createComment(message, false, id);
    setIsReplying(false);
  }

  function onCommentUpdate(message) {
    updateComment(id, message);
    setIsEditing(false);
  }

  function onCommentDelete(commentId) {
    deleteComment(id);
  }

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">Prameet</span>
          <span className="date">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus
            editOrReplyActive={isEditing}
            initialValue={commentText}
            onSubmit={onCommentUpdate}
          />
        ) : (
          <div className="message">{commentText}</div>
        )}
        <div className="footer">
          <IconButton
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            Icon={FaReply}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
          />
          {
            <>
              <IconButton
                onClick={() => setIsEditing((prev) => !prev)}
                isActive={isEditing}
                Icon={FaEdit}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
              />
              <IconButton
                onClick={onCommentDelete}
                Icon={FaTrash}
                aria-label="Delete"
                color="danger"
              />
            </>
          }
        </div>
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            autoFocus
            editOrReplyActive={isReplying}
            onSubmit={onCommentReply}
          />
        </div>
      )}
      {childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  );
}
