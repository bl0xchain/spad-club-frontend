"use client";

import WalletContext from '@/context/WalletContext';
import { createTokenClub } from '@/helpers/tokenClub';
import { Button, Card, Label, TextInput, Textarea } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';

const CreateClubPage = () => {
    const { address, status } = useContext(WalletContext)
    const [creating, setCreating] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const router = useRouter()

    const handleCreateClub = async (e) => {
        e.preventDefault();
        if (name == "" || description == "") {
            toast.error("All fields are compulsory")
            return;
        }
        setCreating(true)
        const response = await createTokenClub(address, name, description);
        if (response.code == 200) {
            toast.success("TokenClub is created");
            router.push(`/clubs/${response.data.events.TokenClubCreated.returnValues.tokenClub}`)
        } else {
            toast.error(response?.status)
        }
        setCreating(false)
    }

    return (
        <div>
            <div className="max-w-sm" style={{ margin: "0 auto" }}>
                <Card>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create a TokenClub
                    </h5>
                    <form className="flex flex-col gap-4" onSubmit={handleCreateClub}>
                        <div className='mb-3'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name"
                                    value="TokenClub Name"
                                />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="TokenClub Name"
                                required={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="description"
                                    value="TokenClub Description"
                                />
                            </div>
                            <Textarea
                                id="description"
                                placeholder="TokenClub Description"
                                required={true}
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        {
                            creating ?
                                <Button isProcessing={true} disabled  pill={true} className='button-color'>
                                    Creating a TokenClub
                                </Button> :
                                <Button type="submit" pill={true} className='button-color'>
                                    Create TokenClub
                                </Button>
                        }

                    </form>
                </Card>
            </div>
        </div>
    )
}

export default CreateClubPage