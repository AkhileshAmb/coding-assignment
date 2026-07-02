import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, Platform, ProfileDetailResponse } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useListStore } from "@/store/useListStore";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") as Platform) || "instagram";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  const isInList = useListStore((state) => state.isInList);
  const toggleProfile = useListStore((state) => state.toggleProfile);

  useEffect(() => {
    if (!username) return;
    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-[var(--text)] text-center" role="status">
          Loading...
        </p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <div className="text-center">
          <p className="text-[var(--text-h)] mb-4">
            Could not load profile details for {username}
          </p>
          <Link to="/" className="text-[var(--accent)] text-sm underline">
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const profileInList = isInList(user.user_id, platform);

  const buttonLabel = profileInList ? "Added to List" : "Add to List";
  const buttonClass = profileInList
    ? "inline-block mt-5 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors cursor-pointer bg-[var(--accent)] border-[var(--accent)] text-white hover:opacity-90"
    : "inline-block mt-5 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors cursor-pointer bg-transparent border-[var(--border)] text-[var(--text-h)] hover:border-[var(--accent-border)] hover:text-[var(--accent)]";

  const handleAddToList = () => {
    toggleProfile(user, platform);
  };

  return (
    <Layout>
      <Link
        to="/"
        className="text-sm text-[var(--accent)] mb-6 inline-block no-underline hover:underline"
      >
        Back to search
      </Link>

      <div className="flex flex-col sm:flex-row gap-6 items-start text-left max-w-2xl mx-auto border border-[var(--border)] rounded-2xl p-6">
        <img
          src={user.picture}
          alt={`${user.fullname}'s profile picture`}
          className="w-24 h-24 rounded-full border border-[var(--border)] object-cover shrink-0 mx-auto sm:mx-0"
        />
        <div className="flex-1 w-full">
          <h2 className="!text-xl font-bold text-[var(--text-h)] flex items-center justify-center sm:justify-start">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-[var(--text)] text-center sm:text-left">{user.fullname}</p>
          <p className="text-xs text-[var(--text)] mt-1 text-center sm:text-left">
            Platform: {platform}
          </p>

          {user.description && (
            <p className="mt-3 text-sm text-[var(--text)]">{user.description}</p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="border border-[var(--border)] rounded-xl p-3">
              <div className="text-[var(--text)] text-xs">Followers</div>
              <div className="font-semibold text-[var(--text-h)] mt-0.5">
                {formatFollowersDetail(user.followers)}
              </div>
            </div>
            <div className="border border-[var(--border)] rounded-xl p-3">
              <div className="text-[var(--text)] text-xs">Engagement Rate</div>
              <div className="font-semibold text-[var(--text-h)] mt-0.5">
                {user.engagement_rate !== undefined
                  ? (user.engagement_rate * 10000).toFixed(2) + "%"
                  : "N/A"}
              </div>
            </div>
            {user.posts_count !== undefined && (
              <div className="border border-[var(--border)] rounded-xl p-3">
                <div className="text-[var(--text)] text-xs">Posts</div>
                <div className="font-semibold text-[var(--text-h)] mt-0.5">
                  {user.posts_count}
                </div>
              </div>
            )}
            {user.avg_likes !== undefined && (
              <div className="border border-[var(--border)] rounded-xl p-3">
                <div className="text-[var(--text)] text-xs">Avg Likes</div>
                <div className="font-semibold text-[var(--text-h)] mt-0.5">
                  {formatFollowersDetail(user.avg_likes)}
                </div>
              </div>
            )}
            {user.avg_comments !== undefined && (
              <div className="border border-[var(--border)] rounded-xl p-3">
                <div className="text-[var(--text)] text-xs">Avg Comments</div>
                <div className="font-semibold text-[var(--text-h)] mt-0.5">
                  {user.avg_comments}
                </div>
              </div>
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="border border-[var(--border)] rounded-xl p-3">
                <div className="text-[var(--text)] text-xs">Avg Views</div>
                <div className="font-semibold text-[var(--text-h)] mt-0.5">
                  {formatFollowersDetail(user.avg_views)}
                </div>
              </div>
            )}
            {user.engagements !== undefined && (
              <div className="border border-[var(--border)] rounded-xl p-3">
                <div className="text-[var(--text)] text-xs">Engagements</div>
                <div className="font-semibold text-[var(--text-h)] mt-0.5">
                  {formatEngagementRate(user.engagement_rate)}
                </div>
              </div>
            )}
          </div>

          {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-[var(--accent)] text-sm hover:underline"
            >
              View on platform
            </a>
          )}

          <div>
            <button onClick={handleAddToList} className={buttonClass}>
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}