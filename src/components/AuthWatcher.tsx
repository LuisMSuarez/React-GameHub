import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useFeedbackStore } from "../feedbackStore";

export function AuthWatcher() {
  const { accounts, instance } = useMsal();
  const initializeFeedback = useFeedbackStore((s) => s.loadFeedback);

  useEffect(() => {
    if (accounts.length > 0) {
      // User is logged in, refresh feedback
      initializeFeedback(instance, accounts[0]);
    }
  }, [accounts, initializeFeedback]);

  return null; // invisible component that just runs the effect
}
