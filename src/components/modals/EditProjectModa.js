import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ProjectForm from "../forms/ProjectForm";

export default function EditProjectModal ({ open, onClose, onSubmit, project }) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Editing this project...
      </DialogTitle>
      <DialogContent>
        <ProjectForm
          editValues={project}
          onSubmit={onSubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          form='project-form'
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          form='project-form'
          onClick={onClose}
        >
          Update project
        </Button>
      </DialogActions>
    </Dialog>
  )
}