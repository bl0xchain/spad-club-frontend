import { FiX } from 'react-icons/fi'

const Modal = ({ children, className, show, onClose, size, ...props }) => {
    if (! show) return null;
    return (
        <div className={`fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50`}>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className={`${size == 'small' ? 'md:w-[400px]' : 'md:w-[600px]' } w-[90%] mx-auto relative my-10`}>
                    {
                        onClose != false &&
                        <FiX className='text-gray-500 hover:text-black text-2xl cursor-pointer absolute right-2 top-2' onClick={onClose} />
                    }
                    <div className='bg-white p-5 rounded-xl'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal