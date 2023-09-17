"use client";
import Image from "next/image";

function ViewImage({ imagen }) {
  return (
    <div className="my-2">
      <Image
        alt="Imagen"
        src={`/${imagen}`}
        width="500"
        height="500"
        className="w-full"
        refresh={true}
      />
    </div>
  );
}

export default ViewImage;
