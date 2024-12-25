"use client";

import ESForm from "@/src/components/form/ESForm";
import ESInput from "@/src/components/form/ESInput";
import { useUser } from "@/src/context/user.provider";
import { useCreateBlog, useUpdateBlog } from "@/src/hooks/blog.hook";
import { IBlog } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import CustomRichTextEditor from "./CustomRichTextEditor";
import blogValidationSchema from "@/src/schemas/blog.schema";

const BlogManageCard = ({
  cardTitle,
  blog,
}: {
  cardTitle: string;
  blog?: IBlog;
}) => {
  const { user, isLoading } = useUser();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { mutate: handleCreateBlog, isPending, isSuccess } = useCreateBlog();
  const router = useRouter();
  const [title, setTitle] = useState(blog?.title || "");
  const [description, setDescription] = useState(blog?.description || "");
  const [tag, setTag] = useState(blog?.tag || "");
  const [instructions, setInstructions] = useState(" ");
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");

  const { mutate: handleUpdateBlog, isSuccess: blogUpdateSuccess } =
    useUpdateBlog();

  const base64ToFile = (base64: string, filename: string) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)![1]; // Extract MIME type
    const bstr = atob(arr[1]); // Decode base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const extractImages = (htmlContent: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const images = tempDiv.querySelectorAll("img");
    const imageSources = Array.from(images).map((img) => img.src);
    return imageSources;
  };

  const removeImagesFromContent = (htmlContent: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const images = tempDiv.querySelectorAll("img");
    images.forEach((img) => img.remove());

    return tempDiv.innerHTML;
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);

    const imageSources = extractImages(value);
    const instructionsWithoutImages = removeImagesFromContent(value);
    setInstructions(instructionsWithoutImages);

    const formData = new FormData();
    imageSources.forEach((src, index) => {
      if (src.startsWith("data:image")) {
        // If image is in base64 format, convert it to File
        const file = base64ToFile(src, `image${index}.png`);
        console.log({ file });
        formData.append("file", file);
      }
    });

    if (!description) {
      return;
    }
    const blogData = {
      ...data,
      image: " ",
      description: instructionsWithoutImages,
    };

    console.log({ blogData });

    formData.append("data", JSON.stringify(blogData));

    if (cardTitle === "Add") {
      handleCreateBlog(formData);
    }

    if (cardTitle === "Update") {
      const updatedData = {
        id: blog?._id,
        data: {
          title: title,
          tag: tag,
          description:
            instructions.length > 0 ? instructionsWithoutImages : description,
        },
      };
      setInstructions(
        instructions.length > 0 ? instructionsWithoutImages : description
      );

      handleUpdateBlog(updatedData);
    }
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  useEffect(() => {
    if (isSuccess || blogUpdateSuccess) {
      router.push("/dashboard/blogs");
    }
  }, [blogUpdateSuccess, isSuccess, router]);

  return (
    <div>
      <div className="flex mt-6 w-full flex-col items-center justify-center mb-12">
        <h3 className="my-2 text-2xl font-bold">{cardTitle} Blog</h3>
        <div className=" w-[80%]">
          <ESForm
            onSubmit={onSubmit}
            resolver={zodResolver(blogValidationSchema)}
          >
            <div className="py-3">
              <ESInput
                name="title"
                label="Title"
                size="sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={true}
              />
            </div>
            <div className="py-3">
              <ESInput
                name="tag"
                label="Tag"
                size="sm"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required={true}
              />
            </div>

            <div>
              <CustomRichTextEditor
                setDescription={setDescription}
                description={description}
                setImage={setImage}
                image={image}
                setValue={setValue}
              />
            </div>
            {!instructions && (
              <p className="text-xs text-red-500">Please enter instructions!</p>
            )}

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Submit
            </Button>
          </ESForm>
        </div>
      </div>
    </div>
  );
};

export default BlogManageCard;
