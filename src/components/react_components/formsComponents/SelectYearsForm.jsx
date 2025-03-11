
import { useState, useEffect } from "react";

const SelectYearsForm = ({ selectYear, setSelectYear, years }) => {
    const [year, setYear] = useState([]);

    useEffect(() => {
        if (!years) return;
        setYear(years);
    }, [years]);

    return (
        <div className="w-full lg:w-[calc(50%-40px)] flex flex-col gap-1">
            <label htmlFor="version" className="font-extralight text-[clamp(20px,2.5vw,30px)] pl-2 text-gray-50">Año</label>
            <select
                id="año"
                name="año"
                required
                className="flex-1 rounded-full px-4 py-2  max-h-[40px]"
                value={selectYear}
                onChange={(e) => setSelectYear(e.target.value)}
            >
                <option value="">Elige una opción</option>
                {year.length > 0 ? (
                    year.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))
                ) : (
                    <option disabled>Selecciona un año</option>
                )}
            </select>

        </div>
    );
};

export default SelectYearsForm;