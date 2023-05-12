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

  const handleOnSubmit = values => {
    const tempProjects = Array.from(projects)
    if (!!values._id) {
      const projectIndex = tempProjects.findIndex(p => p._id === values._id)
      tempProjects[projectIndex] = values;
    }
    else {
      tempProjects.push({
        ...values,
        _id: projects.length + 1,
      })
    }
    setProjects(tempProjects)
  }

  const handleDelete = id =>
    setProjects(prev => prev.filter(p => p._id !== id))

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/projects")
      const responseJson = await response.json()
      setProjects(responseJson)
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