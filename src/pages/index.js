import { useRouter } from "next/router";

import { Button } from "@mui/material";

import styles from "../styles/Home.module.css";

export default function Home({ name, summary }) {
  const router = useRouter();

  return (
    <section className={styles.Home}>
      <h1 className={styles.Name}>{name}</h1>
      <div className={styles.Summary}>{summary}</div>
      <div>
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push("/projects")}
        >
          Projects
        </Button>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  console.log("Running in the server");
  // Get your date from an API
  return {
    props: {
      name: "John Doe",
      summary:
        "I am a full-stack developer with proficiency in both front-end and back-end development. I am capable of designing user interfaces, writing code for the client-side, developing server-side logic, and managing databases. My expertise allows me to build functional and responsive websites that meet the needs of clients and users. I have a passion for technology and a desire to continuously learn and improve my skills.",
    },
  };
}
