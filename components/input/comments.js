import { useState, useContext } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';
import Notification from '../ui/notification';
function Comments(props) {
  const { eventId } = props;
  const [loadedComments, setLoadedComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const notificationCtx = useContext(NotificationContext);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  let loadingNotification = {};
  const loadComments = async () => {
    setIsFetchingComments(true)
    loadingNotification = {
      title: 'Loading',
      message: 'Comments loading',
      status: 'pending'
    };
    fetch('/api/comment/' + eventId)
      .then((resp) => {

        if (!resp.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Something went wrong!');

          });

        }
        else {
          return resp.json()
        }
      })
      .then((data) => {

        setLoadedComments(data.comments);
        loadingNotification = {
          title: 'Success',
          message: 'Comments Loaded Successfully',
          status: 'success'
        };
        setIsFetchingComments(false);
      })
      .catch((error) => {
        loadingNotification = {
          title: 'Error',
          message: error,
          status: 'error'
        };
        setIsFetchingComments(false);
      });

  };
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    if (!showComments) {
      loadComments();
    }

  }

  const addCommentHandler = async (commentData) => {
    commentData.eventId = props.eventId;
    notificationCtx.showNotification({
      title: 'Saving',
      message: 'Saving Comments',
      status: 'pending'
    })
    fetch('/api/comment/' + props.eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(`Error: ${err.message || response.statusText}`);
          });
        }
        return response.json();
      })
      .then(data => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Comment Saved successfully',
          status: 'success'
        });
        console.log(data);
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error',
          message: eror,
          status: 'error'
        });
      });


  }







  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {loadedComments && loadedComments.length > 0 && !isFetchingComments && <CommentList items={loadedComments} />}
      {loadComments && isFetchingComments && <Notification title={loadComments.title}
        message={loadComments.message}
        status={loadComments.status}
      />}
    </section>
  );
}

export default Comments;
