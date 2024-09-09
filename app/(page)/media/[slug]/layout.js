import base from "lib/base";
import { getSlugMedia, getWebInfo } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { info } = await getWebInfo();
  const { media } = await getSlugMedia(params.slug);

  let title = `NAOG.GOV.MN`;
  let description = "NAOG.GOV.MN";

  if (info) {
    title = media["mn"].name + " - " + info["mn"].name + " - " + title;
    description =
      media["mn"].shortDetails && media["mn"].shortDetails.substring(0, 150);
  }

  return {
    title,
    description,
    openGraph: {
      images:
        media.pictures && media.pictures[0]
          ? base.cdnUrl + "/" + media.pictures[0]
          : "/images/share-bg.png",
    },
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
