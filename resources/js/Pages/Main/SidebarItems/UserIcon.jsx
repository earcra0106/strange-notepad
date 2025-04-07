import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const UserIcon = ({ user }) => {
    return (
        <>
            <Flex
                justifyContent="center"
                alignItems="center"
                fontSize="lg"
                fontWeight="bold"
                color="white"
                bg="blue.500"
                borderRadius="full"
                w={8}
                h={8}
                shadow={"md"}
            >
                {user.name.charAt(0)}
            </Flex>
        </>
    );
};

export default UserIcon;
