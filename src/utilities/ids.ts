import { customAlphabet } from "nanoid";

const ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const NUMERIC_STRING = "0123456789";

export const charsGenerator = (length = 5) => customAlphabet(ALPHA_NUMERIC_STRING)(length);
export const numbersGenerator = (length = 5) => customAlphabet(NUMERIC_STRING)(length);

export const getUniqueCode = (length = 10) => `${charsGenerator(length / 2)}${numbersGenerator(length / 2)}`;
