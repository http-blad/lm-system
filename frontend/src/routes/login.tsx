import { useSubmission } from "@solidjs/router";
import { Component, createEffect, Match, Switch } from "solid-js";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import Input from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { showToast } from "~/components/ui/toast";
import { login } from "~/lib/actions/security";
import { LoaderCircle } from "lucide-solid";

const LoginPage: Component<{}> = (props) => {
    const loginResult = useSubmission(login);
    createEffect(() => {
        if (loginResult.error !== undefined) {
            const error: { code: number; message: string } = loginResult.error;
            switch (error.code) {
                case 400:
                    showToast({
                        title: "Invalid action",
                        description: error.message,
                    });
                    break;
                default:
                    showToast({
                        title: "Internal Error",
                        description: "An error occured in the server",
                    });
            }
        }
    });

    return (
        <form
            class="h-screen max-h-screen grid grid-cols-1 justify-items-center items-center"
            action={login}
            method="post"
        >
            <div class="w-1/4 space-y-2.5 col-span-1">
                <h4 class="text-center pb-4 scroll-m-20 text-xl font-semibold tracking-tight">
                    Login
                </h4>
                <Input name="email" type="email" placeholder="Email Address" />
                <Input name="password" type="password" placeholder="Password" />
                <div class="flex flex-row gap-2.5 justify-between">
                    <div class="items-center flex space-x-2 w-full">
                        <Checkbox name="rememberMe" value="false" />
                        <div class="grid gap-1.5 leading-none">
                            <Label for="terms1-input">Remember me</Label>
                        </div>
                    </div>
                    <Button
                        as="a"
                        href="/forgot-password"
                        variant={"link"}
                        class="p-0 w-full justify-end"
                    >
                        Forgot password?
                    </Button>
                </div>
                <Button
                    disabled={loginResult.pending}
                    class="w-full"
                    type="submit"
                >
                    <Switch fallback={<>Log in</>}>
                        <Match when={loginResult.pending}>
                            <LoaderCircle class="animate-spin" size={16} />
                        </Match>
                    </Switch>
                </Button>
                <Button
                    as="a"
                    href="/register"
                    variant={"ghost"}
                    class="p-0 w-full"
                >
                    Create account
                </Button>
            </div>
        </form>
    );
};

export default LoginPage;
