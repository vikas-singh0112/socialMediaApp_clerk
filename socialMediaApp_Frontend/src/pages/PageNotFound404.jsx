import { useUser } from '@clerk/clerk-react';
import React from 'react'
import { Navigate } from 'react-router-dom';

function PageNotFound404() {
   const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>PageNotFound404</div>
  )
}

export default PageNotFound404