"use client";

import ClubCard from '@/components/ClubCard';
import CreateSpadSelect from '@/components/layout/CreateSpadSelect';
import Disclaimer from '@/components/layout/Disclaimer';
import Button from '@/components/template/Button';
import Card from '@/components/template/Card';
import Text from '@/components/template/Text';
import TextArea from '@/components/template/TextArea';
import TextInput from '@/components/template/TextInput';
import WalletContext from '@/context/WalletContext';
import { createSpadClub, getCreatedClub } from '@/helpers/spad-club';
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const CreateClubPage = () => {
    const { address, status } = useContext(WalletContext)
    const [creating, setCreating] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [existingClub, setExistingClub] = useState(null)

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
            toast.success("SPADClub is created");
            router.push(`/clubs/${response.data.events.SpadClubCreated.returnValues.spadClub}`)
        } else {
            toast.error(response?.status)
        }
        setCreating(false)
    }

    useEffect(() => {
        const loadExistingClubs = async () => {
            if (address !== "") {
                const clubAddress = await getCreatedClub(address);
                console.log(clubAddress);
                setExistingClub(clubAddress)
            }
        }
        loadExistingClubs();

    }, [address])

    return (
        <div>
            <div className='text-center'>
                <p className="font-semibold mb-2 text-slate-400">LETS GET STARTED</p>
                <Text className="uppercase font-bold text-2xl">Start a SPADClub</Text>
            </div>
            <CreateSpadSelect className="max-w-2xl mx-auto" active="club" />
            {
                existingClub && existingClub !== '0x0000000000000000000000000000000000000000' ?
                    <div className='max-w-2xl mx-auto mt-8'>
                        <p className='text-xl text-amber-500 text-center mb-4'>Your Existing SPADClub</p>
                        <div className='w-full'>
                            <ClubCard clubAddress={existingClub} address={address} />
                        </div>
                    </div> :
                    <div className="max-w-2xl mx-auto mt-8">
                        <Card>
                            <form className="flex flex-col gap-4 text-center" onSubmit={handleCreateClub}>
                                <h2 className='text-xl font-bold text-center'>Create a new SPADClub</h2>
                                <div className='mb-3'>
                                    <label htmlFor='name' className='block mb-2'>Name</label>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        placeholder="SPADClub Name"
                                        required={true}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='description' className='block mb-2'>Description</label>
                                    <TextArea
                                        id="description"
                                        placeholder="SPADClub Description"
                                        required={true}
                                        rows={4}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <Disclaimer />
                                </div>
                                {
                                    creating ?
                                        <Button isProcessing={true} disabled className="inline-block mx-auto">
                                            Creating a SPADClub
                                        </Button> :
                                        <Button type="submit" className="inline-block mx-auto">
                                            Create SPADClub
                                        </Button>
                                }

                            </form>
                        </Card>
                    </div>
            }

        </div>
    )
}

export default CreateClubPage