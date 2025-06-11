import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { Box, Flex } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Shelf from "./SidebarItems/Shelf";
import UserIcon from "./SidebarItems/UserIcon";

const Sidebar = () => {
    const { auth } = usePage().props;
    return (
        <>
            <Box p={4} h="100vh">
                <Flex direction={"column"} h="100%">
                    <Box p={4} fontSize="lg" fontWeight="bold">
                        {import.meta.env.VITE_APP_NAME}
                    </Box>
                    <Box flex={1} my={2} minH={0}>
                        <Shelf />
                    </Box>
                    <Box bg="white" borderRadius="md" shadow="md">
                        {auth.user ? (
                            <Menu w="100%">
                                <MenuButton
                                    fontSize="lg"
                                    fontWeight="bold"
                                    w="100%"
                                >
                                    <Box
                                        p={4}
                                        fontSize="lg"
                                        fontWeight="bold"
                                        w="100%"
                                    >
                                        <Flex align="center">
                                            <UserIcon user={auth.user} />
                                            <Box
                                                ml={3}
                                                flex={1}
                                                textAlign="left"
                                                color="black"
                                            >
                                                {auth.user.name}
                                            </Box>
                                        </Flex>
                                    </Box>
                                </MenuButton>
                                <MenuList
                                    bg="gray.800"
                                    color="white"
                                    borderColor="gray.600"
                                >
                                    <MenuItem
                                        color="white"
                                        bg="gray.800"
                                        as={Link}
                                        href={route("profile.edit")}
                                    >
                                        ユーザ情報
                                    </MenuItem>
                                    <MenuItem
                                        color="red"
                                        bg="gray.800"
                                        as={Link}
                                        href={route("logout")}
                                        method="post"
                                    >
                                        ログアウト
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <>
                                <Flex justify="space-around">
                                    <Link href={route("login")}>
                                        <Box
                                            p={4}
                                            textAlign="center"
                                            color="black"
                                        >
                                            ログイン
                                        </Box>
                                    </Link>
                                    <Link href={route("register")}>
                                        <Box
                                            p={4}
                                            textAlign="center"
                                            color="black"
                                        >
                                            ユーザ登録
                                        </Box>
                                    </Link>
                                </Flex>
                            </>
                        )}
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default Sidebar;
