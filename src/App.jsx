/*  src/App.jsx  */
import React from "react";
import { BrowserRouter } from "react-router-dom";

import DrawerAppBar from "./components/DrawerAppBar";
import AppRouter from "./routes/AppRouter"; // adjust path if different

export default function App() {
  return (
    <BrowserRouter>
      {/* DrawerAppBar renders the maroon AppBar + Drawer only once */}
      <DrawerAppBar>
        {/* All page routes (Home, About, …) live inside AppRouter */}
        <AppRouter />
      </DrawerAppBar>
    </BrowserRouter>
  );
}
