
import { useState, useEffect } from "react";

const SelectVersionForm = ({ selectVersion, setSelectVersion, version }) => {
    const [versiones, setVersiones] = useState([]);
    useEffect(() => {
        if (!version) return;
        setVersiones(version);
    }, [version]);

    return (
        <div className="w-full lg:w-[calc(50%-40px)] flex flex-col gap-1">
            <label htmlFor="version" className="font-extralight text-[clamp(20px,2.5vw,30px)] pl-2 text-gray-50">Version</label>
            <select
                id="version"
                name="Version"
                required
                className="flex-1 rounded-full px-4 py-2  max-h-[40px]"
                value={selectVersion}
                onChange={(e) => setSelectVersion(e.target.value)}
            >
                <option value="">Elige una opción</option>
                {versiones.length > 0 ? (
                    versiones.map((item) => (
                        <option key={item.id} value={item.slug}>
                            {item.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Selecciona una marca</option>
                )}
            </select>

        </div>
    );
};

export default SelectVersionForm;