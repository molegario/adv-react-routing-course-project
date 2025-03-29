import { Await, data, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function Events() {
  const { events } = useLoaderData();

  return (
    <Suspense
      fallback={<p style={{
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
      }}>Loading...</p>}
    >
      <Await resolve={events}>
        {
          (loadedEvents) => <EventsList events={loadedEvents} />
        }
      </Await>
    </Suspense>
  );
}

export default Events;

async function loadEvents() {
  try {
    const response = await fetch(
      "http://localhost:8080/events"
    );
    if (!response.ok) {
      throw new Error('Failed fetching events from backend service!');
    } else {
      const data = await response.json();
      return data.events;
    }
  } catch (error) {
    throw data(
      {
        message: error?.message ?? "Failed fetching events from backend service!",
      },
      {
        status: 500,
      }
    );
  }
}

export async function loader() {
  return {
    events: loadEvents(),
  };
}