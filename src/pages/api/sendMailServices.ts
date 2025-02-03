import type { APIRoute } from "astro";
import formData from "form-data";
import Mailgun from "mailgun.js";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  /* const nombre = data.get("nombre");
  const email = data.get("email");
  const tel = data.get("telefono");
  const asunto = data.get("motivo");
  const msj = data.get("mensaje"); */

  // Configuración de Mailgun
  /*   const mailgun = new Mailgun(formData);
  const client = mailgun.client({
    username: "api",
    key: import.meta.env.MAILGUN_API_KEY, // API Key desde Mailgun
  });
 */
  try {
    let keyValuePairs = [];
    for (var pair of data.entries()) {
      keyValuePairs.push(pair[0] + "=" + pair[1]);
    }

    let formDataString = keyValuePairs.join("&");
    console.log(formDataString);

    fetch(import.meta.env.DATA_BASE, {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Enviar el correo
    /* const result = await client.messages.create(
      import.meta.env.MAILGUN_DOMAIN,
      {
        from: `Formulario de Patrimoniales <noreply@${
          import.meta.env.MAILGUN_DOMAIN
        }>`,
        to: [import.meta.env.MAIL_TO],
        subject: "Nueva solicitud de cotizacion patrimoniales desde página web",
        text: `Los datos del formulario son:
        Nombre: ${nombre}
        Email: ${email}
        Teléfono: ${tel}
        Asunto: ${asunto}
        Mensaje: ${msj}`,
      }
    );

    console.log("Email enviado:", result.id); */

    return new Response(
      JSON.stringify({
        message: "Email enviado exitosamente.",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error al enviar el email:", error.message);
    return new Response(
      JSON.stringify({
        message: error.message || "Hubo un error al enviar el email.",
      }),
      { status: 500 }
    );
  }
};

//probar este codigo para envio de mails y para guardar datos en una base de datos

/* import type { APIRoute } from "astro";
import formData from "form-data";
import Mailgun from "mailgun.js";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const emailTo = data.get("Email Destinatario");

  // Convertir FormData a un objeto
  const formDataObject: { [key: string]: string } = {};
  for (const [key, value] of data.entries()) {
    formDataObject[key] = value.toString();
  }

  // Configuración de Mailgun
  const mailgun = new Mailgun(formData);
  const client = mailgun.client({
    username: "api",
    key: import.meta.env.MAILGUN_API_KEY, // API Key desde Mailgun
  });

  try {
    // Enviar datos a la base de datos (Google Sheets, etc.)
    const formDataString = new URLSearchParams(formDataObject).toString();

    await fetch(import.meta.env.DATA_BASE, {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Enviar el correo con los datos dinámicos
    const emailText = Object.entries(formDataObject)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const result = await client.messages.create(
      import.meta.env.MAILGUN_DOMAIN,
      {
        from: `Formulario de Patrimoniales <noreply@${
          import.meta.env.MAILGUN_DOMAIN
        }>`,
        to: emailTo,
        subject: "Nueva solicitud de cotización patrimoniales desde página web",
        text: `Los datos del formulario son:\n${emailText}`,
      }
    );

    console.log("Email enviado:", result.id);

    return new Response(
      JSON.stringify({
        message: "Email enviado exitosamente.",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error al enviar el email:", error.message);
    return new Response(
      JSON.stringify({
        message: error.message || "Hubo un error al enviar el email.",
      }),
      { status: 500 }
    );
  }
}; */
