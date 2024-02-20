"use server"

const dictionaries = {
  fi: () => import("/public/dictionaries/fi.json").then((module) => module.default),
  en: () => import("/public/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
