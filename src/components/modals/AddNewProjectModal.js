import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ProjectForm from "../forms/ProjectForm";

export default function AddNewProjectModal ({ open, onClose }) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Adding a new project...
      </DialogTitle>
      <DialogContent>
        <ProjectForm />
      </DialogContent>
      <DialogActions>

      </DialogActions>
    </Dialog>
  )
}