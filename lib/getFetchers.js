import fetcher from "fetcher";
import base from "./base";
export const revalidate = 60;

export const getSocialLinks = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/slinks`);
    return { socials: result.data };
  } catch (error) {
    return { error };
  }
};

export const getUpBanner = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/adsies?limit=1`);
    return { ads: result.data[0] };
  } catch (err) {
    return { err };
  }
};

export const getWebInfo = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/webinfo`);
    return { info: result.data };
  } catch (error) {
    return { error };
  }
};

export const getSlugPage = async (slug) => {
  try {
    const result = await fetcher(`${base.apiUrl}/pages/slug/${slug}`);

    return {
      page: result.page,
    };
  } catch (error) {
    return { error };
  }
};

export const getSlugMenu = async (slug) => {
  try {
    const result = await fetcher(`${base.apiUrl}/menu/slug/${slug}`);

    return {
      menu: result.data,
      parent: result.parent,
      page: result.page,
      childeMenus: result.childeMenus,
      sameParentMenus: result.sameParentMenus,
      position: result.position,
    };
  } catch (error) {
    return { error };
  }
};

export const getSlugFooterMenu = async (slug) => {
  try {
    const result = await fetcher(`${base.apiUrl}/footermenu/slug/${slug}`);

    return {
      menu: result.data,
      parent: result.parent,
      page: result.page,
      childeMenus: result.childeMenus,
      sameParentMenus: result.sameParentMenus,
      position: result.position,
    };
  } catch (error) {
    return { error };
  }
};

export const getMenus = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/menu`);
    return { menus: result.data };
  } catch (error) {
    return { error };
  }
};

export const getFooterMenus = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/footermenu`);
    return { menus: result.data };
  } catch (error) {
    return { error };
  }
};

export const getBanners = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/banners?${query}`);
    return { banners: result.data };
  } catch (error) {
    return { error };
  }
};

export const getNews = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/news?${query}`);

    return { news: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getSlugNews = async (slug) => {
  try {
    const result = await fetcher(`${base.apiUrl}/news/s/${slug}`);

    return { news: result.data };
  } catch (error) {
    return { error };
  }
};

export const getEmployee = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/employees/${id}`);
    return { employee: result.data };
  } catch (error) {
    return { error };
  }
};

export const getNewsCategories = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/news-categories?${query}`);
    return { newsCategories: result.data };
  } catch (error) {
    return { error };
  }
};

export const getIdNews = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/news/${id}`);
    return { news: result.data };
  } catch (error) {
    return { error };
  }
};

export const getTopLinks = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/toplinks?${query}`);
    return { toplinks: result.data };
  } catch (error) {
    return { error };
  }
};

export const getFastLinks = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/fastlinks?${query}`);
    return { fastlinks: result.data };
  } catch (error) {
    return { error };
  }
};

export const getMedias = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/media?${query}`);

    return { medias: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getBooks = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/books?${query}`);

    return { books: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getPartners = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/partners?${query}`);

    return { partners: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getMediaCategories = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/media-categories?${query}`);
    return { categories: result.data };
  } catch (error) {
    return { error };
  }
};

export const getSlugMedia = async (slug) => {
  try {
    const result = await fetcher(`${base.apiUrl}/media/s/${slug}`);

    return { media: result.data };
  } catch (error) {
    return { error };
  }
};
