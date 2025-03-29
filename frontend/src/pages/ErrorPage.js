import { Link, useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError();
  
  let errorTitle = "404 Not Found";
  let errorMessage = "Could not find this page!";
  
  if(error.status === 500) {
    const errorData = error?.data ?? null;
    errorTitle = "500 Internal Server Error";
    errorMessage = errorData?.message ?? "An error occurred on the server!";
  }

  return <>
    <MainNavigation />
    <PageContent title={errorTitle}>
      <p style={{
        color: 'red',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
      }}>
        {
          errorMessage
        }
      </p>
      <p style={{
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
      }}>
        Click <Link to="/">here</Link> to return to the home page.
      </p>
    </PageContent>;  
  </>
}

export default ErrorPage;