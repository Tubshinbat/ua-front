import Partners from "components/General/Partners";
import base from "lib/base";
import { getSlugMenu, getWebInfo } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { info } = await getWebInfo();
  const { menu, parent, page, childeMenus, sameParentMenus, position } =
    await getSlugMenu(params.slug);

  let title = `NAOG.GOV.MN`;
  if (info) title = info["mn"].name + " - " + title;

  let openGraph = {
    images: "/images/share-bg.png",
  };

  if (page && page[0]) {
    title = page[0]["mn"].name + " - " + title;
    if (page[0].pictures && page[0].pictures.length > 0)
      openGraph.images = base.cdnUrl + "/450/" + page[0].pictures[0];
  }

  return {
    title,
    openGraph,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
