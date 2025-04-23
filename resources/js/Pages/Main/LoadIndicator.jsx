import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const LoadIndicator = () => {
    return (
        <Box
            color="rgba(255, 255, 255, 0.5)"
            h="100%"
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Spinner size="xl" />
        </Box>
    );
};

export default LoadIndicator;
