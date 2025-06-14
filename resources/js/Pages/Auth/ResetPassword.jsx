import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Heading,
    ChakraProvider,
} from "@chakra-ui/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import authTheme from "@/Theme/AuthTheme";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email || "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <ChakraProvider theme={authTheme}>
            <GuestLayout>
                <Head title="Reset Password" />

                <Heading as="h2" size="md" mb={6} textAlign="center">
                    パスワード再設定
                </Heading>

                <form onSubmit={submit}>
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
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password} mb={4}>
                        <FormLabel htmlFor="password">
                            新しいパスワード
                        </FormLabel>
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
                            autoFocus
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                        isInvalid={!!errors.password_confirmation}
                        mb={4}
                    >
                        <FormLabel htmlFor="password_confirmation">
                            新しいパスワード（確認用）
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
                        />
                        <FormErrorMessage>
                            {errors.password_confirmation}
                        </FormErrorMessage>
                    </FormControl>

                    <Box mt={4} display="flex" justifyContent="flex-end">
                        <Button
                            variant="roundedPurple"
                            fontSize="sm"
                            type="submit"
                            isLoading={processing}
                        >
                            パスワードを再設定
                        </Button>
                    </Box>
                </form>
            </GuestLayout>
        </ChakraProvider>
    );
}
