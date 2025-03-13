export async function postDataDDBBCB(data: FormData) {
  const formDataString: object = {
    lead: {
      firstName: data.get("Nombre"),
      lastName: data.get("Apellido"),
      email: data.get("Email"),
      age: Number(data.get("Edad")) || 0,
      Province: data.get("Provincia"),
      Locality: data.get("Localidad"),
      phoneNumber: data.get("Telefono"),
    },
    customFields: [
      {
        id: 20, // Province
        value: data.get("Provincia"),
      },
      {
        id: 21, // Locality
        value: data.get("Localidad"),
      },
      {
        id: 26, // brand
        value: data.get("Marca") || "",
      },
      {
        id: 28, // model
        value: data.get("Modelo") || "",
      },
      {
        id: 27, // year
        value: data.get("Año") || "",
      },
      {
        id: 29, // version
        value: data.get("Version") || "",
      },
      {
        id: 30, // infoAutoCode
        value: data.get("Codigo Modelo") || "",
      },
      {
        id: 22, // phoneNumber
        value: data.get("Telefono"),
      },
      {
        id: 25, // age
        value: Number(data.get("Edad")),
      },
      {
        id: 31, // UTM Source
        value: "UTM Source",
      },
      {
        id: 35, //zipcode
        value: data.get("Codigo Postal") || "",
      },
    ],
    vehicle: {
      brand: data.get("Marca") || "",
      model: data.get("Modelo") || "",
      year: data.get("Año") || "",
      version: data.get("Version") || "",
      infoAutoCode: data.get("Codigo Modelo") || "",
    },
    type: "cars",
    listId: 103,
    customer: "panambi",
  };

  try {
    fetch(import.meta.env.DATA_BASE_CB, {
      method: "POST",
      body: JSON.stringify(formDataString),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return new Response(
      JSON.stringify({
        message: "Success",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error en patrimonialesApi:", error);
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
