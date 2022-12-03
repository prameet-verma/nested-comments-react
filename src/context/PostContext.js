import React, { useContext, useEffect, useMemo, useState } from "react";
import { uuid } from "uuidv4";

const Context = React.createContext();

export function usePost() {
  return useContext(Context);
}

export function PostProvider({ children }) {
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("Comments")) || []
  );

  console.log("JSON", JSON.parse(localStorage.getItem("Comments")));
  const commentsByParentId = useMemo(() => {
    const group = {};
    console.log("updatr", comments);
    comments.forEach((comment) => {
      group[comment.parentNodeId] ||= [];
      group[comment.parentNodeId].push(comment);
    });
    console.log({ group });

    return group;
  }, [comments]);
  useEffect(() => {
    localStorage.setItem("Comments", JSON.stringify(comments));
  }, [comments]);

  // useEffect(() => {
  //   const previousComments = JSON.parse(localStorage.getItem("Comments"));
  //   console.log({ previousComments });
  //   if (previousComments.length > 0) {
  //     setComments(previousComments);
  //   }
  // }, []);
  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }
  const createComment = (
    commentValue,
    isRootNode = true,
    parentNodeId = null
  ) => {
    console.log("createComment", commentValue);
    const comment = {
      id: uuid(),
      commentText: commentValue,
      childCommments: [],
      isRootNode,
      parentNodeId,
      createdAt: new Date().toISOString()
    };
    setComments((prev) => [...prev, comment]);
  };
  const updateComment = (commentId, updatedValue) => {
    console.log(commentId, updatedValue);
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.commentText = updatedValue;
      }
      return comment;
    });
    console.log(updatedComments);
    setComments(updatedComments);
  };

  const deleteComment = (commentId) => {
    console.log("Delete called", commentId);
    // const childCommments = comments.forEach((comment) => {
    //   if (comment.id === commentId) {
    //     return comment.childCommments;
    //   }
    // });
    // console.log("Child", childCommments);
    //removes the parent comment and the corresponding child comments
    const filteredComments = comments.filter((comment) => {
      console.log("filter", comment.id, commentId);
      return comment.id !== commentId;
    });
    console.log({ filteredComments });
    setComments(filteredComments);
  };

  return (
    <Context.Provider
      value={{
        rootComments: commentsByParentId[null],
        getReplies,
        comments,
        createComment,
        updateComment,
        deleteComment
      }}
    >
      {children}
    </Context.Provider>
  );
}
