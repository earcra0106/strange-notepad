import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";

const Footer = () => {
    return (
        <>
            <Box p={4} h="100%">
                <Flex h="100%">
                    <Box flex={1}></Box>
                    <Box w="30%">
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Button colorScheme="blue" shadow={"md"}>
                                L
                            </Button>
                            <Box flex={1} textAlign="center">
                                <span>page 1 of 10</span>
                            </Box>
                            <Button colorScheme="blue" shadow={"md"}>
                                R
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default Footer;
