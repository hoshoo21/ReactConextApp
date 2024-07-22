import classes from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
function NewsletterRegistration() {
  const inputEmailRef = useRef();

  const notificationCtx = useContext(NotificationContext);


  const submitData = async () => {

  }
  const registrationHandler = async (event) => {
    event.preventDefault();
    notificationCtx.showNotification({
      title: 'signing users',
      message: 'Registering user',
      status: 'pending'
    })
    const enteredEmail = inputEmailRef.current.value;
    const reqbody = {
      email: enteredEmail
    }
    // fetch user input (state or refs)
    const res = await fetch('/api/registration', {
      method: 'POST',
      body: JSON.stringify(reqbody),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!res.ok) {
      const errordesc = await res.text();
      notificationCtx.showNotification({
        title: 'Error ',
        message: ' Newsletter registration failed',
        status: 'error'
      })
    }
    else {
      const data = await res.json();
      console.log(data)
      notificationCtx.showNotification({
        title: 'Success',
        message: ' Newsletter registration Done',
        status: 'success'
      })
    }

  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={inputEmailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
