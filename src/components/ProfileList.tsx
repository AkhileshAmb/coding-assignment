import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 border border-dashed border-[var(--border)] rounded-2xl">
        <p className="text-[var(--text-h)] font-medium">No profiles found</p>
        <p className="text-sm text-[var(--text)] mt-1 max-w-sm">
          Try a different search term or switch platforms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
}