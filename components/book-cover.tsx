"use client";

import Image from "next/image";
import { useState } from "react";

interface BookCoverProps {
  coverUrl: string;
  title: string;
}

export function BookCover({ coverUrl, title }: BookCoverProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs p-1 text-center">
        No cover
      </div>
    );
  }

  return (
    <Image
      src={coverUrl}
      alt={`Cover of ${title}`}
      fill
      className="object-cover"
      sizes="40px"
      onError={() => setImageError(true)}
    />
  );
}
