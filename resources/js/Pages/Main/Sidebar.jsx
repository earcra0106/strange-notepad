import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { useHomeContext } from "./Contexts/HomeContext";
import {
    Box,
    Flex,
    IconButton,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import Shelf from "./SidebarItems/Shelf";
import UserIcon from "./SidebarItems/UserIcon";
import {
    MdHelp,
    MdLogin,
    MdLogout,
    MdPerson,
    MdPersonAdd,
} from "react-icons/md";

const Sidebar = () => {
    const homeContext = useHomeContext();

    const { auth } = usePage().props;
    return (
        <>
            <Box p={4} h="100vh">
                <Flex direction={"column"} h="100%">
                    <Flex p={4} fontSize="lg" fontWeight="bold" align="center">
                        <Text>{import.meta.env.VITE_APP_NAME}</Text>
                        <IconButton
                            ml={1}
                            icon={<MdHelp size="18px" />}
                            color="white"
                            bg="transparent"
                            borderRadius="full"
                            aria-label="Tutorial"
                            _hover={{ bg: "gray.600" }}
                            onClick={homeContext.onOpenTuterialModal}
                        />
                    </Flex>
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
                                        icon={<MdPerson />}
                                        color="white"
                                        bg="gray.800"
                                        as={Link}
                                        href={route("profile.edit")}
                                    >
                                        ユーザ情報
                                    </MenuItem>
                                    <MenuItem
                                        icon={<MdLogout />}
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
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            _hover={{ color: "purple.500" }}
                                        >
                                            <MdLogin size={28} />
                                            <Text mt={1}>ログイン</Text>
                                        </Box>
                                    </Link>
                                    <Link href={route("register")}>
                                        <Box
                                            p={4}
                                            textAlign="center"
                                            color="black"
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            _hover={{ color: "purple.500" }}
                                        >
                                            <MdPersonAdd size={28} />
                                            <Text mt={1}>ユーザー登録</Text>
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
