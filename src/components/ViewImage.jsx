"use client";
import Image from "next/image";

function ViewImage({ imagen }) {
  const imageLoader = ({ src, width, quality }) => {
    return `/${src}?w=${width}&q=${quality || 75}`
  }
  return (
    <div className="my-2">
      <Image
        alt="Imagen"
        loader={imageLoader}
        src={`${imagen}`}
        width="500"
        height="500"
        className="w-full"
        refresh="true"
      />
    </div>
  );
}

export default ViewImage;
