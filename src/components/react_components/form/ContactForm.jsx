import "./form.css"
import Swal from "sweetalert2";

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
    if (!form) return;

    const formData = new FormData(form);

    try {
        const response = await fetch("/api/contactApi", {
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
    }
}


export default function ContactForm() {
    return (

        <form
            onSubmit={submit}
            className="w-[80%]">
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="nombre"
                    className="font-extralight text-[clamp(20px,5vw,30px)] pl-2 text-gray-50"
                >Tu nombre
                </label>
                <input
                    required
                    className="flex-1 rounded-full px-4 py-2 campo"
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"

                />
            </div>
            <div className="flex flex-col gap-1 mt-3 lg:mt-6">
                <label
                    htmlFor="email"
                    className="font-extralight text-[clamp(20px,5vw,30px)] pl-2 text-gray-50"
                >Tu email
                </label>
                <input
                    required
                    className="flex-1 rounded-full px-4 py-2 campo"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="juanperez@tumail.com"
                    autoComplete="on"
                />
            </div>

            <div className="flex flex-col gap-1 mt-3 lg:mt-6">
                <label
                    htmlFor="mensaje"
                    className="font-extralight text-[clamp(20px,5vw,30px)] pl-2 text-gray-50"
                >Tu Mensaje
                </label>
                <textarea
                    required
                    rows="10"
                    draggable="false"
                    className="flex-1 rounded-3xl px-4 py-2 campo"
                    id="mensaje"
                    name="mensaje"
                    placeholder="Lo que quieras consultarme o contarme"
                ></textarea>
            </div>
            <div className="w-full grid place-items-center mt-2 lg:mt-6">
                <button
                    className="background w-[200px] mt-4 text-[clamp(18px,3vw,30px)] rounded-full px-4 py-3"
                    type="submit"
                >Enviar</button>
            </div>
        </form>

    )
}

