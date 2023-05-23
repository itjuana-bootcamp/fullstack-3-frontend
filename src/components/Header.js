import PropTypes from "prop-types";
import { Avatar, Box, Button } from "@mui/material";

const Header = ({ src, title, children }) => {
  return (
    <header>
      <Button
        startIcon={<Avatar alt="logo" src={src} />}
        sx={{
          fontSize: "1.1rem",
          color: "black",
        }}
      >
        {title}
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </header>
  );
};

Header.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Header;
