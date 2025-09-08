// // import React, { useCallback, useEffect, useState } from 'react'
// // import { addCommentServices, getCommentServices } from '../Services/comments.services';
// // import { Avatar, Button, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
// // import { useSelector } from 'react-redux';

// // function ManagerComments({ ticketId }) {
// //     // const [comments, setComments] = useState([
// //     //     { user: "John Doe", text: "This ticket needs urgent attention!", time: "10:30 AM" },
// //     //     { user: "Alice Smith", text: "Noted, will look into it.", time: "10:45 AM" },
// //     //     { user: "Robert Johnson", text: "We need more details on this.", time: "11:00 AM" },
// //     //     { user: "Emily Davis", text: "I'll handle this ticket.", time: "11:15 AM" },
// //     //     { user: "Michael Brown", text: "Please update the status.", time: "11:30 AM" },
// //     //     { user: "Sarah Connor", text: "Ticket is under review.", time: "11:45 AM" }
// //     // ]);
// //      const [comments, setComments] = useState([]);
// //     const [commentInput, setCommentInput] = useState("");
// //     const [currentUserData, setCurrentUserData] = useState([]);
// //     const { user } = useSelector((state) => state.currentUser);
// //     const fetchUser = useCallback(async () => {
// //         const currentDatauser = await user;
// //         // console.log(currentDatauser)
// //         setCurrentUserData(currentDatauser);
// //     }, [user]);
// //     const fetchAllComments = useCallback(async () => {
// //         try {
// //             const response = await getCommentServices();
// //             const filterationComments=await response.data.filter((comments)=>comments.ticketId===ticketId)
// //             setComments(filterationComments);
// //             console.log("Fetched comments successfully", filterationComments);
// //         } catch (error) {
// //             console.log("Error fetching comments", error.message);
// //         }
// //     }, [])
// //     useEffect(() => {
// //         fetchUser();
// //     }, [fetchUser])
// //     useEffect(() => {
// //         fetchAllComments();
// //     }, [fetchAllComments])
// //     const handleComments = async () => {
// //         try {
// //             const newComment = {
// //                 ticketId: ticketId,
// //                 userId: currentUserData?._id,
// //                 content: commentInput,
// //                 userName: currentUserData?.name
// //             };
// //             const response = await addCommentServices(newComment);
// //         } catch (error) {
// //             console.log("ERROR FROM MANAGER COMMENTS", error.message);
// //         }
// //     }
// //     return (
// //         <div className="mt-4">
// //             <Typography variant="h5" gutterBottom>Comments</Typography>
// //             <List className="mb-3 py-3 px-3 border border-dark rounded-3 bg-white" style={{ height: "400px", overflow: "auto" }}>
// //                 {comments?.map((comment, index) => (
// //                     <ListItem key={index} alignItems="flex-start" style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }} className="d-flex">
// //                         <Avatar>{comment.userName.charAt(0)}</Avatar>
// //                         <ListItemText
// //                             className="ms-3"
// //                             primary={<Typography variant="subtitle2" fontWeight="bold">{comment.userName}</Typography>}
// //                             secondary={
// //                                 <>
// //                                     <Typography variant="body2" style={{ background: "#f4f6f8", padding: "8px", borderRadius: "10px" }}>{comment.content}</Typography>
// //                                     <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginTop: "5px" }}>{comment.createdAt}</Typography>
// //                                 </>
// //                             }
// //                         />
// //                     </ListItem>
// //                 ))}
// //             </List>
// //             <TextField
// //                 multiline
// //                 rows={3}
// //                 fullWidth
// //                 variant="outlined"
// //                 value={commentInput}
// //                 onChange={(e) => setCommentInput(e.target.value)}
// //                 placeholder="Add a comment..."
// //             />
// //             <div className="text-end">
// //                 <Button variant='contained' className="mt-2" onClick={handleComments}>Submit Comment</Button>
// //             </div>
// //         </div>
// //     )
// // }

// // export default ManagerComments

// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   Avatar,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Skeleton,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { addCommentServices, getCommentServices } from '../Services/comments.services';

// function ManagerComments({ ticketId }) {
//   const [comments, setComments] = useState([]);
//   const [commentInput, setCommentInput] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [currentUserData, setCurrentUserData] = useState([]);
//   const { user } = useSelector((state) => state.currentUser);
//   const bottomRef = useRef(null);

//   const fetchUser = useCallback(async () => {
//     const currentDatauser = await user;
//     setCurrentUserData(currentDatauser);
//   }, [user]);

//   const fetchAllComments = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await getCommentServices();
//       const filteredComments = response.data.filter(
//         (comment) => comment.ticketId === ticketId
//       );
//       setComments(filteredComments);
//       setLoading(false);
//     } catch (error) {
//       console.log('Error fetching comments', error.message);
//       setLoading(false);
//     }
//   }, [ticketId]);

//   useEffect(() => {
//     fetchUser();
//     fetchAllComments();
//   }, [fetchUser, fetchAllComments]);

//   useEffect(() => {
//     if (!loading) {
//       bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [comments, loading]);

//   const handleComments = async () => {
//     try {
//       const newComment = {
//         ticketId: ticketId,
//         userId: currentUserData?._id,
//         content: commentInput,
//         userName: currentUserData?.name,
//       };
//       await addCommentServices(newComment);
//       setCommentInput('');
//       fetchAllComments(); // refresh comments after posting
//     } catch (error) {
//       console.log('ERROR FROM MANAGER COMMENTS', error.message);
//     }
//   };

//   return (
//     <div className="mt-4">
//       <Typography variant="h5" gutterBottom>
//         Comments
//       </Typography>

//       <div
//         className="mb-3 py-3 px-3 border border-dark rounded-3 bg-white"
//         style={{ height: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
//       >
//         <List style={{ flex: 1 }}>
//           {loading ? (
//             Array.from(new Array(4)).map((_, i) => (
//               <ListItem key={i} alignItems="flex-start">
//                 <Skeleton variant="circular" width={40} height={40} />
//                 <ListItemText
//                   className="ms-3"
//                   primary={<Skeleton width="30%" />}
//                   secondary={
//                     <>
//                       <Skeleton width="100%" height={30} />
//                       <Skeleton width="40%" height={20} style={{ marginTop: 5 }} />
//                     </>
//                   }
//                 />
//               </ListItem>
//             ))
//           ) : comments.length === 0 ? (
//             <Typography variant="body2" color="textSecondary" className="text-center">
//               No comments found yet.
//             </Typography>
//           ) : (
//             comments.map((comment, index) => (
//               <ListItem
//                 key={index}
//                 alignItems="flex-start"
//                 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}
//               >
//                 <Avatar>{comment.userName?.charAt(0)}</Avatar>
//                 <ListItemText
//                   className="ms-3"
//                   primary={
//                     <Typography variant="subtitle2" fontWeight="bold">
//                       {comment.userName}
//                     </Typography>
//                   }
//                   secondary={
//                     <>
//                       <Typography
//                         variant="body2"
//                         style={{
//                           background: '#f4f6f8',
//                           padding: '8px',
//                           borderRadius: '10px',
//                         }}
//                       >
//                         {comment.content}
//                       </Typography>
//                       <Typography
//                         variant="caption"
//                         color="textSecondary"
//                         style={{ display: 'block', marginTop: '5px' }}
//                       >
//                         {new Date(comment.createdAt).toLocaleString()}
//                       </Typography>
//                     </>
//                   }
//                 />
//               </ListItem>
//             ))
//           )}
//           <div ref={bottomRef} />
//         </List>
//       </div>

//       <TextField
//         multiline
//         rows={3}
//         fullWidth
//         variant="outlined"
//         value={commentInput}
//         onChange={(e) => setCommentInput(e.target.value)}
//         placeholder="Add a comment..."
//       />
//       <div className="text-end">
//         <Button
//           variant="contained"
//           className="mt-2"
//           onClick={handleComments}
//           disabled={!commentInput.trim()}
//         >
//           Submit Comment
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ManagerComments;



import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { addCommentServices, getCommentServices } from '../Services/comments.services';

function ManagerComments({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [currentUserData, setCurrentUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.currentUser);
  const listRef = useRef(null);
  const[loader,setLoader]=useState(false);

  const fetchUser = useCallback(async () => {
    const currentDatauser = await user;
    setCurrentUserData(currentDatauser);
  }, [user]);

  const fetchAllComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCommentServices();
      const filteredComments = response.data.filter(
        (comment) => comment.ticketId == ticketId
      );
      setComments(filteredComments);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching comments', error.message);
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchAllComments();
  }, [fetchAllComments]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [comments]);

  const handleComments = async () => {
    setLoader(true)
    if (!commentInput.trim()) return  setLoader(false);

    try {
      const newComment = {
        ticketId,
        userId: currentUserData?.id,
        content: commentInput,
        userName: currentUserData?.name,
      };
      // console.log(newComment)
      await addCommentServices(newComment);
      setCommentInput('');
      fetchAllComments();
    } catch (error) {
        setLoader(false)
      console.log('ERROR FROM MANAGER COMMENTS', error.message);
    }finally{
        setLoader(false)
    }
  };

  return (
    <div className="mt-4">
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>

      <List
        ref={listRef}
        className="mb-3 py-3 px-3 border border-dark rounded-3 bg-white"
        style={{ height: '400px', overflowY: 'auto' }}
      >
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <ListItem key={index}>
              <Skeleton variant="circular" width={40} height={40} />
              <ListItemText
                className="ms-3"
                primary={<Skeleton width="30%" />}
                secondary={<>
                <Skeleton width="80%" height={50} />
                <Skeleton width="13%" height={25} />
                </>}
              />
            </ListItem>
          ))
        ) : comments.length === 0 ? (
          <Typography variant="body2" className="text-center w-100 text-muted">
            No comments found.
          </Typography>
        ) : (
          comments.map((comment, index) => (
            <ListItem
              key={index}
              alignItems="flex-start"
              style={{
                borderBottom: '1px solid #eee',
                paddingBottom: '10px',
              }}
              className="d-flex"
            >
              <Avatar>{comment.userName?.charAt(0)}</Avatar>
              <ListItemText
                className="ms-3"
                primary={
                  <Typography variant="subtitle2" fontWeight="bold">
                    {comment.userName}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      variant="body2"
                      style={{
                        background: '#f4f6f8',
                        padding: '8px',
                        borderRadius: '10px',
                      }}
                    >
                      {comment.content}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      style={{ display: 'block', marginTop: '5px' }}
                    >
                      {new Date(comment.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))
        )}
      </List>

      <TextField
        multiline
        rows={3}
        fullWidth
        variant="outlined"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="Add a comment..."
      />
      <div className="text-end">
        <Button
          variant="contained"
          className="mt-2"
          onClick={handleComments}
          disabled={!commentInput.trim() || loader}
        >
          {loader?<CircularProgress size={25}/>: "Submit Comment"}
        </Button>
      </div>
    </div>
  );
}

export default ManagerComments;
