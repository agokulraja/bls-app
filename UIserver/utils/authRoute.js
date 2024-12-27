// utils/authRoute.js
import Loader from "@/components/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const withAuthRedirect = (WrappedComponent) => {
  return function AuthProtectedComponent(props) {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
      if (!isAuthenticated) {
        sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
        loginWithRedirect(); // Redirect to Auth0 login
      }
    }, [isAuthenticated, loginWithRedirect]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return <Loader/>
}
};