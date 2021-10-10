const arabicNumTranslationMap = new Map();
arabicNumTranslationMap.set("٠", 0);
arabicNumTranslationMap.set("١", 1);
arabicNumTranslationMap.set("٢", 2);
arabicNumTranslationMap.set("٣", 3);
arabicNumTranslationMap.set("٤", 4);
arabicNumTranslationMap.set("٥", 5);
arabicNumTranslationMap.set("٦", 6);
arabicNumTranslationMap.set("٧", 7);
arabicNumTranslationMap.set("٨", 8);
arabicNumTranslationMap.set("٩", 9);

export function numFromArabicToEnglish(number) {
  const numStr = `${number}`;
  return [...numStr].map((num) => arabicNumTranslationMap.get(num)).join("");
}

export function isEnglishNumber(number) {
  const numberStr = `${number}`;
  const regex = /\d/;
  return regex.test(numberStr);
}
