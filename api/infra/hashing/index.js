import argon2 from "argon2";

export const createHash = (text) => {
  return argon2.hash(text);
};

export const verifyHash = (hash, text) => {
  return argon2.verify(hash, text);
};
