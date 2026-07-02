import { Link } from "react-router-dom";
import { useListStore } from "@/store/useListStore";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";

function formatFollowers(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return String(count);
}

export function ListPage() {
  const items = useListStore((state) => state.items);
  const removeProfile = useListStore((state) => state.removeProfile);
  const clear = useListStore((state) => state.clear);

  const subtitle =
    items.length + " profile" + (items.length !== 1 ? "s" : "") + " selected";

  return (
    <Layout title="My Selected List" subtitle={subtitle}>
      {items.length === 0 ? (
        <div className="text-center py-16 px-4 border border-dashed border-[var(--border)] rounded-2xl">
          <p className="text-[var(--text-h)] font-medium">No profiles added yet</p>
          <p className="text-sm text-[var(--text)] mt-1">
            Go back to search and add profiles to build your list.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-4 py-2 rounded-full bg-[var(--accent)] text-white text-sm no-underline"
          >
            Browse profiles
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items
              .slice()
              .sort((a, b) => b.addedAt - a.addedAt)
              .map((profile) => (
                <div
                  key={profile.platform + "-" + profile.user_id}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)]"
                >
                  <Link
                    to={`/profile/${profile.username}?platform=${profile.platform}`}
                    className="flex items-center gap-4 flex-1 min-w-0 no-underline"
                  >
                    <img
                      src={profile.picture}
                      alt={`${profile.fullname}'s profile picture`}
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover border border-[var(--border)] shrink-0"
                    />
                    <div className="text-left min-w-0">
                      <div className="font-semibold text-[var(--text-h)] flex items-center truncate">
                        @{profile.username}
                        <VerifiedBadge verified={profile.is_verified} />
                      </div>
                      <div className="text-xs text-[var(--text)] truncate">
                        {profile.platform} - {formatFollowers(profile.followers)} followers
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => removeProfile(profile.user_id, profile.platform)}
                    aria-label={"Remove @" + profile.username + " from list"}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border border-[var(--border)] text-[var(--text)] hover:border-red-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={clear}
              className="text-xs text-[var(--text)] hover:text-red-500 underline cursor-pointer"
            >
              Clear entire list
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}