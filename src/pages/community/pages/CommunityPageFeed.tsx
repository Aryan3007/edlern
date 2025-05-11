import { CommunityFeed } from "../comps/community-feed";
import { CommunitySidebar } from "../comps/community-sidebar";
import { useParams } from "react-router-dom";


export default function CommunityPageFeed() {

  const { community_id } = useParams<{ community_id: string }>();
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-4 gap-6 lg:py-6">
      <div className="hidden lg:block">
    <div className="sticky top-[97px]">
      <CommunitySidebar communityId={community_id || "exit"} />
    </div>
  </div>
      <div className="lg:col-span-3">
        <CommunityFeed communityId={community_id || "exit"} />
      </div>
      
    </div>
  )
}
