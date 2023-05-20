import { getProjects } from "@/api/projects";
import PageDescription from "@/components/PageDescription";
import ProjectItem from "@/components/ProjectItem";

export default function ProjectsPage({ projects }) {
  return (
    <section>
      <PageDescription
        title="Projects"
        description="Here you will find some of the personal and clients projects that I created with each project containing its own case study"
      />

      {projects.map((project) => (
        <ProjectItem key={project._id} project={project} />
      ))}
    </section>
  );
}

export async function getServerSideProps() {
  const projects = await getProjects();

  return {
    props: {
      projects,
    },
  };
}
