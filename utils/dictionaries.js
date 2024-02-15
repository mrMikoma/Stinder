'use server'

const dictionaries = {
  fi: async () => import("/public/dictionaries/fi.json").then((module) => module.default),
  en: async () => import("/public/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
