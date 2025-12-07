import {
  Button,
  FileInput,
  Group,
  TextInput,
  Textarea,
  Image,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useBlogStore from "../../store/blog";
import axios from "axios";

const EditBlog = ({ _id, onClose }: { _id: string; onClose: any }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { updateBlog, submitionState, getBlogs } = useBlogStore();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: null as File | null,
      base64Image: "",
    },

    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Title is required"),
      description: (value) =>
        value.trim().length > 10
          ? null
          : "Description must be at least 10 characters",
      base64Image: (value) => (value ? null : "Image is required"),
      category: (value) => (value.length > 0 ? null : "Category is required"),
    },
  });

  useEffect(() => {
    const getBlogs = async () => {
      const token = sessionStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/blog/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        form.setFieldValue("title", response.data.blog.title);
        form.setFieldValue("description", response.data.blog.description);
        form.setFieldValue("category", response.data.blog.category);
        form.setFieldValue("base64Image", response.data.blog.image);
        setPreview(response.data.blog.image);
      } catch (error) {
        toast.error("Failed to fetch blog", { duration: 3000 });
        console.error(error);
      }
    };
    getBlogs();
  }, [_id]);

  // Convert image to Base64
  const handleImageChange = (file: File | null) => {
    form.setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        form.setFieldValue("base64Image", base64String);
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      form.setFieldValue("base64Image", "");
      setPreview(null);
    }
  };

  const handleSubmit = async (values: {
    title: string;
    description: string;
    category: string;
    base64Image: string;
  }) => {
    const data = {
      _id,
      title: values.title,
      description: values.description,
      category: values.category,
      image: values.base64Image,
    };
    await updateBlog(data);
    await getBlogs();
    onClose();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="Title"
        placeholder="Enter blog title"
        {...form.getInputProps("title")}
      />

      <Textarea
        withAsterisk
        label="Description"
        placeholder="Enter blog description"
        minRows={5}
        autosize
        maxRows={10}
        {...form.getInputProps("description")}
      />

      <p className="mt-5 text-sm">
        <span className="font-bold">NOTE: </span>Previous selected category{" "}
        <span className="font-bold">"{form.getValues().category}"</span>
      </p>
      <p className="text-sm mb-2">
        Select category again if you want to change
      </p>

      <Select
        label="Select blog category"
        placeholder="Pick value"
        data={[
          "technology",
          "travel",
          "food",
          "lifestyle",
          "health",
          "education",
          "finance",
          "sports",
          "fashion",
          "entertainment",
        ]}
        className="mb-5"
        {...form.getInputProps("category")}
      />

      <FileInput
        withAsterisk
        label="Upload Image"
        placeholder="Select an image"
        accept="image/*"
        onChange={handleImageChange}
      />
      {form.errors.base64Image && (
        <div style={{ color: "red", fontSize: "14px" }}>
          {form.errors.base64Image}
        </div>
      )}

      {preview && (
        <div className="mt-4 flex justify-center">
          <Image
            src={preview}
            alt="Uploaded preview"
            width={200}
            height={200}
            radius="md"
          />
        </div>
      )}

      <Group justify="flex-end" mt="md">
        <Button type="submit" disabled={!!submitionState}>
          Update
        </Button>
      </Group>
    </form>
  );
};

export default EditBlog;
