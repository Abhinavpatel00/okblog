
import React, { useState } from "react";
import useComments from "./useComments";

const PostComments: React.FC<{ slug: string }> = ({ slug }) => {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const maxPageButtons = 5; // Maximum number of pagination buttons

  const {
    comments,
    isLoading,
    isError,
    addComment,
    fetchPage,
  } = useComments(slug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !userName) return;

    try {
      await addComment(newComment, userName);
      setNewComment("");
      setCurrentPage(1);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await fetchPage(page, pageSize);
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(comments.length / pageSize);
    const middleButton = Math.floor(maxPageButtons / 2);

    let startPage = Math.max(currentPage - middleButton, 1);
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }

    const buttons = [];
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          className={`px-2 py-1 mx-1 bg-gray-200 rounded-md ${
            currentPage === page ? "bg-indigo-600 text-white" : ""
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {isLoading ? (
        <p>Loading comments...</p>
      ) : isError ? (
        <p>Failed to load comments.</p>
      ) : (
        <>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="mb-2">
                  <strong>{comment.user}</strong>: {comment.content}
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-center mt-4">{renderPaginationButtons()}</div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-2">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                Your Comment:
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Your Name:
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Comment
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PostComments;
