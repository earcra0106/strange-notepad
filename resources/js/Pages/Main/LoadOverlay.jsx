import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const LoadOverlay = () => {
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            bg="rgba(0, 0, 0, 0.2)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex="1000"
        >
            <Spinner size="xl" color="white" />
        </Box>
    );
};

export default LoadOverlay;
