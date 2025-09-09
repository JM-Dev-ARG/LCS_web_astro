import "./form.css";
import Swal from "sweetalert2";
import InputForm from "../formsComponents/InputForm";
import { useEffect, useState } from "react";
import SelectMarcaForm from "../formsComponents/SelectMarcaForm";
import SelectModelosForm from "../formsComponents/SelectModelosForm";
import SelectVersionForm from "../formsComponents/SelectVersionForm";
import SelectYearsForm from "../formsComponents/SelectYearsForm";

const isMobile = window.matchMedia("(max-width: 430px)").matches;

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

export default function ServicesForm({
  children = null,
  urlFetchPatrimonieales,
  urlFetchDefault,
}) {
  const [sheetName, setSheetName] = useState("");
  const [origin, setOrigin] = useState("");
  const path = window.location.pathname;
  const [checkedStates, setCheckedStates] = useState(false);

  const toggleCheckbox = (event) => {
    setCheckedStates(event.target.checked);
  };

  function getOrigin(path) {
    return path.split("/")[1];
  }

  // Función para manejar el envío del formulario
  async function submit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      const urlBase = getOrigin(path);
      const fetchURL =
        urlBase === "patrimoniales" ? urlFetchPatrimonieales : urlFetchDefault;
      const response = await fetch(fetchURL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success === true) {
        saludo();
        form.reset();
        setTimeout(() => {
          urlBase === "siniestros" ? window.location.href = "/" : window.location.href = `/${path.split("/")[1]}`;
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
      vacacionesForm: "Vacaciones",
      whForm: "WorkHoliday",
      enViajeForm: "Pasajero en Viaje",
      ceseForm: "Fondo de Cese",
      feducativoForm: "Fondo Educativo",
      libreForm: "Ahorro Libre",
      proteccionForm: "Proteccion",
      retiroForm: "Retiro",
      independenciaForm: "Independencia",
      emprendedorForm: "Emprendedor",
      artForm: "ART",
      asistenciaForm: "Asistencia",
      automotoresForm: "Automotores",
      comercioForm: "Comercio",
      consorcioForm: "Consorcio",
      hogarForm: "Hogar",
      motocicletaForm: "Motocicleta",
      movilForm: "Movil",
      urbanoForm: "Urbano",
      otrosForm: "Otros",
      caucionForm: "Caucion",
      sepelioForm: "Sepelio",
      siniestrosForm: "Siniestros",
    };

    const routeKey = path.split("/")[2];
    return pathToSheetName[routeKey];
  }

  // Obtener el nombre de la hoja basado en la ruta
  useEffect(() => {
    setSheetName(getSheetName(path));
    setOrigin(getOrigin(path));
  }, [path]);


  // Obtener la fecha actual
  const date = `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1
    }/${new Date().getUTCFullYear()}`;

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

          {origin === "patrimoniales" ? (
            <InputForm
              name="Provincia"
              placeholder="Buenos Aires"
              type="text"
              labelText="Provincia"
            />
          ) : (
            ""
          )}
          {origin === "patrimoniales" ? (
            <InputForm
              name="Localidad"
              placeholder="La Plata"
              type="text"
              labelText="Localidad"
            />
          ) : (
            ""
          )}

          {children ? children : ""}

          {/* {sheetName === "Automotores" || sheetName === "Motocicleta" ? (
            <SelectMarcaForm
              selectMarca={selectMarca}
              setSelectMarca={setSelectMarca}
            />
          ) : (
            ""
          )}
          {sheetName === "Automotores" || sheetName === "Motocicleta" ? (
            <SelectModelosForm
              selectModelo={selectModelo}
              setSelectModelo={setSelectModelo}
              marca={selectMarca}
              setModelosServices={setModelosServices}
            />
          ) : (
            ""
          )}
          {sheetName === "Automotores" || sheetName === "Motocicleta" ? (
            <SelectVersionForm
              selectVersion={selectVersion}
              setSelectVersion={setSelectVersion}
              version={modeloVersion}
            />
          ) : (
            ""
          )}

          {sheetName === "Automotores" || sheetName === "Motocicleta" ? (
            <SelectYearsForm
              selectYear={selectYear}
              setSelectYear={setSelectYear}
              years={years}
            />
          ) : (
            ""
          )}

          {sheetName === "Automotores" || sheetName === "Motocicleta" ? (
            <input
              type="text"
              name="Codigo Modelo"
              defaultValue={modelCode}
              hidden
            />
          ) : (
            ""
          )} */}
        </div>

        <input type="text" name="Origen" defaultValue={origin} hidden />
        <input type="text" name="sheetName" defaultValue={sheetName} hidden />
        <input type="text" name="Fecha" defaultValue={date} hidden />

        <div className="w-full flex justify-center items-center mt-5">
          <div className="group w-[20px]  flex justify-center gap-1 items-center text-[#e69c99]">
            <label
              className="container__checkbox"
              htmlFor="Terminos y Condiciones"
            >
              <input
                type="checkbox"
                name="Terminos y Condiciones"
                checked={checkedStates}
                onChange={toggleCheckbox}
              />
              <div className="checkmark"></div>
              <svg
                width="30"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
                className="celebrate"
              >
                <polygon points="0,0 10,10"></polygon>
                <polygon points="0,25 10,25"></polygon>
                <polygon points="0,50 10,40"></polygon>
                <polygon points="50,0 40,10"></polygon>
                <polygon points="50,25 40,25"></polygon>
                <polygon points="50,50 40,40"></polygon>
              </svg>
            </label>
            <p
              className={`font-extralight text-nowrap text-[clamp(10px,3vw,15px)] pl-2 ${checkedStates ? "text-[#e69c99]" : "text-gray-50"
                }`}
            >
              {" "}
              Acepto los{" "}
              <a
                href="/terms/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium"
              >
                terminos y condiciones
              </a>
            </p>
          </div>
        </div>

        <div className="w-full grid place-items-center mt-4" id="btn-send-form">
          <button
            disabled={!checkedStates}
            className={`background w-[200px] text-[clamp(18px,3vw,30px)] rounded-full px-4 py-3 ${!checkedStates ? "opacity-50 cursor-not-allowed" : ""
              }`}
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
