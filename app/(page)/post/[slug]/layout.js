import base from "lib/base";
import { getSlugNews, getWebInfo } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { info } = await getWebInfo();
  const { news } = await getSlugNews(params.slug);

  let title = `NAOG.GOV.MN`;
  let description = "NAOG.GOV.MN";

  if (info && news) {
    title = news["mn"].name + " - " + info["mn"].name + " - " + title;
    description =
      news["mn"].shortDetails && news["mn"].shortDetails.substring(0, 150);
  }

  return {
    title,
    description,
    openGraph: {
      images:
        news && news.pictures && news.pictures[0]
          ? base.cdnUrl + "/" + news.pictures[0]
          : "/images/share-bg.png",
    },
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
