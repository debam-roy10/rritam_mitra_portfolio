import { Tab } from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import classNames from "classnames";

import LightGalleryComponent from "lightgallery/react";
import { useRef } from "react";
import type { LightGallery } from "lightgallery/lightgallery";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import bg_img from "../public/p-bg.jpg";
import logo from "../public/logo.png";

import p1 from "../public/p1.jpg";
import p2 from "../public/p2.jpg";
import p3 from "../public/p3.jpg";
import p4 from "../public/p4.jpg";
import p5 from "../public/p5.jpg";
import p6 from "../public/p6.jpg";


const tabs = [
  {
    key: "all",
    display: "All",
  },
  {
    key: "landscape",
    display: "Landscape",
  },
  {
    key: "contemporary",
    display: "Contemporary",
  },
];

const images = [p1, p2, p3, p4, p5, p6];

export default function Home() {

  const lightboxRef = useRef<LightGallery | null>(null);

  return (
    <div className="h-full overflow-auto">
      <Head>
        <title>Rritam Mitra</title>
        <meta name="description" content="Photography Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        className="fixed right-0 bottom-0 z-0"
        src={bg_img}
        alt=""
        placeholder="blur"
      />

      <div className="fixed left-0 top-0 w-full h-full z-10 from-dark bg-gradient-to-t"></div>

      <header className="fixed top-0 w-full z-30 flex justify-between items-center h-[90px] px-10">
        {/* <div>hm</div> */}
        <Link href="#">
          <Image
            src={logo}
            width={190}
            height={50}
            alt="Rritam Mitra"
            className="transition-opacity opacity-0 duration-[2s]"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </Link>
        <Link
          href="#"
          className="rounded-3xl bg-light text-dark px-3 py-2 hover:bg-opacity-90 font-semibold"
        >
          Get in touch
        </Link>
      </header>

      <main className="relative pt-[100px] z-20">
        <div className="flex flex-col items-center h-full">
          <Tab.Group>
            <Tab.List className="flex items-center gap-12">
              {tabs.map((tab) => (
                <Tab key={tab.key} className="p-2">
                  {({ selected }) => (
                    <span
                      className={classNames(
                        "uppercase text-md",
                        selected ? "text-light" : "text-semilight"
                      )}
                    >
                      {tab.display}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="h-full max-w-[900px] w-full p-2 sm:p-4 my-6">
              <Tab.Panel className="overflow-auto">
                <Masonry
                  breakpointCols={{default: 2, 800: 1}}
                  className="flex gap-2"
                  columnClassName=""
                >
                  {images.map((image, idx) => (
                    <Image
                      key={image.src}
                      src={image}
                      alt=""
                      className="mb-2 hover:opacity-70 cursor-pointer"
                      placeholder="blur"
                      onClick={()=>{
                        lightboxRef.current?.openGallery(idx);
                      }}
                    />
                  ))}
                </Masonry>
                <LightGalleryComponent
                  onInit={(ref) => {
                    if (ref) {
                      lightboxRef.current = ref.instance
                    }
                  }}
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                  dynamic
                  dynamicEl={images.map(image=>({
                    src: image.src,
                    thumb: image.src,
                  }
                  ))}
                />
              </Tab.Panel>
              <Tab.Panel>landscape</Tab.Panel>
              <Tab.Panel>contemporary</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <footer className="relative h-[90px] flex justify-center items-center z-20">
        <p>© 2024 - rritammitra59@gmail.com</p>
      </footer>
    </div>
  );
}
