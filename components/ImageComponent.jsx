import Image from "next/image";
import React from "react";
import { client } from "lib/client";
import { useNextSanityImage } from "next-sanity-image";

export const ImageComponent = ({
  image,
  className,
  onMouseEnter,
  width,
  height,
  priority,
}) => {
  const imageProps = useNextSanityImage(client, image);

  if (!imageProps) {
    return <div>Loading...</div>;
  }

  return (
    <Image
      {...imageProps}
      alt={image.alt ?? ""}
      width={width ?? 0}
      height={height ?? 0}
      className={className}
      onMouseEnter={onMouseEnter}
      priority={priority}
    />
  );
};
