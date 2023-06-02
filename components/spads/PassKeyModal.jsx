import React from 'react'
import Modal from '../template/Modal'
import TextInput from '../template/TextInput'
import Button from '../template/Button'

const PassKeyModal = ({ show, setShow, passKey, setPassKey, handleAction }) => {
    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <h2 className='text-xl font-bold'>SPAD Pass Key</h2>
            <div>
                <label className='block text-sm font-bold text-gray-700' htmlFor='passKey'>Enter Your Pass Key for the SPAD</label>
                <TextInput
                    id="passKey"
                    value={passKey}
                    onChange={(e) => setPassKey(e.target.value)}
                />
            </div>
            <div className='flex gap-2'>
                {
                    passKey ?
                        <Button onClick={handleAction}>
                            Proceed
                        </Button> :
                        <Button disabled>
                            Proceed
                        </Button>
                }
                <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
            </div>
        </Modal>
    )
}

export default PassKeyModal