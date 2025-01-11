import "./form.css"
import Swal from "sweetalert2";
import InputForm from "../formsComponents/InputForm";
import { useEffect, useState } from "react";


const path = window.location.pathname;
const basePath = path.split("/")[1];



// verificar viewport
const isMobile = window.matchMedia("(max-width: 430px)").matches;

function saludo() {
    isMobile
        ? Swal.fire({
            width: 300,
            title: "Gracias por contactarnos 🫶",
            text: "En breve nos estaremos comunicando con vos",
            showConfirmButton: false,
            timer: 5000,
        })
        : Swal.fire({
            title: "Gracias por contactarnos 🫶",
            text: "En breve nos estaremos comunicando con vos",
            showConfirmButton: false,
            timer: 5000,
        });
};

function saludoError() {
    isMobile ? Swal.fire({
        width: 300,
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal, intenta de nuevo por favor",
    }) :
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal, intenta de nuevo por favor",
        });
}

async function submit(e) {
    e.preventDefault();

    const form = e.target;
    /* if (!form) return; */

    const formData = new FormData(form);
    console.log("FormData:", formData);

    try {
        const response = await fetch("/api/sendMailServices", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.message) {
            saludo();
            form.reset();
            setTimeout(() => {
                window.location.href = `/${basePath}`;
            }, 5100);

        } else {
            saludoError();
        }
    } catch (error) {
        console.error("Error:", error);
        saludoError();
    }
}


export default function ServicesForm({ children, placeholderMensaje }) {
    const [sheetName, setSheetName] = useState("");

    const path = window.location.pathname;



    useEffect(() => {
        switch (path.split("/")[2]) {
            case "vacacionesForm":
                setSheetName("Vacaciones");
                break;
            case "w&hForm":
                setSheetName("WorkHoliday");
                break;
            case "enViajeForm":
                setSheetName("Pasajero en Viaje");
                break;
            case "feducativoForm":
                setSheetName("Fondo Educativo");
                break;
            case "libreForm":
                setSheetName("Ahorro Libre");
                break;
            case "proteccionForm":
                setSheetName("Proteccion");
                break;
            case "retiroForm":
                setSheetName("Retiro");
                break;
            default:
                setSheetName("Vacaciones"); // Valor por defecto
        }
    }, [path]);

    const msj = placeholderMensaje ? placeholderMensaje : "Dejanos tu mensaje o si elegiste otros en alguna opcion, comentanos esa opción";

    return (
        <div className="w-full h-full">
            <form
                onSubmit={submit}
                className="w-full h-full flex flex-col gap-4 items-center justify-center" >
                <div className="w-full xl:w-[80%] justify-between items-center flex flex-col lg:flex-row gap-4 flex-wrap">


                    <InputForm
                        name="Nombre Completo"
                        placeholder="Juan Perez"
                        type="text"
                        labelText="Nombre Completo"
                    />

                    <InputForm
                        name="Email"
                        placeholder="juanperez@tumail.com"
                        type="email"
                        labelText="Email"
                    />

                    <InputForm
                        name="Telefono"
                        placeholder="(011) 1234-5678"
                        type="tel"
                        labelText="Telefono"
                    />


                    {children}


                </div>


                <div className="w-full xl:w-[80%] flex flex-col gap-1  ">
                    <label
                        for="mensaje"
                        className="font-extralight text-[clamp(18px,5vw,24px)] pl-2 text-gray-50"
                    >Tu Mensaje
                    </label>
                    <textarea

                        rows="5"
                        draggable="false"
                        className=" rounded-3xl px-4 py-2 campo "
                        id="mensaje"
                        name="Mensaje"
                        placeholder={msj}
                    ></textarea>
                </div>
                <input type="text" name="sheetName" defaultValue={sheetName} hidden={true} />
                <div className="w-full grid place-items-center mt-4 "
                    id="btn-send-form">
                    <button
                        className="background w-[200px] text-[clamp(18px,3vw,30px)] rounded-full px-4 py-3"
                        type="submit"
                    >Enviar</button>
                </div>
            </form>
        </div>


    )
}

