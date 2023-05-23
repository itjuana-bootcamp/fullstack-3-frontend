
export const getProjects = async () => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/projects`)
    const projectsJson = await response.json()
    return projectsJson.projects
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getProject = async (id) => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/projects/${id}`)
    const projectsJson = await response.json()
    return projectsJson.project
  } catch (error) {
    console.log(error)
    return []
  }
}

export const updateProject = async project => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/projects/${project._id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })
    const projectsJson = await response.json()
    return projectsJson
  } catch (error) {
    console.log(error)
    return {}
  }
}

export const createProject = async project => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/projects`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })

    const projectsJson = await response.json()
    return projectsJson.projectSaved
  } catch (error) {
    console.log(error)
    return {}
  }
}

export const deleteProject = async id => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/projects/${id}`, {
      method: 'DELETE',
    })

    return response.status === 204
  } catch (error) {
    console.log(error)
    return false
  }
}