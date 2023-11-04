// // ProtectedRoute.js
// import React, { useContext } from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { UserContext } from './UserContext';


// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { isAuthenticated } = useContext(UserContext);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Redirect element={'logging'} /> : <Component {...props} />
//       }
//     />
//   );
// };

// export default ProtectedRoute;
