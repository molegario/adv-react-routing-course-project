import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEvent() {
  const data = useRouteLoaderData("event-details");
  const event = data.event;
  return (
    <>
      <EventForm method="patch" event={event}/>
    </>
  );
}

export default EditEvent;