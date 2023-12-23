export const capitalize = (text: string) => {
  if (!text) {
    return "";
  }

  if (typeof text !== "string") {
    return "";
  }

  const words = text.toLowerCase().trim().split(" ");

  let result = "";

  for (const [index, word] of words.entries()) {
    const capitalizedWord = word[0].toUpperCase() + word.slice(1);

    if (index === words.length - 1) {
      result += capitalizedWord;
    } else {
      result += capitalizedWord + " ";
    }
  }

  return result;
};
