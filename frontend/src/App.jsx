


import { RouterProvider,Route,createRoutesFromElements, createBrowserRouter } from "react-router-dom";

import CentresDisplayPages from "./Pages/CentresDisplayPages.jsx";
import SportsDisplayPage from "./Pages/SportsDisplayPage.jsx";
import BookCourtPage from "./Pages/BookCourtPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegistrationPage from "./Pages/RegisterationPage.jsx"
import AddCentrePage from "./Pages/AddCentrePage.jsx";
import AddSportsPage from "./Pages/AddSportsPage.jsx";
import AddCourtPage from "./Pages/AddCourtPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      
      <Route path="" element={<LoginPage />} />
      <Route path="centrePage" element={<CentresDisplayPages />} />
      <Route path="allSports" element={<SportsDisplayPage />} />
      <Route path="bookCourt" element={<BookCourtPage />} />
      <Route path="registrationPage" element={<RegistrationPage />} />
      <Route path="addCentre" element={<AddCentrePage />} />
      <Route path="addSports" element={<AddSportsPage />} />
      <Route path="addCourt/:sportId/:centreId" element={<AddCourtPage />} />
      


      
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;