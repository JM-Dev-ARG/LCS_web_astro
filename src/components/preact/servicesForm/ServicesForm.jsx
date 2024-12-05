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
        const response = await fetch("/api/sendMailPatrimoniales", {
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


export default function ServicesForm() {
    return (

        <form
            onSubmit={submit}
            class="w-full h-full ">
            <div class="flex flex-col gap-1">
                <label
                    for="nombre"
                    class="font-extralight text-[clamp(18px,5vw,24px)] pl-2 text-gray-50"
                >Tu nombre
                </label>
                <input
                    required
                    class="flex-1 rounded-full px-4 py-2 campo"
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                />
            </div>
            <div class="flex flex-col gap-1 mt-3 ">
                <label
                    for="email"
                    class="font-extralight text-[clamp(18px,5vw,24px)] pl-2 text-gray-50"
                >Tu email
                </label>
                <input
                    required
                    class="flex-1 rounded-full px-4 py-2 campo"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="juanperez@tumail.com"
                />
            </div>
            <div class="flex flex-col gap-1 mt-3 ">
                <label
                    for="telefono"
                    class="font-extralight text-[clamp(18px,5vw,24px)] pl-2 text-gray-50"
                >Tu telefono
                </label>
                <input
                    required
                    class="flex-1 rounded-full px-4 py-2 campo"
                    type="number"
                    id="telefono"
                    name="telefono"
                    placeholder="(011) 12345 6789"
                />
            </div>
            <div class="flex flex-col gap-1 mt-3 ">
                <label
                    for="motivo"
                    class="font-extralight text-[clamp(18px,5vw,24px)] pl-2 text-gray-50"
                >Tu motivo
                </label>
                <select
                    required
                    class="flex-1 rounded-full px-4 py-2 campo"
                    type="select"
                    id="motivo"
                    name="motivo"

                >
                    <option disabled selected>Elige una opcion</option>
                    <option value="comercio">Integral de Comercio</option>
                    <option value="automotores">Automotores</option>
                    <option value="art">ART</option>
                    <option value="hogar">Hogar</option>
                    <option value="caucion">Caución</option>
                    <option value="consorcio">Consorocio</option>
                    <option value="accidentes">Accidentes Personales</option>
                    <option value="otros">Otros</option>
                </select>
            </div>
            <div class="flex flex-col gap-1 mt-3 ">
                <label
                    for="mensaje"
                    class="font-extralight text-[clamp(18px,5vw,24px)] pl-2 text-gray-50"
                >Tu Mensaje
                </label>
                <textarea
                    required
                    rows="5"
                    draggable="false"
                    class="flex-1 rounded-3xl px-4 py-2 campo"
                    id="mensaje"
                    name="mensaje"
                    placeholder="Dejanos tu mensaje o si elegiste otros en motivo, decinos que seguro estas buscando"
                ></textarea>
            </div>
            <div class="w-full grid place-items-center mt-4 "
                id="btn-send-form">
                <button
                    class="background w-[200px] text-[clamp(18px,3vw,30px)] rounded-full px-4 py-3"
                    type="submit"
                >Enviar</button>
            </div>
        </form>

    )
}

