import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import Layout from "./pages/community/layout/layout"
import MembersPage from "./pages/community/pages/MembersPage"
import CoursesPage from "./pages/community/pages/CoursesPage"
import ChatPage from "./pages/community/pages/ChatPage"
import ProfilePage from "./pages/community/pages/ProfilePage"
import EventsPage from "./pages/community/pages/EventsPage"
import AllCourses from "./pages/community/pages/AllCourses"
import DashboardPage from "./pages/community/pages/DashboardPage"
import CommunityBlog from "./pages/community/pages/CommunityBlog"
import ExplorePage from "./pages/community/pages/Explorepage"
import ManageCommunityPage from "./pages/community/manage/ManageCommunityPage"
import CommunityActivityPage from "./pages/community/manage/CommunityActivityPage"
import PendingApprovalsPage from "./pages/community/manage/PendingApprovalsPage"
import DiscoverPage from "./pages/DiscoverPage"
import CategoryPage from "./pages/CategoryPage"
import CommunityPage from "./pages/CommunityPage"
import ExpertPage from "./pages/ExpertPage"
import AllExpertsPage from "./pages/AllExpertsPage"
import NotFound from "./pages/NotFound"

const App = () => {
  return (
    <div>
      <Routes>
        {/* Normal routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/expert/:id" element={<ExpertPage />} />
        <Route path="/experts" element={<AllExpertsPage />} />
        <Route path="/community-details/:id" element={<CommunityPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />

        {/* Community routes under Layout */}
        <Route path="/community/*" element={
          <Layout>
            <Routes>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="blog" element={<CommunityBlog />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="courses" element={<AllCourses />} />
              <Route path="courses/:courseId" element={<CoursesPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="profile" element={<ProfilePage />} />


              <Route path="manage/:communityId" element={<ManageCommunityPage />} />
              <Route path="manage/:communityId/activity" element={<CommunityActivityPage />} />
              <Route path="manage/:communityId/pending" element={<PendingApprovalsPage />} />
            </Routes>
          </Layout>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
