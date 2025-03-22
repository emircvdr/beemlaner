import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { Github, } from 'lucide-react';
import GoogleIcon from "../../../assets/GoogleIcon.svg"
import { Register } from '@/api/authApi';

export const Route = createFileRoute('/(auth)/register/')({
    component: RouteComponent,
})



function RouteComponent() {
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
    })

    const [error, setError] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await Register(form);
        } catch (error) {
            setError(error as string);
        }
    }

    return (
        <div className='w-full  flex items-center justify-center'>
            <Card className="w-full max-w-[450px] h-auto border-none shadow-none">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-newCustom">Join Us Today!</CardTitle>
                    <CardDescription className="text-center text-[14px] font-newCustom">
                        By signing up, you acknowledge that you have read and accepted our{" "}
                        <a href="" className="text-blue-600">Privacy Policy</a> and{" "}
                        <a href="" className="text-blue-600">Terms of Service</a>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            type="text"
                            name="fullname"
                            placeholder="Fullname"
                            value={form.fullname}
                            onChange={handleChange}
                        />
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
                        <Button size="lg" className="w-full" variant="default">Register</Button>
                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                </CardContent>

                <div className="flex flex-col gap-5 items-center mt-5 w-full p-3">
                    <Button variant="secondary" className="w-full max-w-[300px]">
                        <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
                        &nbsp;
                        <p className="font-bold">Register with Google</p>
                    </Button>
                    <Button variant="secondary" className="w-full max-w-[300px] hover:">
                        <Github />
                        &nbsp;
                        <p className="font-bold">Register with Github</p>
                    </Button>
                    <p className="text-sm font-newCustom">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600">Login</a>
                    </p>
                </div>
            </Card>
        </div>
    )
}
