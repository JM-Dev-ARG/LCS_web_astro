
import { useState, useEffect } from "react";


async function fetchModelos(marca) {
    try {
        const response = await fetch(`/api/modelosApi?marca=${encodeURIComponent(marca)}`);
        if (!response.ok) throw new Error("Error al obtener los modelos");
        const data = await response.json();
        if (!data || !data.data) {
            throw new Error("Formato de datos incorrecto en modelos");
        }
        return data.data; // <- Retornamos directamente el array de modelos
    } catch (error) {
        console.error("Error en el fetch de modelos:", error);
        return []; // <- En caso de error, retornamos un array vacío
    }
}

const SelectModelosForm = ({ selectModelo, setSelectModelo, marca, setModelosServices }) => {
    const [modelos, setModelos] = useState([]);


    useEffect(() => {
        if (!marca) return;

        const fetchData = async () => {
            const modelosData = await fetchModelos(marca);
            setModelos(modelosData);
            setModelosServices(modelosData); // <- Aquí se actualiza correctamente
        };

        fetchData();
    }, [marca, setModelosServices]);




    return (
        <div className="w-full lg:w-[calc(50%-40px)] flex flex-col gap-1">
            <label htmlFor="marca" className="font-extralight text-[clamp(20px,2.5vw,30px)] pl-2 text-gray-50">Modelo</label>
            <select
                id="modelo"
                name="modelo"
                required
                className="flex-1 rounded-full px-4 py-2  max-h-[40px]"
                value={selectModelo}
                onChange={(e) => setSelectModelo(e.target.value)}
            >
                <option value="">Elige una opción</option>
                {modelos.length > 0 ? (
                    modelos.map((item) => (
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

export default SelectModelosForm;