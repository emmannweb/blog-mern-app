import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export default Loader;
