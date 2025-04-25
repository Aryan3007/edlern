import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import DiscoverPage from "./pages/DiscoverPage"
import CategoryPage from "./pages/CategoryPage"
import CommunityPage from "./pages/CommunityPage"
import ExpertPage from "./pages/ExpertPage"
import AllExpertsPage from "./pages/AllExpertsPage"
import NotFound from "./pages/NotFound"
import CommunityPageFeed from "./pages/community/pages/CommunityPageFeed"
import Layout from "./pages/community/layout/layout"
import ClassroomPage from "./pages/community/pages/ClassroomPage"
import MembersPage from "./pages/community/pages/MembersPage"
import LeaderboardsPage from "./pages/community/pages/LeaderboardsPage"
import AboutPage from "./pages/community/pages/AboutPage"
import AdminPage from "./pages/communityAdmin/pages/AdminPage"
import AdminLayout from "./pages/communityAdmin/adminlayout/adminLayout"

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


        {/* Community routes */} 
        <Route path="/community/*" element={
          <Layout>
          <Routes>
          <Route path="feed" element={<CommunityPageFeed />} />
          <Route path="classroom" element={<ClassroomPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="leaderboards" element={<LeaderboardsPage />} />
          <Route path="about" element={<AboutPage />} />
          </Routes>
        </Layout>
      } /> 
      
      <Route path="/admin/*" element={
          <AdminLayout>
          <Routes>
          <Route path="dashboard" element={<AdminPage />} />
          <Route path="classroom" element={<ClassroomPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="leaderboards" element={<LeaderboardsPage />} />
          <Route path="about" element={<AboutPage />} />
          </Routes>
        </AdminLayout>
      } />


        {/* Community routes under Layout */}
        {/* <Route path="/community/*" element={
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
        } /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
