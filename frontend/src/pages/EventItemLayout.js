import { Outlet, data } from "react-router-dom";

function EventItemLayout() {
  return <>
    <Outlet />
  </>
}

export default EventItemLayout;

export async function loader({ params }) {
  try {
    const response = await fetch(`http://localhost:8080/events/${params.id}`);
    if (!response.ok) {
      throw new Error('Failed fetching event from backend service!');
    } else {
      return response;
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