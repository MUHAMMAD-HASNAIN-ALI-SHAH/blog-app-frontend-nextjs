import { useRef, useEffect, useState } from "react";
import useAuthStore from "../../store/auth";
import { Loader } from "@mantine/core";

const UserIcon = () => {
  const { updateImage, authLoader, user } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);

  // Use state to show image, default to profile.image or fallback
  const [imageSrc, setImageSrc] = useState(user?.image || "./user.png");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) return;

    const reader: FileReader = new FileReader();
    reader.onloadend = async () => {
      if (typeof reader.result === "string") {
        setImageSrc(reader.result); // Update preview instantly

        // Update server and Zustand store without clearing it
        await updateImage({ image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // Update image from profile if it changes
    if (user?.image) {
      setImageSrc(user.image);
    }
  }, [user?.image]);

  useEffect(() => {
    const img = previewRef.current;
    if (img) {
      img.style.cursor = "pointer";
      img.onclick = () => fileInputRef.current?.click();
    }
  }, []);

  return (
    <div className="relative flex items-center justify-center w-44 h-44 md:w-96 md:h-64 bg-gray-200 rounded-full shadow-md p-5">
      <img
        ref={previewRef}
        src={imageSrc}
        className="w-full h-full rounded-full object-cover"
        alt="User Icon"
      />

      {authLoader && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-full">
          <Loader color="blue" size="lg" />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default UserIcon;
