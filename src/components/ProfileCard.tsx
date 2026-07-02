import { useNavigate } from "react-router-dom";
import type { KeyboardEvent, MouseEvent } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useListStore } from "@/store/useListStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const isInList = useListStore((state) =>
    state.isInList(profile.user_id, platform)
  );
  const toggleProfile = useListStore((state) => state.toggleProfile);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleAddToList = (e: MouseEvent) => {
    e.stopPropagation();
    toggleProfile(profile, platform);
  };

  const buttonClass = isInList
    ? "px-3 py-1.5 text-sm rounded-full font-medium border transition-colors cursor-pointer bg-[var(--accent)] border-[var(--accent)] text-white hover:opacity-90"
    : "px-3 py-1.5 text-sm rounded-full font-medium border transition-colors cursor-pointer bg-transparent border-[var(--border)] text-[var(--text-h)] hover:border-[var(--accent-border)] hover:text-[var(--accent)]";

  const buttonLabel = isInList ? "Added" : "Add to List";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`View profile for ${profile.fullname}`}
      className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] cursor-pointer transition-colors hover:border-[var(--accent-border)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      data-search={searchQuery}
    >
      <img
        src={profile.picture}
        alt={`${profile.fullname}'s profile picture`}
        loading="lazy"
        className="w-14 h-14 rounded-full object-cover border border-[var(--border)] shrink-0"
      />
      <div className="text-left flex-1 min-w-0">
        <div className="font-semibold text-[var(--text-h)] flex items-center truncate">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-[var(--text)] truncate">{profile.fullname}</div>
        <div className="text-xs text-[var(--text)] mt-0.5">
          {formatFollowersLocal(profile.followers)}
        </div>
      </div>
      <button onClick={handleAddToList} className={buttonClass} aria-pressed={isInList}>
        {buttonLabel}
      </button>
    </div>
  );
}