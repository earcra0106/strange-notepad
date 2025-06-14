import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import {
    Box,
    Container,
    Heading,
    VStack,
    ChakraProvider,
} from "@chakra-ui/react";
import theme from "@/Theme/AuthTheme";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <ChakraProvider theme={theme}>
            <GuestLayout>
                <Head title="Profile" />

                <Heading as="h2" size="md" mb={6} textAlign="center">
                    プロフィール編集
                </Heading>

                <Box py={4} bg="gray.50" my={2}>
                    <Container maxW="7xl">
                        <VStack spacing={6}>
                            <Box
                                bg="white"
                                p={8}
                                boxShadow="md"
                                borderRadius="2xl"
                                w="100%"
                                maxW="xl"
                            >
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />
                            </Box>
                            <Box
                                bg="white"
                                p={8}
                                boxShadow="md"
                                borderRadius="2xl"
                                w="100%"
                                maxW="xl"
                            >
                                <UpdatePasswordForm />
                            </Box>
                            <Box
                                bg="white"
                                p={8}
                                boxShadow="md"
                                borderRadius="2xl"
                                w="100%"
                                maxW="xl"
                            >
                                <DeleteUserForm />
                            </Box>
                        </VStack>
                    </Container>
                </Box>
            </GuestLayout>
        </ChakraProvider>
    );
}
