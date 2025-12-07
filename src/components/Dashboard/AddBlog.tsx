import {
  Button,
  FileInput,
  Group,
  TextInput,
  Textarea,
  Image,
  Select,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import useBlogStore from "../../store/blog";
import { GoogleGenAI } from "@google/genai";
import toast from "react-hot-toast";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const getAiResponse = async (title: string) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a blog post description of around 50 words based on the following title:\n\nTitle: ${title}`,
    });
    const aiReply = await result.text;
    return aiReply;
  } catch (error) {
    console.error("Error generating AI based Response:", error);
    toast.error("Failed to generate AI response", {
      duration: 3000,
    });
    return "";
  }
};

const AddBlog = ({ onClose }: { onClose: any }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { addBlog, submitionState, getBlogs } = useBlogStore();
  const [aiDescriptionLoader, setAiDescriptionLoader] = useState(false);

  const form = useForm({
    mode: "controlled",
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
      title: values.title,
      description: values.description,
      category: values.category,
      image: values.base64Image,
    };
    await addBlog(data);
    onClose();
    await getBlogs();
  };

  const handleGenerate = async () => {
    const title = form.values.title.trim();
    if (!title || title.length < 2) return;
    setAiDescriptionLoader(true);
    const description = await getAiResponse(title);
    if (description) {
      form.setFieldValue("description", description);
    }
    setAiDescriptionLoader(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="Title"
        placeholder="Enter blog title"
        {...form.getInputProps("title")}
      />

      {form.values.title.length >= 2 && (
        <div className="w-full flex justify-between items-center mt-4 mb-0">
          <h1 className="text-sm font-medium">Want AI Description?</h1>
          <Button onClick={handleGenerate} disabled={aiDescriptionLoader}>
            {aiDescriptionLoader ? <Loader size="xs" /> : "Generate"}
          </Button>
        </div>
      )}

      <Textarea
        withAsterisk
        label="Description"
        placeholder="Enter blog description"
        minRows={5}
        autosize
        maxRows={10}
        {...form.getInputProps("description")}
      />

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
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default AddBlog;
