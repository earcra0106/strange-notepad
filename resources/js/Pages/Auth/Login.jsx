import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Text,
    Heading,
    Flex,
    Link as ChakraLink,
    ChakraProvider,
} from "@chakra-ui/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import authTheme from "@/Theme/AuthTheme";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <ChakraProvider theme={authTheme}>
            <GuestLayout>
                <Head title="Log in" />

                <Heading as="h2" size="md" mb={6} textAlign="center">
                    ログイン
                </Heading>

                {status && (
                    <Text
                        mb={4}
                        fontSize="sm"
                        fontWeight="medium"
                        color="green.600"
                    >
                        {status}
                    </Text>
                )}

                <form onSubmit={submit}>
                    <FormControl isInvalid={!!errors.email} mb={4}>
                        <FormLabel htmlFor="email">メールアドレス</FormLabel>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData("email", e.target.value)}
                            borderRadius="full"
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password} mb={4}>
                        <FormLabel htmlFor="password">パスワード</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            borderRadius="full"
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    <FormControl mb={4}>
                        <Checkbox
                            name="remember"
                            isChecked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        >
                            ログイン状態を保持する
                        </Checkbox>
                    </FormControl>

                    <Flex mt={4} align="center" justify="flex-end" gap={4}>
                        {canResetPassword && (
                            <ChakraLink
                                as={Link}
                                href={route("password.request")}
                                fontSize="sm"
                                color="gray.600"
                                _hover={{
                                    color: "gray.900",
                                    textDecoration: "underline",
                                }}
                            >
                                パスワードを忘れた場合はこちら
                            </ChakraLink>
                        )}

                        <Button
                            variant={"roundedPurple"}
                            fontSize={"md"}
                            type="submit"
                            isLoading={processing}
                        >
                            ログイン
                        </Button>
                    </Flex>
                </form>
            </GuestLayout>
        </ChakraProvider>
    );
}
