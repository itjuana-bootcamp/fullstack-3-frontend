import { createProject, deleteProject, getProjects, updateProject } from "@/api/projects";
import PageDescription from "@/components/PageDescription";
import ProjectItem from "@/components/ProjectItem";
import AddNewProjectModal from "@/components/modals/AddNewProjectModal";
import EditProjectModal from "@/components/modals/EditProjectModa";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function AdminPage() {

  const [editProject, setEditProject] = useState()
  const [isNewProjectModalVisible, setIsNewProjectModalVisible] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleOnSubmit = async values => {
    const tempProjects = Array.from(projects)
    if (!!values._id) {
      const updatedProject = await updateProject(values);
      const projectIndex = tempProjects.findIndex(p => p._id === updatedProject._id)
      tempProjects[projectIndex] = updatedProject;
    }
    else {
      const newProject = await createProject(values);
      tempProjects.push(newProject);
    }
    setProjects(tempProjects)
  }

  const handleDelete = async id => {
    const isDeleted = await deleteProject(id);
    if (isDeleted)
      setProjects(prev => prev.filter(p => p._id !== id))
  }

  const fetchProjects = async () => {
    try {
      const projects = await getProjects();
      setProjects(projects);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <PageDescription
        title="Admin"
        description="Here you will be able to add and update your projects."
      />
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Button
          variant="contained"
          size="large"
          onClick={ () => setIsNewProjectModalVisible(true) }
        >
          Add new project
        </Button>
      </div>
      {projects.map((project) => (
        <ProjectItem
          key={project._id}
          project={project}
          handleDelete={() => handleDelete(project._id)}
          handleEdit={() => setEditProject(project)}
        />
      ))}
      <AddNewProjectModal
        open={ isNewProjectModalVisible }
        onClose={ () => setIsNewProjectModalVisible(false) }
        onSubmit={ handleOnSubmit }
      />
      <EditProjectModal
        open={ !!editProject }
        onClose={ () => setEditProject() }
        onSubmit={ handleOnSubmit }
        project={ editProject }
      />
    </section>
  );
}