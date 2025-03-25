import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { ArrowDown, Github, } from 'lucide-react';
import GoogleIcon from "../../../assets/GoogleIcon.svg"
import AppleIcon from "../../../assets/AppleIcon.svg"
import AppLogo from "../../../assets/AppLogo.svg"
import { Register } from '@/api/authApi';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
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
            await Register(form).then((res) => {
                if (res) {
                    toast.success("Please check your email for verification")
                }
            })
        } catch (error) {
            setError(error as string);
        }
    }

    return (
        <div className='w-full  flex items-center justify-center'>
            <Card className="w-full max-w-[450px] h-auto border-none shadow-none">
                <CardHeader>
                    <img src={AppLogo} alt="App Logo" className="w-15 h-15 mx-auto mb-5  " />
                    <CardTitle className="text-center text-2xl font-newCustom">Join Us Today!</CardTitle>
                    <CardDescription className="text-center text-[14px] font-newCustom">
                        By signing up, you acknowledge that you have read and accepted our{" "}
                        <a href="" className="text-[#8044d3] ">Privacy Policy</a> and{" "}
                        <a href="" className="text-[#8044d3] ">Terms of Service</a>.
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
                        <Button size="lg" className="w-full border" variant="ghost">Register</Button>
                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                </CardContent>
                <div className="flex items-center justify-center w-full gap-2 p-2">
                    <Separator orientation="horizontal" className="flex-1" />
                    <ArrowDown size={15} color="#c4c3c3d5" />
                    <Separator orientation="horizontal" className="flex-1" />
                </div>
                <div className='flex justify-evenly w-full p-2'>
                    <Button variant="ghost" size="icon" className="p-2 w-16 h-10 border bg-black/20 dark:bg-transparent">
                        <img src={GoogleIcon} alt="Google" className="w-6 h-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="p-2 w-16 h-10 border bg-black/20 dark:bg-transparent">
                        <Github size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" className="p-2 w-16 h-10 border bg-black/20 dark:bg-transparent">
                        <img src={AppleIcon} alt="Apple" className="w-6 h-6" />
                    </Button>
                </div>

                <div className="flex flex-col gap-5 items-center mt-5 w-full p-3">
                    <p className="text-sm font-newCustom">
                        Already have an account?{" "}
                        <a href="/login" className="text-[#8044d3] underline">Login</a>
                    </p>
                </div>
            </Card>
        </div>
    )
}
