import { data, Form, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const data = useActionData();

  function cancelHandler() {
    navigate(-1);
  }
  
  return (
    <Form className={classes.form} method={method} noValidate>
      {data?.errors && (
        <>
          <p style={{ color: 'red' }}>
            {data?.message}
          </p>
          <ul>
            {Object.entries(data.errors).map(([key, message]) => (
              <li key={key} style={{ color: 'red' }}>
                {message}
              </li>
            ))}
          </ul>
        </>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event?.title} disabled={isSubmitting} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event?.image} disabled={isSubmitting} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event?.date} disabled={isSubmitting} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event?.description} disabled={isSubmitting} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({request, params}) {
  const formData = await request.formData();
  
  const eventData = {
    title: formData.get('title'),
    image: formData.get('image'),
    date: formData.get('date'),
    description: formData.get('description'),
  };
  
  const method = request.method;
  
  const url = method === 'PATCH'
    ? `http://localhost:8080/events/${params.id}`
    : 'http://localhost:8080/events';

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if(response.status === 422) {
      return response;
    }

    if(!response.ok) {
      throw new Error(`Failed to ${method === 'POST' ? 'create' : 'update'} event post!`);
    } else {
      return method === 'POST' ? redirect('/events') : redirect(`/events/${params.id}`);
    }
  } catch (error) {
    throw data(
      {
        message: error?.message ? `ERROR: ${error.message}` : `Failed to  ${method === 'POST' ? 'create' : 'update'} event data!`,
      },
      {
        status: 500,
      }
    );
  }
}