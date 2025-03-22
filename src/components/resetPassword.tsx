import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ResetPasswordUser } from "@/api/authApi";
import { toast } from "sonner";


export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await ResetPasswordUser({ email });
            toast.success("Password reset email sent");
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className='w-full  flex items-center justify-center'>
            <Card className="w-full max-w-[450px] h-auto py-5 border-none shadow-none">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Button type="submit" className="w-full mt-5" disabled={isLoading || !email}>Reset Password</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}