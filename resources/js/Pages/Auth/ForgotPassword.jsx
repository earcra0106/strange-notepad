import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Text,
    ChakraProvider,
} from "@chakra-ui/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import authTheme from "@/Theme/AuthTheme";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <ChakraProvider theme={authTheme}>
            <GuestLayout>
                <Head title="Forgot Password" />

                <Text mb={4} fontSize="sm" color="gray.600">
                    アカウントに登録されているメールアドレスを入力してください。パスワード再登録用のリンクを送信します。
                </Text>

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
                            borderRadius="full"
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    <Box mt={4} display="flex" justifyContent="flex-end">
                        <Button
                            variant="roundedPurple"
                            fontSize="sm"
                            type="submit"
                            isLoading={processing}
                        >
                            メールを送信
                        </Button>
                    </Box>
                </form>
            </GuestLayout>
        </ChakraProvider>
    );
}
