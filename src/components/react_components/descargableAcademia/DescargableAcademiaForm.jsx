
import { useState } from "react";
import "./form.css";
import Swal from "sweetalert2";

// Verificar viewport
const isMobile = window.matchMedia("(max-width: 430px)").matches;

// Función para mostrar un mensaje de éxito
function saludo() {
    Swal.fire({
        width: isMobile ? 300 : undefined,
        title: "Gracias por completar tus datos 🫶",
        text: "En breve estaras recibiendo el enlace de descarga en tu email",
        showConfirmButton: false,
        timer: 5000,
    });
}

// Función para mostrar un mensaje de error
function saludoError() {
    Swal.fire({
        width: isMobile ? 300 : undefined,
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal, intenta de nuevo por favor",
    });
}

// Componente principal del formulario
export default function DescargableAcademiaForm() {
    const date = `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`;
    const [loading, setLoading] = useState(false);

    async function submit(e) {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch("/api/downloadApi", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (data.message) {
                saludo();
                form.reset();
            } else {
                saludoError();
            }
        } catch (error) {
            console.error("Error:", error);
            saludoError();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=" w-full flex justify-center items-center  z-10">
            <form
                onSubmit={submit}
                className=" w-full h-full flex  items-center justify-center "
            >
                <div className=" w-full   flex flex-col  justify-center items-center gap-2 ">
                    <div className="flex flex-col lg:flex-row gap-4 w-[90%] ">
                        <div className=" flex flex-col gap-1 flex-1" >
                            <label
                                htmlFor="Nombre"
                                className="font-extralight text-[clamp(14px,3vw,18px)] pl-2 text-gray-50"
                            >Nombre
                            </label>
                            <input
                                required
                                className="campo flex-1 shadow-academia-boton px-4 py-2 max-h-[30px] lg:max-h-[40px]"
                                type="text"
                                id="Nombre"
                                name="Nombre"
                                placeholder="Juan"
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1" >
                            <label
                                htmlFor="Apellido"
                                className="font-extralight text-[clamp(14px,3vw,18px)] pl-2 text-gray-50"
                            >Apellido
                            </label>
                            <input
                                required
                                className="campo flex-1 shadow-academia-boton px-4 py-2 max-h-[30px] lg:max-h-[40px]"
                                type="text"
                                id="Apellido"
                                name="Apellido"
                                placeholder="Perez"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-[90%] ">
                        <div className=" flex flex-col gap-1">
                            <label
                                htmlFor="Email"
                                className="font-extralight text-[clamp(14px,3vw,18px)] pl-2 text-gray-50"
                            >Email
                            </label>
                            <input
                                required
                                className="campo flex-1 shadow-academia-boton px-4 py-2 max-h-[30px] lg:max-h-[40px] "
                                type="email"
                                id="Email"
                                name="Email"
                                placeholder="juanperez@tumail.com"
                            />
                        </div>
                        <input type="text" name="sheetName" defaultValue="Guia Digitalizadora" hidden />
                        <input type="text" name="Origen" defaultValue="academia" hidden />
                        <input type="text" name="Fecha" defaultValue={date} hidden />

                        <div className="w-full flex justify-center ">
                            <button
                                disabled={loading}
                                className="bg-academia-amarillo1 px-8 py-2 text-academia-negro font-semibold text-xl shadow-academia-boton hover:translate-x-[5px] hover:translate-y-[5px] hover:shadow-none transition-all duration-300 ease-in disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-academia-boton"
                                type="submit">
                                {loading ? "Enviando..." : "Comenzar"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}