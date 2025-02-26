import type { APIRoute } from "astro";
/* import formData from "form-data";
import Mailgun from "mailgun.js"; */
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  try {
    const nombre = data.get("Nombre Completo");
    const email = data.get("Email");

    let keyValuePairs = [];
    for (var pair of data.entries()) {
      keyValuePairs.push(pair[0] + "=" + pair[1]);
    }

    let formDataString = keyValuePairs.join("&");

    // Enviar datos a la base de datos
    fetch(import.meta.env.DATA_BASE, {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    //enviar email
    const mailerSend = new MailerSend({
      apiKey: import.meta.env.MAILER_API,
    });

    const sentFrom = new Sender(
      `noreply@${import.meta.env.MAILER_DOMAIN}`,
      "Descarga la guía"
    );

    const recipients = [new Recipient(`${email}`, `${nombre}`)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("Descarga la guía")
      .setHtml(
        " <h1 style='text-align: center; font-size: 2rem; margin-bottom: 1rem;' >Descarga la guía</h1> <p style='text-align: center; font-size: 1.2rem; margin-bottom: 1rem;'>Gracias por descargar la guía, puedes hacerlo a través del siguiente enlace:</p> <a style='text-align: center; font-size: 1.2rem; margin-bottom: 1rem; text-decoration: none;padding: 10px 20px; background-color: #4CAF50; color: white; border-radius: 4px;' href='https://drive.google.com/uc?export=download&id=1XOh4thN1W5vvjsolDBhU-gLcbOU5v8Ry'>descargar</a>"
      )
      .setText(
        "Greetings from the team, you got this message through MailerSend."
      );

    await mailerSend.email.send(emailParams);

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
