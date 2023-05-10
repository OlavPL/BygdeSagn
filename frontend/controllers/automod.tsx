export const badWords = Array<string>(
    "faen", "neger", "nigger", "retard", "mongo", "helvette", "fitte", "kuk", "hore",
     "cock", "cunt", "rævhål",
     )

export const filterBadWords = (text: string) => {
  let filteredText = text;
  badWords.forEach((word) => {
    const stars = "*".repeat(word.length-1);
    const regex = new RegExp(word, "gi"); // "gi" means "global" and "case-insensitive"
    filteredText = filteredText.replace(regex, word.charAt(0)+stars);
  });
  return filteredText
}

export const dislikeRatioThreshold = -10
export const minDislikes = 15