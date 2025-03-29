// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Events from "./pages/Events";
import Home from "./pages/Home";
// import NewEvent from "./pages/NewEvent";
// import EventDetail from "./pages/EventDetail";
// import EditEvent from "./pages/EditEvent";
import EventsLayout from "./pages/EventsLayout";
import EventItemLayout from "./pages/EventItemLayout";
import { loader as EventsLoader } from "./pages/Events";
import { loader as EventLoader } from "./pages/EventItemLayout";
import EventItem from "./components/EventItem";
import { action as processFormDataAction } from "./components/EventForm";
import ErrorPage from "./pages/ErrorPage";
import EditEvent from "./pages/EditEvent";
import NewEvent from "./pages/NewEvent";
import { action as deleteEventAction } from "./components/EventItem";
import NewsletterPage from "./pages/Newsletter";
import { action as newsletterAction } from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: EventsLoader,
          },
          {
            path: "new",
            element: <NewEvent />,
            action: processFormDataAction
          },
          {
            id: "event-details",
            path: ":id",
            element: <EventItemLayout />,
            loader: EventLoader,
            children: [
              {
                index: true,
                element: <EventItem />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEvent />,
                action: processFormDataAction,
              },
            ],
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
