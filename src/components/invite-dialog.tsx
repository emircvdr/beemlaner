import { Mail, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { getUser } from "@/api/userApi";
import { useUserStore } from "@/store/store";
import BoringAvatar from "boring-avatars";
import { inviteUser } from "@/api/inviteApi";
import { toast } from "sonner";

export default function InviteDialog({ workspaceId }: { workspaceId: string }) {
    const userId = useUserStore((state) => state.userId);
    const [searchEmail, setSearchEmail] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<Array<{ id: string; email: string, avatar_url: string }>>([]);
    const [searchResults, setSearchResults] = useState<Array<{ id: string; email: string, avatar_url: string }>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (userId) {
            getUser(userId).then((data) => {
                setFilteredUsers(data);
            });
        }
    }, [userId]);

    const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value.toLowerCase();
        setSearchEmail(email);

        if (email) {
            const matched = filteredUsers.filter(user =>
                user.email.toLowerCase().includes(email)
            );
            setSearchResults(matched);
        } else {
            setSearchResults([]);
        }
    };

    const handleInvite = () => {
        inviteUser(workspaceId, userId as string, searchResults[0].id, searchResults[0].email, "pending", false).then(() => {
            toast.success("Invite sent successfully");
            setSearchEmail("");
            setSearchResults([]);
            setFilteredUsers([]);
            setError("");
            setIsLoading(false);
        }).catch((error) => {
            toast.error("Failed to invite user");
            console.log(error);
        })
    }

    return (
        <Dialog>
            <DialogTrigger className="ml-auto">
                <Button variant="default" className=" bg-green-300! text-black!">
                    <Plus /> Invite
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Invite a user to the workspace
                </DialogDescription>
                <div className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Type email to search..."
                        value={searchEmail}
                        onChange={handleEmailSearch}
                        className="w-full"
                    />

                    {isLoading && <p className="text-sm text-muted-foreground">Searching...</p>}
                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {searchResults.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between p-2 rounded-lg border"
                            >
                                <div className="flex items-center gap-2">
                                    {
                                        user.avatar_url ? (
                                            <img src={user.avatar_url} alt="avatar" className="size-8! rounded-lg" />
                                        ) : (
                                            <BoringAvatar name={user.id} variant="marble" colors={["#a8bcbd", "#fcdcb3", "#f88d87", "#d65981", "#823772"]} size={100} className="size-8! " />
                                        )
                                    }
                                    <p className="text-sm">{user.email}</p>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleInvite}
                                >
                                    <Mail className="text-green-500 dark:text-green-300" />
                                </Button>
                            </div>
                        ))}
                        {searchEmail && searchResults.length === 0 && (
                            <p className="text-sm text-muted-foreground p-2">
                                No matching users found
                            </p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}