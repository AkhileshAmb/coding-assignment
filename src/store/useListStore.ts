import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";

// We extend UserProfileSummary to also store which platform
// the profile was added from, and when it was added.
export interface ListedProfile extends UserProfileSummary {
  platform: Platform;
  addedAt: number;
}

interface ListState {
  items: ListedProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => void;
  removeProfile: (userId: string, platform: Platform) => void;
  toggleProfile: (profile: UserProfileSummary, platform: Platform) => void;
  isInList: (userId: string, platform: Platform) => boolean;
  clear: () => void;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      items: [],

      addProfile: (profile, platform) => {
        // Prevent duplicate entries — check before adding
        const alreadyExists = get().items.some(
          (item) =>
            item.user_id === profile.user_id && item.platform === platform
        );
        if (alreadyExists) return;

        set((state) => ({
          items: [
            ...state.items,
            { ...profile, platform, addedAt: Date.now() },
          ],
        }));
      },

      removeProfile: (userId, platform) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.user_id === userId && item.platform === platform)
          ),
        }));
      },

      toggleProfile: (profile, platform) => {
        if (get().isInList(profile.user_id, platform)) {
          get().removeProfile(profile.user_id, platform);
        } else {
          get().addProfile(profile, platform);
        }
      },

      isInList: (userId, platform) =>
        get().items.some(
          (item) => item.user_id === userId && item.platform === platform
        ),

      clear: () => set({ items: [] }),
    }),
    {
      // This is the localStorage key your data is saved under
      name: "wobb-selected-list",
      storage: createJSONStorage(() => localStorage),
    }
  )
);