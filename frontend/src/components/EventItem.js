import { Link, useRouteLoaderData, data, redirect, useSubmit, Await } from 'react-router-dom';
import classes from './EventItem.module.css';
import { Suspense } from 'react';

function EventItem() {
  const { event } = useRouteLoaderData('event-details');
  const submit = useSubmit();

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

  return (
    <Suspense
      fallback={<p style={{
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
      }}>Loading...</p>}
    >
      <Await resolve={event}>
        {
          (loadedEvent) => (
            <article className={classes.event}>
              <img src={loadedEvent.image} alt={loadedEvent.title} />
              <h1>{loadedEvent.title}</h1>
              <time>{loadedEvent.date}</time>
              <p>{loadedEvent.description}</p>
              <menu className={classes.actions}>
                <Link to={`edit`}>Edit</Link>
                <button onClick={startDeleteHandler}>Delete</button>
              </menu>
            </article>
          )
        }
      </Await>

    </Suspense>
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
