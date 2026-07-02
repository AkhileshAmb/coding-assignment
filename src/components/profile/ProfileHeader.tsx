import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, Platform } from "@/types";

interface Props {
  user: FullUserProfile;
  platform: Platform;
}

export function ProfileHeader({
  user,
  platform,
}: Props) {
  return (
    <>
      <img
        src={user.picture}
        alt={`${user.fullname}'s profile picture`}
        className="w-24 h-24 rounded-full border border-[var(--border)] object-cover shrink-0 mx-auto sm:mx-0"
      />

      <div className="flex-1 w-full">
        <h2 className="!text-xl font-bold text-[var(--text-h)] flex items-center justify-center sm:justify-start">
          @{user.handle ?? user.username}
          <VerifiedBadge verified={user.is_verified} />
        </h2>

        <p className="text-[var(--text)] text-center sm:text-left">
          {user.fullname}
        </p>

        <p className="text-xs text-[var(--text)] mt-1 text-center sm:text-left">
          Platform: {platform}
        </p>
      </div>
    </>
  );
}