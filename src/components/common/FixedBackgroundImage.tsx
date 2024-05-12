import Image from "next/image";
import backgroundImage from "/public/background/background-image.png";

export default function FixedBackgroundImage() {
  return (
    <div className="fixed z-0 h-screen w-screen">
      <Image
        src={backgroundImage}
        alt="background image"
        fill
        priority
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};
