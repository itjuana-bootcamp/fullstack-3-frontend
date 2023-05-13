import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function ItemActions({ id, onEdit, onDelete }) {
  const router = useRouter();

  return (
    <>
      {!!onEdit && !!onDelete ? (
        <>
          <Button
            variant="contained"
            size="large"
            onClick={onEdit}
            color="warning"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={onDelete}
            color="error"
          >
            Delete
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push(`/projects/${id}`)}
        >
          Use Case
        </Button>
      )}
    </>
  );
}
