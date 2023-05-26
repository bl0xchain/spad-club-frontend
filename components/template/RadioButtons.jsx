import React from 'react'

const RadioButtons = ({ className, name, inline, options, setValue, ...props }) => {
    return (
        <div className="flex">
            {options.map((option, index) => (
                <div key={index} className="flex items-center mr-4">
                    <input id={`${name}-${index}`} type="radio" value={option.key} name={name} className="appearance-none h-4 w-4 bg-zinc-200 rounded-full checked:bg-purple-600 checked:scale-75 transition-all duration-200 peer" onChange={(e) => setValue(e.target.value)} />
                    <div class='h-4 w-4 absolute rounded-full pointer-events-none peer-checked:border-purple-300 peer-checked:border-2'></div>
                    <label for={`${name}-${index}`} className="ml-2 text-sm font-medium text-gray-900">{option.value}</label>
                </div>
            ))}
        </div>
    )
}

export default RadioButtons