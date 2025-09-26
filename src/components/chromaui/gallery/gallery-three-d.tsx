import React from "react";
import { ThreeDMarquee } from "../../ui/3d-marquee";

const GalleryThreeD = ({ images }: { images: string[] }) => {
  const imageLength = images.length;
  const galleryLength = 30;

  const galleryImages = Array.from(
    { length: galleryLength },
    (_, index) => images[index % imageLength],
  );

  return (
    <div className="items-center justify-center rounded-3xl shadow bg-secondary overflow-hidden">
      <ThreeDMarquee images={galleryImages} />
    </div>
  );
};

export { GalleryThreeD };
