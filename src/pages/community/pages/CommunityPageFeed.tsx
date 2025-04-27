import { CommunityFeed } from "../comps/community-feed";
import { CommunitySidebar } from "../comps/community-sidebar";


export default function CommunityPageFeed() {
  
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-4 gap-6 lg:py-6">
      <div className="hidden lg:block">
    <div className="sticky top-[97px]">
      <CommunitySidebar />
    </div>
  </div>
      <div className="lg:col-span-3">
        <CommunityFeed />
      </div>
      
    </div>
  )
}
