export const languageRender = (data, path, language = "mn") => {
  let lang = "mn";
  if (language) lang = language;

  if (data && data[lang] && data[lang][path]) {
    return data[lang][path];
  } else {
    if (lang === "eng") lang = "mn";
    if (data && data[lang] && data[lang][path]) return data[lang][path];
  }
};
