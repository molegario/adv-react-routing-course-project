import { Await, useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";
import { Suspense } from "react";

function EditEvent() {
  const {event} = useRouteLoaderData("event-details");
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
        (loadedEvent) => <EventForm method="patch" event={loadedEvent}/>
      }
      </Await>
    </Suspense>
  );
}

export default EditEvent;