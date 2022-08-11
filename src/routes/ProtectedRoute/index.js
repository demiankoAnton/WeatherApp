import AccessDenied from '../../pages/AccessDenied';

export const ProtectedRoute = ({isLoggedIn, children}) => {
  if (!isLoggedIn) {
    return <AccessDenied />;
  }

  return children;
};

export default ProtectedRoute;
