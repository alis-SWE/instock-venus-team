import { Link } from "react-router-dom";
import './NotFoundPage.scss'

const NotFoundPage = () => {
    return ( 
        <div className="not-found">
            <h2 className="not-found__header">404 Page Not Found</h2>
            <p className="not-found-message">The requested page was not found.</p>
            <Link to={'/'}>Back to homepage</Link>
        </div>
     );
}
 
export default NotFoundPage;