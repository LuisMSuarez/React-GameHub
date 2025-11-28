export enum Sentiment {
  Neutral = "neutral",
  Like = "like",
  Dislike = "dislike",
}

export function parseSentiments(value: string): Sentiment[] {
  return value
    .split(",") // split on commas
    .map((v) => v.trim().toLowerCase()) // normalize casing
    .filter((v) => Object.values(Sentiment).includes(v as Sentiment))
    .map((v) => v as Sentiment);
}
