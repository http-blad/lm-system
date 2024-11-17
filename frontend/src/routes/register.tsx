import { useSubmission } from "@solidjs/router";
import { Component, createEffect, Match, Switch } from "solid-js";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import Input from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { showToast } from "~/components/ui/toast";
import { login } from "~/lib/actions/security";
import { LoaderCircle } from "lucide-solid";

const RegisterPage: Component<{}> = (props) => {
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
            <div class="xl:w-1/4 lg:w-1/2 space-y-5 w-full col-span-1 p-4">
                <h4 class="text-center pb-4 scroll-m-20 text-xl font-semibold tracking-tight">
                    Register
                </h4>
                <div class="items-top flex flex-col gap-2">
                    <Label>First name</Label>
                    <Input
                        name="firstName"
                        type="text"
                        placeholder="ex. John"
                        required
                    />
                </div>
                <div class="items-top flex flex-col gap-2">
                    <Label>Last name</Label>
                    <Input
                        name="lastName"
                        type="text"
                        placeholder="ex. Doe"
                        required
                    />
                </div>
                <div class="items-top flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="ex. johndoe@gmail.com"
                        required
                    />
                </div>
                <div class="items-top flex flex-col gap-2">
                    <Label>Password</Label>
                    <Input
                        name="password"
                        type="password"
                        placeholder="**********"
                        required
                    />
                </div>
                <div class="items-top flex flex-col gap-2">
                    <Label>Confirm Password</Label>
                    <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="**********"
                        required
                    />
                </div>
                <div class="flex flex-row gap-2.5 justify-between">
                    <div class="items-center flex space-x-2 w-full">
                        <Checkbox name="rememberMe" value="false" />
                        <div class="grid gap-1.5 leading-none">
                            <Label for="terms1-input">
                                Accept terms and condition
                            </Label>
                        </div>
                    </div>
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

export default RegisterPage;
