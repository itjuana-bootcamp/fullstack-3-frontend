import { Container, TableContainer } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <Header title="John Doe">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </Header>
      <Container fixed>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
}
