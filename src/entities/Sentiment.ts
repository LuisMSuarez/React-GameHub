export enum Sentiment {
  Neutral = "neutral",
  Like = "like",
  Dislike = "dislike",
}

export function parseSentiment(preferences: string): Sentiment {
  const sentiments = preferences
    .split(",") // split on commas
    .map((v) => v.trim().toLowerCase()) // normalize casing
    .filter((v) => Object.values(Sentiment).includes(v as Sentiment))
    .map((v) => v as Sentiment);

  return sentiments.includes(Sentiment.Like)
    ? Sentiment.Like
    : sentiments.includes(Sentiment.Dislike)
    ? Sentiment.Dislike
    : Sentiment.Neutral;
}
