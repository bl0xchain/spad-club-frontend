"use client";

import Button from '@/components/template/Button';
import Card from '@/components/template/Card';
import TextArea from '@/components/template/TextArea';
import TextInput from '@/components/template/TextInput';
import WalletContext from '@/context/WalletContext';
import { createSpadClub } from '@/helpers/spadClub';
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
        const response = await createSpadClub(address, name, description);
        console.log(response);
        if (response.code == 200) {
            toast.success("SpadClub is created");
            router.push(`/clubs/${response.data.events.SpadClubCreated.returnValues.spadClub}`)
        } else {
            toast.error(response?.status)
        }
        setCreating(false)
    }

    return (
        <div>
            <div className="max-w-sm mx-auto">
                <Card>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
                        Create a SpadClub
                    </h5>
                    <form className="flex flex-col gap-4 text-center" onSubmit={handleCreateClub}>
                        <div className='mb-3'>
                            <label htmlFor='name' className='block mb-2'>Name</label>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="SpadClub Name"
                                required={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='description' className='block mb-2'>Description</label>
                            <TextArea
                                id="description"
                                placeholder="SpadClub Description"
                                required={true}
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        {
                            creating ?
                                <Button isProcessing={true} disabled>
                                    Creating a SpadClub
                                </Button> :
                                <Button type="submit">
                                    Create SpadClub
                                </Button>
                        }

                    </form>
                </Card>
            </div>
        </div>
    )
}

export default CreateClubPage