import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";

const Header = () => {
    return (
        <>
            <Box p={4} h="100%">
                <Flex h="100%" justify="space-between">
                    <Flex direction={"column"}>
                        <Box fontSize="md">Strange</Box>
                        <Box textAlign={"left"} fontSize="xl" fontWeight="bold">
                            Unidentified Notepad
                        </Box>
                    </Flex>
                    <Box>
                        <Button
                            h="100%"
                            mr={2}
                            minW="160px"
                            fontSize="xl"
                            shadow={"md"}
                        >
                            menu
                        </Button>
                        <Button
                            h="100%"
                            mr={2}
                            minW="160px"
                            fontSize="xl"
                            shadow={"md"}
                        >
                            prompt
                        </Button>
                        <Button
                            h="100%"
                            minW="160px"
                            fontSize="xl"
                            colorScheme="blue"
                            shadow={"md"}
                        >
                            save
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default Header;
