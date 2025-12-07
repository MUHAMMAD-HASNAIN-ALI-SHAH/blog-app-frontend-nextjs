import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import AddComment from "./AddComment";
import useAuthStore from "../../store/auth";

interface CommentsProps {
  comments: {
    _id: string;
    username: string;
    comment: string;
    blogId: string;
    userId: string;
  }[];
  blogId: string;
}

const Comments = ({ comments, blogId }: CommentsProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="flex flex-col gap-2 mt-1">
      <h1 className="text-xl font-bold text-start">Comments</h1>
      {comments &&
        comments.map((comment) => (
          <div
            key={comment._id}
            className="flex flex-col gap-1 p-2 rounded-lg border border-gray-400"
          >
            <h1 className="text-sm font-semibold">{comment.username}</h1>
            <p className="text-xs">{comment.comment}</p>
          </div>
        ))}
      <Modal opened={opened} onClose={close} title="Add Comment" centered>
        <AddComment blogId={blogId} onClose={close} _id={blogId} />
      </Modal>
      <Button
        onClick={open}
        className="btn btn-warning btn-sm mt-2"
        disabled={!!!isAuthenticated}
      >
        Add Comment
      </Button>
    </div>
  );
};

export default Comments;
