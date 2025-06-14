import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Heading,
    Text,
    VStack,
    ChakraProvider,
} from "@chakra-ui/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import authTheme from "@/Theme/AuthTheme";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <ChakraProvider theme={authTheme}>
            <GuestLayout>
                <Head title="Confirm Password" />
                <Box
                    maxW="md"
                    mx="auto"
                    mt={8}
                    p={8}
                    bg="white"
                    borderRadius="xl"
                    boxShadow="md"
                >
                    <Heading as="h2" size="md" mb={4} textAlign="center">
                        パスワード確認
                    </Heading>
                    <Text fontSize="sm" color="gray.600" mb={6}>
                        この操作はセキュリティ保護されています。続行するにはパスワードを入力してください。
                    </Text>
                    <form onSubmit={submit}>
                        <VStack spacing={4} align="stretch">
                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel htmlFor="password">
                                    パスワード
                                </FormLabel>
                                <Input
                                    borderRadius="full"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    autoFocus
                                />
                                <FormErrorMessage>
                                    {errors.password}
                                </FormErrorMessage>
                            </FormControl>
                            <Button
                                variant="roundedPurple"
                                fontSize="sm"
                                type="submit"
                                isLoading={processing}
                            >
                                確認
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </GuestLayout>
        </ChakraProvider>
    );
}
