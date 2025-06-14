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
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";
import authTheme from "@/Theme/AuthTheme";
import { ChakraProvider } from "@chakra-ui/react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <ChakraProvider theme={authTheme}>
            <Box as="section" className={className}>
                <Heading as="h2" size="md" mb={2}>
                    パスワード変更
                </Heading>
                <Text fontSize="sm" color="gray.600" mb={4}>
                    アカウントの安全のため、十分に長くランダムなパスワードを設定してください。
                </Text>

                <form onSubmit={updatePassword}>
                    <VStack spacing={4} align="stretch">
                        <FormControl isInvalid={!!errors.current_password}>
                            <FormLabel htmlFor="current_password">
                                現在のパスワード
                            </FormLabel>
                            <Input
                                borderRadius="full"
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                type="password"
                                autoComplete="current-password"
                            />
                            <FormErrorMessage>
                                {errors.current_password}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel htmlFor="password">
                                新しいパスワード
                            </FormLabel>
                            <Input
                                borderRadius="full"
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                type="password"
                                autoComplete="new-password"
                            />
                            <FormErrorMessage>
                                {errors.password}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.password_confirmation}>
                            <FormLabel htmlFor="password_confirmation">
                                新しいパスワード（確認用）
                            </FormLabel>
                            <Input
                                borderRadius="full"
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                type="password"
                                autoComplete="new-password"
                            />
                            <FormErrorMessage>
                                {errors.password_confirmation}
                            </FormErrorMessage>
                        </FormControl>

                        <Box display="flex" alignItems="center" gap={4}>
                            <Button
                                type="submit"
                                isLoading={processing}
                                variant="roundedPurple"
                                fontSize="sm"
                            >
                                {" "}
                                保存
                            </Button>
                            {recentlySuccessful && (
                                <Alert
                                    status="success"
                                    variant="subtle"
                                    p={2}
                                    borderRadius="md"
                                >
                                    <AlertIcon />
                                    保存しました
                                </Alert>
                            )}
                        </Box>
                    </VStack>
                </form>
            </Box>
        </ChakraProvider>
    );
}
