
// import { useEffect, useState } from "react";

// type Comment = {
//   id: string;
//   createdAt: string;
//   content: string;
//   user: string;
// };

// type UseCommentsResult = {
//   comments: Comment[];
//   isLoading: boolean;
//   isError: boolean;
//   addComment: (content: string, user: string) => Promise<void>;
//   fetchPage: (page: number, pageSize: number) => Promise<void>;
// };

// const useComments = (slug: string): UseCommentsResult => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [lastCommentTime, setLastCommentTime] = useState<number>(0);

//   const fetchComments = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`/api/comments/${slug}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch comments");
//       }
//       const data = await response.json();
//       setComments(data);
//       setIsLoading(false);
//     } catch (error) {
//       setIsError(true);
//       setIsLoading(false);
//     }
//   };

//   const addComment = async (content: string, user: string) => {
//     try {
//       const currentTime = Date.now();
//       const fiveMinutesAgo = currentTime - 5 * 60 * 1000;

//       if (lastCommentTime > fiveMinutesAgo) {
//         throw new Error("You can only add a new comment every 5 minutes.");
//       }

//       const response = await fetch(`/api/comments/${slug}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           content,
//           user,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add comment");
//       }

//       setLastCommentTime(currentTime);
//       await fetchComments();
//     } catch (error) {
//       setIsError(true);
//     }
//   };

//   const fetchPage = async (page: number, pageSize: number) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`/api/comments/${slug}?page=${page}&pageSize=${pageSize}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch comments");
//       }
//       const data = await response.json();
//       setComments(data);
//       setIsLoading(false);
//     } catch (error) {
//       setIsError(true);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   return {
//     comments,
//     isLoading,
//     isError,
//     addComment,
//     fetchPage,
//   };
// };

// export default useComments;
