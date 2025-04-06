import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import Shelf from "./SidebarItems/Shelf";

const Sidebar = () => {
    return (
        <>
            <Box p={4} h="100vh">
                <Flex direction={"column"} h="100%">
                    <Box p={4} Box fontSize="lg" fontWeight="bold">
                        Strange Notepad
                    </Box>
                    <Box flex={1} my={2} minH={0}>
                        <Shelf />
                    </Box>
                    <Box p={4} bg="white" borderRadius="md" shadow="md">
                        UserMenu
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default Sidebar;
