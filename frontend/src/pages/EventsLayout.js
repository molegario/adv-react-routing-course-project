import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

function EventsLayout() {
  return <>
    <EventsNavigation />
    <Outlet />
  </>
}

export default EventsLayout;