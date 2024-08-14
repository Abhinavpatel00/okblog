import React from "react";
import { useDebounce } from "react-use";
import useSWR, { SWRConfiguration } from "swr";

const API_URL = `/api/dislike`;

type MetricsPayload = {
  dislikes: number;
  currentUserDislikes: number;
};

async function getPostDislikes(slug: string): Promise<MetricsPayload> {
  const res = await fetch(API_URL + `/${slug}`);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
}

async function updatePostDislikes(slug: string, count: number): Promise<MetricsPayload> {
  const res = await fetch(API_URL + `/${slug}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count }),
  });

  if (!res.ok) {
    throw new Error("An error occurred while posting the data.");
  }

  return res.json();
}

// A custom hook to abstract away fetching and updating a user's dislikes
export const usePostDislikes = (slug: string, config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR(
    [API_URL, slug],
    () => getPostDislikes(slug),
    {
      dedupingInterval: 60000,
      ...config,
    },
  );

  const [batchedDislikes, setBatchedDislikes] = React.useState(0);

  const increment = () => {
    // Prevent the user from disliking more than 3 times
    if (!data || data.currentUserDislikes >= 3) {
      return;
    }

    // Optimistic ui pattern
    // update the local swr cache so dislike count updates immediately for the user
    // while we update the database
    mutate(
      {
        dislikes: data.dislikes + 1,
        currentUserDislikes: data.currentUserDislikes + 1,
      },
      false,
    );

    // use local state and debounce to batch updates
    setBatchedDislikes(batchedDislikes + 1);
  };

  useDebounce(
    () => {
      if (batchedDislikes === 0) return;

      // update the database and use the data updatePostDislikes returns to update
      // the local cache with database data
      mutate(updatePostDislikes(slug, batchedDislikes));
      setBatchedDislikes(0);
    },
    1000,
    [batchedDislikes],
  );

  return {
    currentUserDislikes: data?.currentUserDislikes,
    dislikes: data?.dislikes,
    isLoading: !error && !data,
    isError: !!error,
    increment,
  };
};
