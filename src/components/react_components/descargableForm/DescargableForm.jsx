import "./form.css";
import Swal from "sweetalert2";



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
        const response = await fetch("/api/sendMailServices", {
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




// Componente principal del formulario
export default function ServicesForm() {
    const date = `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`;
    return (
        <div className=" w-full flex justify-center items-center ">
            <form
                onSubmit={submit}
                className=" w-full h-full flex px-2 md:px-5 gap-2 items-center justify-center"
            >
                <div className=" w-full   flex flex-col md:flex-row justify-center items-center md:items-end  gap-4 ">
                    <div className="w-[80%]  md:w-[30%]  flex flex-col gap-1 " >
                        <label
                            htmlFor="Nombre Completo"
                            className="font-extralight text-[clamp(14px,3vw,18px)] pl-2 text-gray-50"
                        >Tu nombre
                        </label>
                        <input
                            required
                            className="flex-1 rounded-full px-4 py-2 max-h-[40px]"
                            type="text"
                            id="Nombre Completo"
                            name="Nombre Completo"
                            placeholder="Juan Perez"
                        />
                    </div>

                    <div className="w-[80%]  md:w-[30%]   flex flex-col gap-1">
                        <label
                            htmlFor="Email"
                            className="font-extralight text-[clamp(14px,3vw,18px)] pl-2 text-gray-50"
                        >Tu email
                        </label>
                        <input
                            required
                            className="flex-1 rounded-full px-4 py-2 max-h-[40px]"
                            type="email"
                            id="Email"
                            name="Email"
                            placeholder="juanperez@tumail.com"
                        />
                    </div>
                    <input type="text" name="sheetName" defaultValue="Descarga Guia" hidden />
                    <input type="text" name="Fecha" defaultValue={date} hidden />
                    <button
                        className="background grid place-items-center w-[clamp(110px,10vw,150px)]   h-[40px] text-[clamp(18px,10vw,20px)] rounded-full "
                        type="submit">
                        Enviar
                    </button>
                </div>


            </form>
        </div>
    );
}