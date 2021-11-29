import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signup from "pages/signup";
import Signin from "pages/signin";
import Wallet from "pages/wallet";
import AuthUtils from "utils/auth";
import "react-toastify/dist/ReactToastify.css";

function PrivateRoute({ children }) {
  const auth = AuthUtils.getAuthToken();
  return auth ? children : <Navigate to="/signin" />;
}

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
