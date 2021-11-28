import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Signup from "pages/signup";
import Signin from "pages/signin";
import Wallet from "pages/wallet";

function PrivateRoute({ children }) {
  const auth = false;
  return auth ? children : <Navigate to="/signin" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />

        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Wallet />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
