import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import classes from './EventForm.module.css';
import { useActionState } from 'react';

function EventForm() {
  const navigate = useNavigate();
  const data = useRouteLoaderData("event-details");
  const event = data?.event;

  function cancelHandler() {
    navigate(-1);
  }

  const processFormDataAction = async (prevState, formData) => {
    const enteredValues = {
      title: formData.get('title'),
      image: formData.get('image'),
      date: formData.get('date'),
      description: formData.get('description')
    };

    const errors = Object.entries(enteredValues).map(([key, value]) => {
      if (!value) {
        return { key, message: `${key} is required` };
      }
      return null;
    }).filter(Boolean);

    if (errors.length === 0) {
      if (prevState?.enteredValues?.id) {
        const response = await fetch(`http://localhost:8080/events/${prevState?.enteredValues?.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(enteredValues),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          navigate(-1);
        } else {
          console.log('Error updating event');
          return {
            errors: [{ key: 'general', message: 'Error updating event' }],
            enteredValues,
          };
        }

      } else {
        const response = await fetch('http://localhost:8080/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(enteredValues),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          navigate('..');
        } else {
          console.log('Error adding event');
          return {
            errors: [{ key: 'general', message: 'Error adding event' }],
            enteredValues,
          };
        }
      }
    }

    return {
      errors,
      enteredValues,
    };
  };

  const [
    formState,
    formAction,
    formPending,
  ] = useActionState(processFormDataAction, {
    errors: null,
    enteredValues: event ?? null,
  });

  if (data?.isError) {
    setTimeout(
      () => navigate('/events', { replace: true }),
      3000
    );
    return <p style={{
      color: 'red',
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }}>Error loading event
    </p>;
  }

  const {
    enteredValues,
    errors,
  } = formState;

  return (
    <form className={classes.form} action={formAction}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={enteredValues?.title} disabled={formPending} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={enteredValues?.image} disabled={formPending} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={enteredValues?.date} disabled={formPending} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={enteredValues?.description} disabled={formPending} />
      </p>
      {errors && (
        <ul>
          {errors.map((error) => (
            <li key={error.key}>{error.message}</li>
          ))}
        </ul>
      )}
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={formPending}>
          Cancel
        </button>
        <button disabled={formPending}>Save</button>
      </div>
    </form>
  );
}

export default EventForm;
