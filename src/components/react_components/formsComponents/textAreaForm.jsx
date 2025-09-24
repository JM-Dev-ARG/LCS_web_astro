const TextAreaForm = () => {
    return (
        <div className="w-full flex flex-col gap-1">
            <label
                htmlFor="Mensaje"
                className="font-extralight text-[clamp(20px,5vw,30px)] pl-2 text-gray-50"
            >Mensaje
            </label>
            <textarea
                required
                rows={8}
                className="flex-1 rounded-3xl px-4 py-2 "
                id="Mensaje"
                name="Mensaje"
                placeholder="Dejanos tu mensaje"
            />
        </div>
    )
}

export default TextAreaForm