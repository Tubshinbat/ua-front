// CSS Styles
import "bootstrap/dist/css/bootstrap.css";
import "styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "animate.css";
import "aos/dist/aos.css";
import "styles/fonts.css";

//
import Script from "next/script";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

//Components

//Context
import { NotificationProvider } from "context/notificationContext";
import Footer from "components/General/Footer";
import Spinner from "components/General/Spinner";
import { getWebInfo } from "lib/getFetchers";
import Head from "next/head";

export async function generateMetadata({ params }) {
  const { info } = await getWebInfo();

  let title = `NAOG.GOV.MN`;

  if (info) {
    title = info["mn"].name + " - " + title;
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
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/fonts/fonts.css" />
        <link rel="stylesheet" href="/css/all.min.css" />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B2E3N5ZCZQ"
        ></Script>
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B2E3N5ZCZQ', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <html lang="en">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

        <body>
          <Suspense fallback={<Spinner />}>
            <NotificationProvider>
              {children}
              <Footer />

              {/* <Footer /> */}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </NotificationProvider>
          </Suspense>
        </body>
        <Script
          src="https://kit.fontawesome.com/2ee6e382fe.js"
          crossorigin="anonymous"
        ></Script>
        <Script src="/js/all.min.js" crossorigin />
      </html>
    </>
  );
}
