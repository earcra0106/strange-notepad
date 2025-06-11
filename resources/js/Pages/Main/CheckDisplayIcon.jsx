import React from "react";
import { Box } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const CheckDisplayIcon = () => {
    return (
        <Box
            position="absolute"
            top="0px"
            right="0px"
            bg="gray.800"
            borderRadius="full"
            p="3px"
            zIndex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <CheckIcon color="green.400" boxSize={4} />
        </Box>
    );
};

export default CheckDisplayIcon;
