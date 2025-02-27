import "./form.css";
import Swal from "sweetalert2";
import InputForm from "../formsComponents/InputForm";
import { useEffect, useState } from "react";

const path = window.location.pathname;

// Verificar viewport
const isMobile = window.matchMedia("(max-width: 430px)").matches;

// Función para mostrar un mensaje de éxito
function saludo() {
    Swal.fire({
        width: isMobile ? 300 : undefined,
        title: "Gracias por contactarnos 🫶",
        text: "En breve nos estaremos comunicando con vos",
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

// Función para manejar el envío del formulario
async function submit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("/api/servicesApi", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();

        if (data.message) {
            saludo();
            form.reset();
            setTimeout(() => {
                window.location.href = `/${path.split("/")[1]}`;
            }, 5100);
        } else {
            saludoError();
        }
    } catch (error) {
        console.error("Error:", error);
        saludoError();
    }
}

// Función para obtener el nombre de la hoja basado en la ruta
function getSheetName(path) {
    const pathToSheetName = {
        "vacacionesForm": "Vacaciones",
        "w&hForm": "WorkHoliday",
        "enViajeForm": "Pasajero en Viaje",
        "feducativoForm": "Fondo Educativo",
        "libreForm": "Ahorro Libre",
        "proteccionForm": "Proteccion",
        "retiroForm": "Retiro",
        "independenciaForm": "Independencia",
        "emprendedorForm": "Emprendedor",
        "artForm": "ART",
        "asistenciaForm": "Asistencia",
        "automotoresForm": "Automotores",
        "comercioForm": "Comercio",
        "consorcioForm": "Consorcio",
        "hogarForm": "Hogar",
        "motocicletaForm": "Motocicleta",
        "movilForm": "Movil",
        "urbanoForm": "Urbano",
        "otrosForm": "Otros",
        "caucionForm": "Caucion",

    };

    const routeKey = path.split("/")[2];
    return pathToSheetName[routeKey] || "Vacaciones"; // Valor por defecto
}

function getEmail(path) {
    const pathToEmail = {
        "vacacionesForm": "viajes@lachicadelseguro.com",
        "w&hForm": "viajes@lachicadelseguro.com",
        "enViajeForm": "viajes@lachicadelseguro.com",
        "feducativoForm": "personas@lachicadelseguro.com",
        "libreForm": "personas@lachicadelseguro.com",
        "proteccionForm": "personas@lachicadelseguro.com",
        "retiroForm": "personas@lachicadelseguro.com",
        "independenciaForm": "personas@lachicadelseguro.com",
        "emprendedorForm": "personas@lachicadelseguro.com",
        "artForm": "ignacio.b@cebrokers.com.ar",
        "asistenciaForm": "micaela.d@cebrokers.com.ar",
        "automotoresForm": "micaela.d@cebrokers.com.ar",
        "comercioForm": "ignacio.b@cebrokers.com.ar",
        "consorcioForm": "ignacio.b@cebrokers.com.ar",
        "hogarForm": "micaela.d@cebrokers.com.ar",
        "motocicletaForm": "micaela.d@cebrokers.com.ar",
        "movilForm": "micaela.d@cebrokers.com.ar",
        "urbanoForm": "micaela.d@cebrokers.com.ar",
    };

    const routeKey = path.split("/")[2];
    return pathToEmail[routeKey]; // Valor por defecto
}

// Componente principal del formulario
export default function ServicesForm({ children, placeholderMensaje }) {
    const [sheetName, setSheetName] = useState("");
    const [email, setEmail] = useState("");
    const path = window.location.pathname;

    // Obtener el nombre de la hoja basado en la ruta
    useEffect(() => {
        setSheetName(getSheetName(path));
        setEmail(getEmail(path));
    }, [path]);

    // Obtener la fecha actual
    const date = `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`;

    const msj = placeholderMensaje || "Dejanos tu mensaje o si elegiste otros en alguna opción, comentanos esa opción";

    return (
        <div className="w-full h-full">
            <form
                onSubmit={submit}
                className="w-full h-full flex flex-col gap-4 items-center justify-center"
            >
                <div className="w-full xl:w-[80%] justify-between items-center flex flex-col lg:flex-row gap-4 flex-wrap">
                    <InputForm
                        name="Nombre"
                        placeholder="Juan"
                        type="text"
                        labelText="Nombre"
                    />
                    <InputForm
                        name="Apellido"
                        placeholder="Perez"
                        type="text"
                        labelText="Apellido"
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

                {/*                 <div className="w-full xl:w-[80%] flex flex-col gap-1">
                    <label
                        htmlFor="mensaje"
                        className="font-extralight text-[clamp(18px,5vw,24px)] pl-2 text-gray-50"
                    >
                        Tu Mensaje
                    </label>
                    <textarea
                        rows="5"
                        draggable="false"
                        className="rounded-3xl px-4 py-2 campo"
                        id="mensaje"
                        name="Mensaje"
                        placeholder={msj}
                    ></textarea>
                </div> */}

                <input type="text" name="sheetName" defaultValue={sheetName} hidden />
                <input type="text" name="Fecha" defaultValue={date} hidden />
                <input type="text" name="Email Destinatario" defaultValue={email} hidden />

                <div className="w-full grid place-items-center mt-4" id="btn-send-form">
                    <button
                        className="background w-[200px] text-[clamp(18px,3vw,30px)] rounded-full px-4 py-3"
                        type="submit"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
}