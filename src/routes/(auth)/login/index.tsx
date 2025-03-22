import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GoogleIcon from "../../../assets/GoogleIcon.svg"
import { BadgeCheck, BadgeX, Github } from 'lucide-react';
import { useState } from 'react';
import { Login } from '@/api/authApi';
import { toast } from 'sonner';


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
                        icon: <BadgeCheck color='green' />
                    })
                    navigate({ to: "/" });
                } else {
                    toast.error("Login Failed", {
                        description: "Invalid email or password",
                        icon: <BadgeX color='red' />
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
                icon: <BadgeX color='red' />
            });
        }
    };

    return (
        <div className='w-full  flex items-center justify-center'>
            <Card className="w-full max-w-[450px] h-auto py-5 border-none shadow-none">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-newCustom">Welcome Back!</CardTitle>
                    <CardDescription className="text-center font-newCustom">
                        Please enter your credentials to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
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

                        <Button size="lg" className="w-full" variant="default">Login</Button>
                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                </CardContent>
                <div className="flex flex-col gap-5 items-center mt-5 w-full p-3">
                    <Button variant="secondary" className="w-full max-w-[300px]">
                        <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
                        &nbsp;
                        <p className="font-bold">Login with Google</p>
                    </Button>
                    <Button variant="secondary" className="w-full max-w-[300px]">
                        <Github size={20} />
                        &nbsp;
                        <p className="font-bold">Login with Github</p>
                    </Button>
                    <p className="text-sm font-newCustom">
                        Don&apos;t have an account?{" "}
                        <a href="/register" className="text-blue-600">Register</a>
                    </p>
                </div>
            </Card>
        </div >
    )
}
