
import { useState, useEffect } from "react";

async function fetchMarcas() {
    try {
        const response = await fetch("/api/marcasApi");
        if (!response.ok) throw new Error("Error al obtener las marcas");

        const data = await response.json();
        if (!data || !data.data) {
            throw new Error("Formato de datos incorrecto");
        }
        return data;

    } catch (error) {
        console.error("Error en el fetch de marcas:", error);
    }
}


const SelectMarcaForm = ({ selectMarca, setSelectMarca }) => {
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        if (marcas.length > 0) return;

        const data = fetchMarcas();
        data.then((data) => {
            setMarcas(data.data
            );
        });

    }, []);

    return (
        <div className="w-full lg:w-[calc(50%-40px)] flex flex-col gap-1">
            <label htmlFor="marca" className="font-extralight text-[clamp(20px,2.5vw,30px)] pl-2 text-gray-50">Marca</label>
            <select
                id="marca"
                name="Marca"
                required
                className="flex-1 rounded-full px-4 py-2  max-h-[40px]"
                value={selectMarca}
                onChange={(e) => {
                    setSelectMarca(e.target.value);
                    setModelos([]);
                }}
            >
                <option value="">Elige una opción</option>
                {marcas.length > 0 ? (
                    marcas.map((item) => (
                        <option key={item.id} value={item.slug}>
                            {item.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Cargando...</option>
                )}
            </select>

        </div>
    );
};

export default SelectMarcaForm;