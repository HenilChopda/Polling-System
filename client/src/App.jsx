import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePoll from "./pages/CreatePoll";
import VotePoll from "./pages/VotePoll";
import Home from "./pages/Home";
import Headers from "./components/Headers";
import axios from "axios";
import ContextProvider from "./components/ContextProvider";
import UserProfile from "./pages/UserProfile";
import CommentPage from "./pages/CommentPage";

axios.defaults.baseURL = "http://localhost:7000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <ContextProvider>
        <Headers />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createpoll" element={<CreatePoll />} />
          <Route path="/votepoll" element={<VotePoll />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/comments" element={<CommentPage />} />
        </Routes>
      </ContextProvider>
    </Router>
  );
}

export default App;
