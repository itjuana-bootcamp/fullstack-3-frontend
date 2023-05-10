import { Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <Container fixed>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
}
