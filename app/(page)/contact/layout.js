import { getWebInfo } from "lib/getFetchers";

export async function generateMetadata() {
  const { info } = await getWebInfo();
  let title = `NAOG.GOV.MN`;
  if (info) {
    title = "Холбоо барих - " + info["mn"].name + " - " + title;
  }

  let openGraph = {
    images: "/images/share-bg.png",
  };

  return {
    title,
    openGraph,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
