import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./components/CreateUser/CreateUser";
import VerifyEmail from "./components/Email/VerifyEmail";
import Home from "./components/Home/Home";
export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/verifyEmail/:userId" element={<VerifyEmail />} />
          <Route path="/" element={<CreateUser />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
