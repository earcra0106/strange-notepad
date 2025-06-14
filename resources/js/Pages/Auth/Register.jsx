import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Heading,
    Flex,
    Link as ChakraLink,
    ChakraProvider,
} from "@chakra-ui/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import authTheme from "@/Theme/AuthTheme";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <ChakraProvider theme={authTheme}>
            <GuestLayout>
                <Head title="Register" />

                <Heading as="h2" size="md" mb={6} textAlign="center">
                    ユーザー登録
                </Heading>

                <form onSubmit={submit}>
                    <FormControl isInvalid={!!errors.name} mb={4}>
                        <FormLabel htmlFor="name">ユーザー名</FormLabel>
                        <Input
                            borderRadius="full"
                            id="name"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.email} mb={4}>
                        <FormLabel htmlFor="email">メールアドレス</FormLabel>
                        <Input
                            borderRadius="full"
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password} mb={4}>
                        <FormLabel htmlFor="password">パスワード</FormLabel>
                        <Input
                            borderRadius="full"
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                        isInvalid={!!errors.password_confirmation}
                        mb={4}
                    >
                        <FormLabel htmlFor="password_confirmation">
                            パスワード（確認用）
                        </FormLabel>
                        <Input
                            borderRadius="full"
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                        <FormErrorMessage>
                            {errors.password_confirmation}
                        </FormErrorMessage>
                    </FormControl>

                    <Flex mt={4} align="center" justify="flex-end" gap={4}>
                        <ChakraLink
                            as={Link}
                            href={route("login")}
                            fontSize="sm"
                            color="gray.600"
                            _hover={{
                                color: "gray.900",
                                textDecoration: "underline",
                            }}
                        >
                            既にアカウントをお持ちの方はこちら
                        </ChakraLink>

                        <Button
                            colorScheme="purple"
                            borderRadius="full"
                            type="submit"
                            isLoading={processing}
                        >
                            登録
                        </Button>
                    </Flex>
                </form>
            </GuestLayout>
        </ChakraProvider>
    );
}
