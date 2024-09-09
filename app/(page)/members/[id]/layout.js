import base from "lib/base";
import { getSlugNews, getWebInfo } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { info } = await getWebInfo();

  let title = `NAOG.GOV.MN`;
  let description = "NAOG.GOV.MN";

  return {
    title,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
