import Image from "next/image";

export function getStrapiMedia(url: string | null) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return STRAPI_URL + url;
}
interface StrapiImageProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  rest?: any;
}

export function StrapiImage({
  src,
  alt,
  className,
  ...rest
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;
  
  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={className}
      {...rest}
    />
  );
}