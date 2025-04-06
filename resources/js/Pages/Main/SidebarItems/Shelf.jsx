import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";

const Shelf = () => {
    return (
        <Flex p={4} direction="column" h="100%">
            <Button w="100%" mb={2} colorScheme="blue" shadow={"md"}>
                + New Notepad
            </Button>
            <Box
                flex="1"
                overflowY="auto"
                p={2}
                bg="red.200"
                borderRadius="md"
                css={{
                    "&::-webkit-scrollbar": {
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#F56565", // 柔らかい赤
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#E53E3E", // 少し濃い赤
                    },
                }}
            >
                {Array.from({ length: 20 }, (_, i) => (
                    <Box
                        key={i}
                        p={2}
                        mb={2}
                        mr={8}
                        bg="red.300"
                        borderRadius="md"
                        color="white"
                        _hover={{ mr: 4, ml: 4, shadow: "lg" }}
                        transition="all 0.2s"
                    >
                        Item {i + 1}
                    </Box>
                ))}
            </Box>
        </Flex>
    );
};

export default Shelf;
