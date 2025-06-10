import { CommunityData } from "./types";
import CommunityCard from "./CommunityCard";

interface CommunitiesGridProps {
  communities: CommunityData[];
}

// Renderiza grade responsiva de CommunityCard
export default function CommunitiesGrid({ communities }: CommunitiesGridProps) {
  return (
    <div
      className="
      flex 
      flex-wrap
      *:flex-1
      *:basis-[13rem] 
      gap-6"
    >
      {communities.map((community) => (
        <CommunityCard key={community.id} {...community} />
      ))}
    </div>
  );
}
