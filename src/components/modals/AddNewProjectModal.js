import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ProjectForm from "../forms/ProjectForm";

export default function AddNewProjectModal ({ open, onClose, onSubmit }) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Adding a new project...
      </DialogTitle>
      <DialogContent>
        <ProjectForm onSubmit={onSubmit}/>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          type="reset"
          form='project-form'
        >
          Clear form
        </Button>
        <Button
          variant="contained"
          type="submit"
          form='project-form'
          onClick={onClose}
        >
          Add project
        </Button>
      </DialogActions>
    </Dialog>
  )
}