import formData from "form-data";
import Mailgun from "mailgun.js";

export async function enviarMail(data: FormData) {
  const origin = data.get("Origen");
  console.log(origin);

  function getEmailTo(origin: FormDataEntryValue) {
    switch (origin) {
      case "personas":
        return `${import.meta.env.MAIL_PERSONAS_TO}`;
      case "viajes":
        return `${import.meta.env.MAIL_VIAJES_TO}`;
      case "patrimoniales":
        return `${import.meta.env.MAIL_PATRIMONIO_TO}`;
      case "siniestros":
        return `${import.meta.env.MAIL_SINIESTROS_TO}`;
      default:
        return `${import.meta.env.MAIL_DEFAULT_TO}`;
    }
  }

  // Convertir FormData a un objeto
  const formDataObject: { [key: string]: string } = {};
  for (const [key, value] of data.entries()) {
    formDataObject[key] = value.toString();
  }

  const emailTo = getEmailTo(origin);

  // Configuración de Mailgun
  const mailgun = new Mailgun(formData);
  const client = mailgun.client({
    username: "api",
    key: import.meta.env.MAILGUN_API_KEY, // API Key desde Mailgun
  });

  try {
    const emailText = Object.entries(formDataObject)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const result = await client.messages.create(
      import.meta.env.MAILGUN_DOMAIN,
      {
        from: `Formulario de ${origin} <noreply@${
          import.meta.env.MAILGUN_DOMAIN
        }>`,
        to: emailTo,
        subject: `Nueva solicitud de cotización ${origin} desde página web`,
        text: `Los datos del formulario son:\n${emailText}`,
      }
    );

    return result.status;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
}
