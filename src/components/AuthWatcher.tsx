import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useFeedbackStore } from "../store/feedbackStore";
import { fetchUserGames } from "@/services/fetchUserGames";

export function AuthWatcher() {
  const { accounts, instance } = useMsal();
  const loadFeedback = useFeedbackStore((s) => s.loadFeedback);

  // When the user authenticates, we load usergames from the api into the feedback store
  useEffect(() => {
    const run = async () => {
      if (accounts.length > 0) {
        try {
          const items = await fetchUserGames(instance, accounts[0]);
          loadFeedback(items);
        } catch (err) {
          console.error("Failed to initialize feedback:", err);
        }
      }
    };
    run();
  }, [accounts, instance, loadFeedback]);

  return null;
}
