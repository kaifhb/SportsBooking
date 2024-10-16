


import { RouterProvider,Route,createRoutesFromElements, createBrowserRouter } from "react-router-dom";

import CentresDisplayPages from "./Pages/CentresDisplayPages.jsx";
import SportsDisplayPage from "./Pages/SportsDisplayPage.jsx";
import BookCourtPage from "./Pages/BookCourtPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegistrationPage from "./Pages/RegisterationPage.jsx"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      
      <Route path="" element={<LoginPage />} />
      <Route path="centrePage" element={<CentresDisplayPages />} />
      <Route path="allSports" element={<SportsDisplayPage />} />
      <Route path="bookCourt" element={<BookCourtPage />} />
      <Route path="registrationPage" element={<RegistrationPage />} />
      


      
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;