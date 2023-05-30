import WalletContext from '@/context/WalletContext'
import { createSpad } from '@/helpers/spad-club'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../template/Button'
import TextInput from '../template/TextInput'
import Modal from '../template/Modal'
import TextArea from '../template/TextArea'

const CreateSpad = ({ clubAddress, loadClub, creator }) => {
    const { address } = useContext(WalletContext)

    if (creator != address) {
        return (<></>)
    }

    const [show, setShow] = useState(false)
    const [creating, setCreating] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [password, setPassword] = useState("")
    const [target, setTarget] = useState("")
    const [minInvestment, setMinInvestment] = useState("")
    const [maxInvestment, setMaxInvestment] = useState("")
    const [externalToken, setExternalToken] = useState("")
    const [valuation, setValuation] = useState("")
    const [carry, setCarry] = useState("")

    const documentBodyRef = useRef(null);

    const handleClose = () => {
        setShow(false);
    }

    const handleCreateSpad = async () => {
        if (name == "" || description == "" || password == "" || target == "" || minInvestment == "" || maxInvestment == "" || externalToken == "" || valuation == "" || carry == "") {
            toast.error("All fields are compulsory");
            return false;
        }
        if (parseInt(maxInvestment) >= parseInt(target)) {
            toast.error("Maximum investment should be less than target");
            return false;
        }
        if (parseInt(minInvestment) >= parseInt(maxInvestment)) {
            toast.error("Maximum investment should be greater than minimum investment");
            return false;
        }
        if (carry >= 100 || carry <= 0) {
            toast.error("Carry should be between 1 to 100");
            return false;
        }
        setCreating(true);
        const response = await createSpad(address, clubAddress, name, description, password, target, minInvestment, maxInvestment, externalToken, valuation, carry);
        if (response.code == 200) {
            toast.success("SPAD is created");
            loadClub();

        } else {
            toast.error(response?.status)
        }
        setShow(false);
        setCreating(false);
    }

    useEffect(() => {
        documentBodyRef.current = document.body;
    }, [])

    return (
        <div>
            <Button onClick={() => setShow(true)}>Create SPAD</Button>
            <Modal
                show={show}
                onClose={handleClose}
            >
                <div className="space-y-4">
                    <h3 className="text-xl font-medium text-gray-900">
                        Create a SPAD
                    </h3>
                    <div>
                        <label htmlFor="name" className='block mb-2'>
                            SPAD Name
                        </label>
                        <TextInput
                            id="name"
                            placeholder="Name"
                            required={true}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className='block mb-2'>
                            Description
                        </label>
                        <TextArea
                            id="description"
                            placeholder="SPAD Description"
                            required={true}
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="password" className='block mb-2'>
                                SPAD Password
                            </label>
                            <TextInput
                                id="password"
                                type='password'
                                placeholder="Password"
                                required={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="target" className='block mb-2'>
                                Target
                            </label>
                            <TextInput
                                id="target"
                                type='number'
                                placeholder="Target"
                                required={true}
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                suffix="USDC"
                            />
                        </div>
                        <div>
                            <label htmlFor="minInvestment" className='block mb-2'>
                                Minimum Investment
                            </label>
                            <TextInput
                                id="minInvestment"
                                type='number'
                                placeholder="MIN Investment"
                                required={true}
                                min={1}
                                value={minInvestment}
                                onChange={(e) => setMinInvestment(e.target.value)}
                                suffix="USDC"
                            />
                        </div>
                        <div>
                            <label htmlFor="maxInvestment" className='block mb-2'>
                                Maximum Investment
                            </label>
                            <TextInput
                                id="maxInvestment"
                                type='number'
                                placeholder="MAX Investment"
                                required={true}
                                min={1}
                                value={maxInvestment}
                                onChange={(e) => setMaxInvestment(e.target.value)}
                                suffix="USDC"
                            />
                        </div>
                        <div>
                            <label htmlFor="valuation" className='block mb-2'>
                                Valuation
                            </label>
                            <TextInput
                                id="valuation"
                                type='number'
                                placeholder="Valuation"
                                required={true}
                                min={1}
                                value={valuation}
                                onChange={(e) => setValuation(e.target.value)}
                                suffix="USDC"
                            />
                        </div>
                        <div>
                            <label htmlFor="carry" className='block mb-2'>
                                Carry
                            </label>
                            <TextInput
                                id="carry"
                                type='number'
                                placeholder="Carry"
                                required={true}
                                min={1}
                                max={99}
                                value={carry}
                                onChange={(e) => setCarry(e.target.value)}
                                suffix="%"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="externalToken" className='block mb-2'>
                            External Token Address
                        </label>
                        <TextInput
                            id="externalToken"
                            placeholder="External Token Address"
                            required={true}
                            value={externalToken}
                            onChange={(e) => setExternalToken(e.target.value)}
                        />
                    </div>
                    <div className='pt-4 flex gap-4'>
                        {
                            creating ?
                                <Button isProcessing={true} disabled>
                                    Creating a SPAD
                                </Button> :
                                <Button type="submit" onClick={handleCreateSpad}>
                                    Create SPAD
                                </Button>
                        }

                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreateSpad