import { Route, Routes } from "react-router-dom";
import { UserLandingPage } from "./pages/user/UserLandingPage";
import { ReviewPage } from "./pages/user/ReviewPage";
import { UserRegisterPage } from "./pages/user/UserRegisterPage";
import { UserDashboard } from "./pages/user/UserDashboard";
import { SubmitReview } from "./pages/user/SubmitReview";
import { UserProfile } from "./pages/user/UserProfile";
import { BusinessProfile } from "./pages/user/BusinessProfile";

import { BusinessLandingPage } from "./pages/business/BusinessLandingPage";
import { BusinessRegisterPage } from "./pages/business/BusinessRegisterPage";
import { BusinessDashboard } from "./pages/business/BusinessDashboard";
import { ReviewInvitePage } from "./pages/business/ReviewInvitePage";
import { DashboardReviewPage } from "./pages/business/DashboardReviewPage";

import { LoginPage } from "./pages/shared/LoginPage";
import { UserLayout } from "./Layouts/UserLayout";
import { BusinessLayout } from "./Layouts/BusinessLayout";

// import { ProtectedRoute } from "./components/user/ProtectedRoute";
import { DashboardAnalytics } from "./pages/business/DashboardAnalytics";
import { ProfileSettings } from "./pages/business/ProfileSettings";
import { CustomerReview } from "./pages/user/CustomerReview";


function App() {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<UserLandingPage />} />
          <Route path="/reviews/:type/:id" element={<ReviewPage />} />
          <Route path="/register/user" element={<UserRegisterPage />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/submit-review/:companyId?" element={<SubmitReview />} />
          <Route path="/user/:id" element={<UserProfile/>} />
          <Route path="/company/:id/:name" element={<BusinessProfile />}/>
          <Route path="/login/:userType?" element={<LoginPage />} />
          <Route path="/customer-review-form/:companyId" element={<CustomerReview />} />
        </Route>

        <Route element={<BusinessLayout />}>
          <Route path="/business" element={<BusinessLandingPage />} />
          <Route path="/register/business" element={<BusinessRegisterPage />} />
        </Route>
          
        <Route path="/dashboard/business/:id" element={<BusinessDashboard />}>
          <Route path="/dashboard/business/:id/reviews" element={<DashboardReviewPage/>}/>
          <Route path="/dashboard/business/:id/analytics" element={<DashboardAnalytics />} />
          <Route path="/dashboard/business/:id/invite-review" element={<ReviewInvitePage />} />
          <Route path="/dashboard/business/:id/profile-settings" element={<ProfileSettings />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;

// Todo:
// fix token verification route
// create util function to get user data using id
// create hamburger menu for mobile