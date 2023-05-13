import { Button, Grid, Box, Chip } from "@mui/material";
import Image from "next/image";
import PageDescription from "@/components/PageDescription";

function Project({ project }) {
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <PageDescription
          title={project.name}
          description={project.description}
        />
        <Box textAlign="center">
          <Button variant="contained" size="large">
            Project Link
          </Button>
        </Box>
        <Box>
          <Image
            src={project.imageUrl}
            width={900}
            height={550}
            alt="Image project"
          />
        </Box>
        <h1>Project Overview</h1>
        <Box>
          <span>{project.description}</span>
        </Box>
        <h1>Tools Used</h1>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {project.tools.map((tool) => {
            <Chip key={tool} label={tool} variant="outlined" />;
          })}
        </Box>
      </Grid>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const response = await fetch(`http://localhost:3000/api/projects/`);
    const projects = await response.json();
    const paths = projects.map((project) => {
      return { params: { id: project._id.toString() } };
    });
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/projects/${params.id}`
    );
    const project = await response.json();

    return {
      props: {
        project,
      },
      revalidate: 5,
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Project;
