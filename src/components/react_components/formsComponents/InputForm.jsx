


const InputForm = ({ name, placeholder, type, labelText }) => {
    return (
        <div className="w-full lg:w-[calc(50%-40px)] flex flex-col gap-1">
            <label
                for={name}
                className="font-extralight text-[clamp(20px,5vw,30px)] pl-2 text-gray-50"
            >{labelText}
            </label>
            <input
                required
                className="flex-1 rounded-full px-4 py-2 max-h-[40px]"
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputForm