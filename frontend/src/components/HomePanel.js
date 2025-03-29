import { Link } from 'react-router-dom';
import EventsImg from '../assets/events.jpg';
import classes from './HomePanel.module.css';
function HomePanel() {

  return (
    <main className={classes['content-panel']}>
      <h1>Welcome to the Events Logger</h1>
      <img src={EventsImg} alt="Events" />
      <p>Here you can find all the events in your city</p>
      <p>Click on the <Link to="/events">Events</Link> link to see all the events</p>
    </main>
  );
}

export default HomePanel;