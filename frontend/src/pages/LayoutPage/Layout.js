import { Box } from "@mui/material";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "calc(100vh - 124px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.white",
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
