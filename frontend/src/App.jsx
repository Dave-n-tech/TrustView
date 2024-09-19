import { Route, Routes } from "react-router-dom";
import { UserLandingPage } from "./pages/user/UserLandingPage";
import { ReviewsPage } from "./pages/user/ReviewsPage";
import { UserRegisterPage } from "./pages/user/UserRegisterPage";
import { UserDashboard } from "./pages/user/UserDashboard";
import { SubmitReview } from "./pages/user/SubmitReview";

import { BusinessLandingPage } from "./pages/business/BusinessLandingPage";
import { BusinessRegisterPage } from "./pages/business/BusinessRegisterPage";
import { BusinessDashboard } from "./pages/business/BusinessDashboard";
import { ReviewInvitePage } from "./pages/business/ReviewInvitePage";

import {LoginPage} from "./pages/shared/LoginPage"

function App() {
  return (
    <>
      <Routes>
        {/* user routes */}
        <Route path="/" element={<UserLandingPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/register/user" element={<UserRegisterPage />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/submit-review" element={<SubmitReview />} />

        {/* Business routes */}
        <Route path="/business" element={<BusinessLandingPage />} />
        <Route path="/register/business" element={<BusinessRegisterPage />} />
        <Route path="/dashboard/business" element={<BusinessDashboard />} />
        <Route path="/invite-review" element={<ReviewInvitePage />} />

        {/* shared Routes */}
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </>
  );
}

export default App;
