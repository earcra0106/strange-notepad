import {
    Box,
    Button,
    Text,
    Alert,
    AlertIcon,
    Flex,
    Spacer,
    ChakraProvider,
    Heading,
} from "@chakra-ui/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import authTheme from "@/Theme/AuthTheme";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <ChakraProvider theme={authTheme}>
            <GuestLayout>
                <Head title="Email Verification" />

                <Heading as="h2" size="md" mb={6} textAlign="center">
                    メールアドレスの認証
                </Heading>

                <Box mb={4}>
                    <Text fontSize="sm" color="gray.600">
                        ご登録ありがとうございます！ご利用を開始する前に、登録したメールアドレス宛に送信された認証リンクをクリックしてメールアドレスを認証してください。
                        <br />
                        メールが届いていない場合は、下のボタンから再送信できます。
                    </Text>
                </Box>

                {status === "verification-link-sent" && (
                    <Alert status="success" mb={4} fontSize="sm">
                        <AlertIcon />
                        新しい認証リンクをメールアドレスに送信しました。
                    </Alert>
                )}

                <form onSubmit={submit}>
                    <Flex mt={4} align="center" gap={4}>
                        <Button
                            variant="roundedPurple"
                            fontSize="sm"
                            type="submit"
                            isLoading={processing}
                        >
                            認証メールを再送信
                        </Button>
                        <Spacer />
                        <Button
                            as={Link}
                            href={route("logout")}
                            method="post"
                            variant="link"
                            color="gray.600"
                            fontSize="sm"
                        >
                            ログアウト
                        </Button>
                    </Flex>
                </form>
            </GuestLayout>
        </ChakraProvider>
    );
}
