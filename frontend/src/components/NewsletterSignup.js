import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';
import { useEffect, useRef } from 'react';

function NewsletterSignup() {

  const fetcher = useFetcher();
  const { data, state } = fetcher;
  const formRef = useRef();
  
  useEffect(
    () => {
      if(state === 'idle' && data?.message) {
        window.alert(data.message);
        formRef.current.reset();// Reset the form after submission
      }
    },
    [data, state]
  );

  return (
    <fetcher.Form method="post" className={classes.newsletter} action="/newsletter" ref={formRef}>
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;