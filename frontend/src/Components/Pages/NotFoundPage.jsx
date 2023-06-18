import { Link } from "react-router-dom"
 
function NotFoundPage() {  
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      
      <div>You may comback to main page <Link to='/'>ССылка</Link></div>
    </div>
    
  );
}
  
export default NotFoundPage