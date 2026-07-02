import { useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [clickCount, setClickCount] = useState(0);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = (username: string) => {
    setClickCount(clickCount + 1);
    console.log("Clicked profile:", username, "total clicks:", clickCount);
  };

  return (
    <Layout title="Find Influencers" subtitle="Browse top creators across social platforms">
      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-xs text-[var(--text)] mb-4 text-center sm:text-left">
        Showing {filtered.length} of {allProfiles.length} on {platform}
      </p>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}