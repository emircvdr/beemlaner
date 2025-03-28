import { useMemo, useState } from 'react'
import { createAvatar } from '@dicebear/core'
import { notionists } from '@dicebear/collection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Input } from './ui/input'
import { testInsert } from '@/api/userApi'



export const CreateAvatar = (
    username: any,

) => {
    const [avatarOptions, setAvatarOptions] = useState({
        seed: "Aneka",
        backgroundColor: ["f8f9fa"],
        backgroundType: ["solid"],
        body: ["variant01"],
        bodyIcon: ["electric"],
        bodyIconProbability: 75,
        beard: ["variant01"],
        beardProbability: 100,
        brows: ["variant01"],
        eyes: ["variant01"],
        glasses: ["variant01"],
        glassesProbability: 20,
        hair: ["variant01"],
        nose: ["variant01"],
        lips: ["variant01"],
        radius: 5,
    })


    const avatar = useMemo(() => {
        return createAvatar(notionists, avatarOptions).toDataUri()
    }, [avatarOptions])



    const createPreview = (optionType: string, value: string) => {
        return createAvatar(notionists, {
            ...avatarOptions,
            [optionType]: [value],
            size: 64
        }).toDataUri()
    }

    const handleChange = (key: string, value: string) => {
        setAvatarOptions(prev => ({
            ...prev,
            [key]: [value]
        }))
    }

    const handleSave = () => {
        const form = {
            id: username.userAllData.id,
            email: username.userAllData.email,
            username: username.username,
            fullname: username.userAllData.identities[0].identity_data.fullname,
            avatar_options: avatarOptions,
            is_setup_profile: true,
        }
        console.log(form, "form")
        testInsert(
            form.id,
            form.fullname,
            form.email,
            form.is_setup_profile,
            form.username,
            form.avatar_options
        )
    }

    const renderOptionGrid = (optionKey: string, length: number) => (
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {Array.from({ length }, (_, i) => `variant${(i + 1).toString().padStart(2, '0')}`).map(variant => (
                <button
                    key={variant}
                    onClick={() => handleChange(optionKey, variant)}
                    className={`aspect-square p-2.5 border rounded-md hover:border-blue-500 transition-colors ${avatarOptions[optionKey][0] === variant ? 'border-blue-500' : 'border-gray-200'
                        }`}
                >
                    <img
                        src={createPreview(optionKey, variant)}
                        alt={variant}
                        className="w-full h-full object-cover"
                    />
                </button>
            ))}
        </div>
    )

    return (
        <div className="flex flex-col w-full justify-center items-center lg:flex-row gap-6 p-6">
            <div className='flex flex-row gap-4'>
                <div className="flex flex-col gap-4">
                    <div className="w-56 h-56 sm:w-64 sm:h-64 border rounded-lg p-4 flex items-center justify-center bg-white">
                        <img src={avatar} alt="avatar" className="w-44 h-44 sm:w-52 sm:h-52" />
                    </div>
                    <Input placeholder='Username' className='w-full' disabled value={`@${username.username}`} />
                    <Button onClick={handleSave} className="w-full text-sm">
                        Complete Profile
                    </Button>
                </div>

                {/* Right side - Options */}
                <div className="flex-1 max-w-3xl border h-fit rounded-lg p-3">
                    <Tabs defaultValue="hair" className="w-full">
                        <TabsList className="grid grid-cols-4 gap-2 w-full">
                            <TabsTrigger value="hair" className="text-xs py-1.5">Hair</TabsTrigger>
                            <TabsTrigger value="face" className="text-xs py-1.5">Face</TabsTrigger>
                            <TabsTrigger value="accessories" className="text-xs py-1.5">Accessories</TabsTrigger>
                            <TabsTrigger value="body" className="text-xs py-1.5">Body</TabsTrigger>
                        </TabsList>

                        <div className="h-[450px] overflow-y-auto mt-3">
                            <TabsContent value="hair" className="mt-2">
                                {renderOptionGrid('hair', 63)}
                            </TabsContent>

                            <TabsContent value="face" className="space-y-4 mt-2">
                                <div>
                                    <label className="text-xs font-medium block mb-2">Eyes</label>
                                    {renderOptionGrid('eyes', 5)}
                                </div>
                                <div>
                                    <label className="text-xs font-medium block mb-2">Brows</label>
                                    {renderOptionGrid('brows', 13)}
                                </div>
                                <div>
                                    <label className="text-xs font-medium block mb-2">Nose</label>
                                    {renderOptionGrid('nose', 20)}
                                </div>
                                <div>
                                    <label className="text-xs font-medium block mb-2">Lips</label>
                                    {renderOptionGrid('lips', 30)}
                                </div>
                                <div>
                                    <label className="text-xs font-medium block mb-2">Beard</label>
                                    {renderOptionGrid('beard', 13)}
                                </div>
                            </TabsContent>

                            <TabsContent value="accessories" className="mt-4">
                                <div>
                                    <label className="text-xs font-medium block mb-2">Glasses</label>
                                    {renderOptionGrid('glasses', 12)}
                                </div>
                            </TabsContent>

                            <TabsContent value="body" className="space-y-4 mt-4">
                                <div>
                                    <label className="text-xs font-medium block mb-2">Body</label>
                                    {renderOptionGrid('body', 25)}
                                </div>
                                <div>
                                    <label className="text-xs font-medium block mb-2">Body Icon</label>
                                    <div className="grid grid-cols-8 gap-1.5">
                                        {["electric", "saturn", "galaxy"].map(icon => (
                                            <button
                                                key={icon}
                                                onClick={() => handleChange('bodyIcon', icon)}
                                                className={`aspect-square p-1 border rounded-md hover:border-blue-500 transition-colors ${avatarOptions.bodyIcon[0] === icon ? 'border-blue-500' : 'border-gray-200'
                                                    }`}
                                            >
                                                <img
                                                    src={createPreview('bodyIcon', icon)}
                                                    alt={icon}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                        </div>
                    </Tabs>
                </div>
            </div>

        </div>
    )
}
