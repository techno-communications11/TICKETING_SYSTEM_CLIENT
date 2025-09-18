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


function SuperAdminComments({ ticketId, handleChangeStatus, detailTicket }) {
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [currentUserData, setCurrentUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.currentUser);
    const listRef = useRef(null);
    const [loader, setLoader] = useState(false);

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
        if (!commentInput.trim()) return setLoader(false);

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
        } finally {
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
            <div className="d-flex mt-2 align-items-center justify-content-end text-end" style={{ gap: "0px 10px" }}>
                <Button variant='contained' disabled={loading || detailTicket[0]?.status === 'close'} onClick={handleChangeStatus}>{loading ? <CircularProgress size={25} /> : "Closed"}</Button>

                <Button
                    variant="contained"
                    className=""
                    onClick={handleComments}
                    disabled={!commentInput.trim() || loader}
                >
                    {loader ? <CircularProgress size={25} /> : "Submit Comment"}
                </Button>
            </div>
        </div>
    );
}

export default SuperAdminComments