import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useHomeBlogStore from "../../store/home";

interface CommentsProps {
  _id: string;
  onClose: () => void;
  blogId: string;
}

const AddComment = ({ _id,onClose,blogId }: CommentsProps) => {
  const { addComment,commentLoadingState } = useHomeBlogStore();
  const { getBlogData } = useHomeBlogStore();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      comment: "",
    },

    validate: {
      comment: (value) =>
        value.trim().length > 0 ? null : "Comment is required",
    },
  });

  const handleSubmit = async (values: { comment: string }) => {
    const data = {
      comment: values.comment,
    };
    await addComment(data,_id);
    onClose();
    await getBlogData(blogId);
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Comment"
          placeholder="Enter the Comment"
          {...form.getInputProps("comment")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit" disabled={!!commentLoadingState}>
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default AddComment;
