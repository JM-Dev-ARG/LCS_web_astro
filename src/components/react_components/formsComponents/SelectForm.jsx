

export const SelectForm = ({ name, labelText, data = [{ value, labelText }] }) => {
    return (
        <div className="w-full lg:w-[calc(50%-40px)] flex flex-col gap-1">
            <label
                htmlFor={name}
                className="font-extralight text-[clamp(20px,2.5vw,30px)] pl-2 text-gray-50"
            >{labelText}
            </label>
            <select

                required
                className="flex-1 rounded-full px-4 py-2  max-h-[40px]"
                type="select"
                id={name}
                name={name}
                defaultValue="Elige una opcion"

            >{<option disabled value="Elige una opcion" >Elige una opcion</option>}
                {
                    data.map((item) => {
                        return (
                            <option key={item.value} id={item.value} value={item.value}>{item.labelText}</option>
                        )
                    })
                }

            </select>
        </div>
    )
}
