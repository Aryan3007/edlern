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
import CourseDetailPage from "./pages/community/pages/CourseDetailPage"
import MessagesPage from "./pages/community/pages/MessagesPage"
import ProfilePage from "./pages/community/pages/ProfilePage"
import SettingsPage from "./pages/community/pages/SettingsPage"
import MyCoursesPage from "./pages/community/pages/MyCoursesPage"

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
          <Route path="classroom/:courseId" element={<CourseDetailPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="leaderboards" element={<LeaderboardsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="my-courses" element={<MyCoursesPage />} />
          <Route path="/profile/setting" element={<SettingsPage />} />
          </Routes>
        </Layout>
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
