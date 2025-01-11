
import { useState } from "react"
import "./checkBoxForm.css"

const CheckBoxForm = ({ data = [{ value, labelText }], title }) => {
    const [checkedStates, setCheckedStates] = useState(
        data.map(() => false) // Estado inicial para todos los checkboxes
    );

    const toggleCheckbox = (index) => {
        setCheckedStates((prev) =>
            prev.map((state, i) => (i === index ? !state : state))
        );
    };



    return (
        <div className="w-full flex flex-col gap-1 ">
            <p className="font-extralight text-[clamp(20px,2.5vw,30px)] pl-2 text-gray-50">{title}</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
                {
                    data.map((item, index) => {
                        return (
                            <div key={index} id={index} className={`group w-fit flex justify-center gap-1 items-center ${checkedStates[index] ? "text-[#e69c99]" : ""
                                }`}>
                                <label className="container" for={item.value} >
                                    <input id={item.value} type="checkbox" name={item.value} value="check" onChange={() => toggleCheckbox(index)} />
                                    <div className="checkmark"></div>
                                    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" className="celebrate">
                                        <polygon points="0,0 10,10"></polygon>
                                        <polygon points="0,25 10,25"></polygon>
                                        <polygon points="0,50 10,40"></polygon>
                                        <polygon points="50,0 40,10"></polygon>
                                        <polygon points="50,25 40,25"></polygon>
                                        <polygon points="50,50 40,40"></polygon>
                                    </svg>

                                </label>
                                <p className={`font-extralight text-[clamp(20px,5vw,30px)] pl-2 ${checkedStates[index] ? "text-[#e69c99]" : "text-gray-50"
                                    }`}>{item.labelText}</p>
                            </div>)


                    })
                }
            </div>

        </div>
    )
}

export default CheckBoxForm