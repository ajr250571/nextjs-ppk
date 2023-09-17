"use client";
import Image from "next/image";

function ViewImage({ imagen }) {
  return (
    <div className="my-2">
      <Image
        alt={imagen}
        src={`/${imagen}`}
        width="500"
        height="500"
        className="w-full"
      />
    </div>
  );
}

export default ViewImage;
