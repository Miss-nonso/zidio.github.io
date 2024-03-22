import "./App.css";
import UserContextProvider from "./Context/UserContextProvider";
import { indexRoutes } from "./routes/indexRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            {indexRoutes.map(({ component: Component, ...item }) => {
              return (
                <Route
                  path={item.path}
                  element={<Component />}
                  key={item.name}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
