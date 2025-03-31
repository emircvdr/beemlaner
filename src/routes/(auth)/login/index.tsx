import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GoogleIcon from "../../../assets/GoogleIcon.svg"
import AppleIcon from "../../../assets/AppleIcon.svg"
import AppLogo from "../../../assets/AppLogo.svg"
import { ArrowDown, BadgeCheck, BadgeX, Github } from 'lucide-react';
import { useState } from 'react';
import { Login, signInWithGithub, signInWithGoogle } from '@/api/authApi';
import { toast } from 'sonner';
import ResetPassword from '@/components/resetPassword';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';


export const Route = createFileRoute('/(auth)/login/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string>("");

    const [isResetPassword, setIsResetPassword] = useState(true);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await Login(form).then((res) => {
                if (res.user) {
                    toast.success("Login Success", {
                        description: "You have successfully logged in",
                        icon: <BadgeCheck color='green' />,
                        style: {
                            backgroundColor: "#111111",
                            color: "#ffffff",
                            border: "1px solid #ffffff",
                            borderRadius: "10px",
                        }
                    })
                    navigate({ to: "/" });
                } else {
                    toast.error("Login Failed", {
                        description: "Invalid email or password",
                        icon: <BadgeX color='red' />,
                        style: {
                            backgroundColor: "#111111",
                            color: "#ffffff",
                            border: "1px solid #ffffff",
                            borderRadius: "10px",

                        }
                    })
                }
            })
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : String(error);

            setError(errorMessage);

            toast.error("Login Error", {
                description: errorMessage,
                icon: <BadgeX color='red' />,
                style: {
                    backgroundColor: "#111111",
                    color: "#ffffff",
                    border: "1px solid #ffffff",
                    borderRadius: "10px",
                }
            });
        }
    };

    const handleLogInWithGithub = async () => {
        try {
            await signInWithGithub();
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogInWithGoogle = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='w-full  flex items-center justify-center'>
            {
                !isResetPassword ? (
                    <ResetPassword />
                ) : (
                    <Card className="w-full max-w-[450px] h-auto py-5 border-none shadow-lg">
                        <CardHeader className='p-2'>
                            <img src={AppLogo} alt="App Logo" className="w-15 h-15 mx-auto mb-5  " />
                            <CardTitle className="text-center text-2xl font-newCustom">Welcome Back!</CardTitle>
                            <CardDescription className="text-center font-newCustom">
                                Please enter your credentials to access your account.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className='p'>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <div className='flex items-center justify-between flex-col gap-2'>
                                    <Button size="lg" className="w-full border" variant="ghost">Login</Button>
                                    <div className='flex items-center justify-between w-full mt-2'>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="terms" />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                        <p className="text-xs font-newCustom">
                                            <span className="underline cursor-pointer" onClick={() => setIsResetPassword(false)}>
                                                Forgot Password?
                                            </span>{" "}
                                        </p>
                                    </div>
                                </div>
                                {error && <p className="text-red-500">{error}</p>}
                            </form>
                        </CardContent>
                        <div className="flex items-center justify-center w-full gap-2 p-2">
                            <Separator orientation="horizontal" className="flex-1" />
                            <ArrowDown size={15} color="#c4c3c3d5" />
                            <Separator orientation="horizontal" className="flex-1" />
                        </div>
                        <div className='flex justify-evenly w-full p-2'>
                            <Button variant="ghost" size="icon" className="p-2 w-16 h-10 border bg-black/20 dark:bg-transparent" onClick={handleLogInWithGoogle}>
                                <img src={GoogleIcon} alt="Google" className="w-6 h-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="p-2 w-16 h-10 border bg-black/20 dark:bg-transparent" onClick={handleLogInWithGithub}>
                                <Github size={20} />
                            </Button>
                            <Button variant="ghost" size="icon" className="p-2 w-16 h-10 border bg-black/20 dark:bg-transparent">
                                <img src={AppleIcon} alt="Apple" className="w-6 h-6" />
                            </Button>
                        </div>
                        <div className="flex flex-col gap-5 items-center  w-full p-3">
                            <p className="text-sm font-newCustom">
                                Don&apos;t have an account?{" "}
                                <a href="/register" className="text-[#8044d3] underline">Register</a>
                            </p>

                        </div>
                    </Card>
                )
            }
        </div >
    )
}
