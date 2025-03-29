import { Link, useRouteLoaderData, data, redirect, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem() {
  // const navigate = useNavigate();
  const data = useRouteLoaderData('event-details');
  const submit = useSubmit();

  // if (data?.isError) {
  //   setTimeout(
  //     () => navigate('/events', { replace: true }),
  //     3000
  //   );
  //   return <p style={{
  //     color: 'red',
  //     textAlign: 'center',
  //     fontSize: '1.5rem',
  //     fontWeight: 'bold',
  //   }}>Error loading event</p>;
  // }

  const event = data?.event;

  function startDeleteHandler() {
    // ...
    const proceed = window.confirm('Are you sure you want to delete this event?');
    if (proceed) {
      submit(null, {
        method: 'delete',
      });
    }
    // ...
  }

  return event && (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to={`edit`}>Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;

export async function action ({ params, request }) {
  const eventId = params.id;

  if(
    request.method !== 'DELETE' ||
    !eventId
  ) {
    throw data(
      {
        message: 'Invalid action requested!',
      },
      {
        status: 400,
      }
    );
  }

  try {
    const response = await fetch(`http://localhost:8080/events/${eventId}`, {
      method: request.method,
    });
  
    if (!response.ok) {
      throw new Error('Failed deleting event from backend service!');
    } else {
      return redirect('/events');
    }

  } catch (error) {
    throw data(
      {
        message: error?.message ?? "Failed deleting event from backend service!",
      },
      {
        status: 500,
      }
    );
  }
}
