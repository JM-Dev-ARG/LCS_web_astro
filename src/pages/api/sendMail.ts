import type { APIRoute } from "astro";
import formData from "form-data";
import Mailgun from "mailgun.js";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const nombre = data.get("nombre");
  const email = data.get("email");
  const tel = data.get("telefono");
  const msj = data.get("mensaje");

  // Configuración de Mailgun
  const mailgun = new Mailgun(formData);
  const client = mailgun.client({
    username: "api",
    key: import.meta.env.MAILGUN_API_KEY, // API Key desde Mailgun
  });

  try {
    // Enviar el correo
    const result = await client.messages.create(
      import.meta.env.MAILGUN_DOMAIN,
      {
        from: `Formulario de Contacto <noreply@${
          import.meta.env.MAILGUN_DOMAIN
        }>`,
        to: [import.meta.env.MAIL_TO],
        subject: "Nuevo contacto desde página web",
        text: `Los datos del formulario son:
        Nombre: ${nombre}
        Email: ${email}
        Teléfono: ${tel}
        Mensaje: ${msj}`,
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
};
