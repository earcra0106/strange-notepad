import React from "react";
import {
    Box,
    Flex,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

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
                    {/* SP表示 */}
                    <Box display={{ base: "block", md: "none" }}>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<HamburgerIcon />}
                            />
                            <MenuList>
                                <MenuItem>編集</MenuItem>
                                <MenuItem>ジュモン</MenuItem>
                                <MenuItem>保存</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                    {/* PC表示 */}
                    <Box display={{ base: "none", md: "block" }}>
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
