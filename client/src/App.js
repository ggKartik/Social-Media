import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import Login from "./component/Login";
import Home from "./component/Home";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/userAction";
import { store } from "./store";
import ProtectedRoute from "./component/ProtectedRoute";
import Loader from "./styledComponents/Loader";
import ProfilePage from "./component/ProfilePage";
import Chat from "./component/ChatApp/Chat/Chat";
function App() {
  const { theme } = useSelector((state) => state.theme);
  const themeMode = useMemo(() => createTheme(themeSettings(theme)), [theme]);
  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={themeMode}>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
