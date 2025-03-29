import { Outlet, data } from "react-router-dom";

function EventItemLayout() {
  return <>
    <Outlet />
  </>
}

export default EventItemLayout;

async function loadEvent(params) {
  try {
    const response = await fetch(`http://localhost:8080/events/${params.id}`);
    if (!response.ok) {
      throw new Error('Failed fetching event from backend service!');
    } else {
      const data = await response.json();
      return data.event;
    }
  } catch (error) {
    throw data(
      {
        message: error?.message ?? "Failed fetching event from backend service!",
      },
      {
        status: 500,
      }
    );
  }
}

export async function loader({ params }) {
  return {
    event: loadEvent(params),
  };
}