
const TextInput = ({ className, prefix, suffix, ...props }) => {
    
    return (
        <div className={`flex items-center text-gray-800`}>
            { prefix && 
                <div className="bg-gray-200 p-2.5 outline-0 rounded-s-full leading-5 border border-gray-200">{prefix}</div> 
            }
            <input className={`block w-full min-w-[100px] border disabled:cursor-not-allowed outline-0 disabled:opacity-50 bg-gray-200 border-gray-200  focus:border-purple-400 focus:ring-purple-200 focus:ring-4 rounded-full p-2.5 text-sm ${prefix ? 'rounded-s-none': ''}  ${suffix ? 'rounded-e-none': ''} z-10 ${className}`} {...props} />
            { suffix && 
                <div className="bg-gray-200 p-2.5 outline-0 rounded-e-full leading-5 border border-gray-200">{suffix}</div>
            }
        </div>
    )
}

export default TextInput