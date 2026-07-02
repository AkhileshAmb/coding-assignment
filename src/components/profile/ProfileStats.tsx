import type { FullUserProfile } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { InfoCard } from "./InfoCard";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

interface Props {
  user: FullUserProfile;
}

export function ProfileStats({
  user,
}: Props) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

      <InfoCard
        title="Followers"
        value={formatFollowersDetail(user.followers)}
      />

      <InfoCard
        title="Engagement Rate"
        value={
          user.engagement_rate !== undefined
            ? (user.engagement_rate * 10000).toFixed(2) + "%"
            : "N/A"
        }
      />

      {user.posts_count !== undefined && (
        <InfoCard
          title="Posts"
          value={user.posts_count}
        />
      )}

      {user.avg_likes !== undefined && (
        <InfoCard
          title="Avg Likes"
          value={formatFollowersDetail(user.avg_likes)}
        />
      )}

      {user.avg_comments !== undefined && (
        <InfoCard
          title="Avg Comments"
          value={user.avg_comments}
        />
      )}

      {user.avg_views !== undefined &&
        user.avg_views > 0 && (
          <InfoCard
            title="Avg Views"
            value={formatFollowersDetail(user.avg_views)}
          />
        )}

      {user.engagements !== undefined && (
        <InfoCard
          title="Engagements"
          value={formatEngagementRate(user.engagement_rate)}
        />
      )}

    </div>
  );
}