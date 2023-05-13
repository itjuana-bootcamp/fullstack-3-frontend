import { Button, Grid, Box, Chip } from "@mui/material";
import Image from "next/image";
import { NextSeo } from "next-seo";
import Link from "next/link";
import PageDescription from "@/components/PageDescription";

function Project({ project }) {
  return (
    <>
      <NextSeo
        title={project.name}
        description={project.description}
        openGraph={{
          title: "Title",
          description: "Description of the project",
          url: "google.com",
          image:
            "https://d33wubrfki0l68.cloudfront.net/19c708670a1f21231c1e2efa6ba38dbf52b15343/3237e/assets/jpeg/dopefolio.jpeg",
          type: "websites",
        }}
      ></NextSeo>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        rowGap={2}
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
          {project.tools.map((tool) => (
            <Chip key={tool} label={tool} variant="outlined" />
          ))}
        </Box>
        <Link href="/projects">
          <Button variant="contained" size="large">
            Go back
          </Button>
        </Link>
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
