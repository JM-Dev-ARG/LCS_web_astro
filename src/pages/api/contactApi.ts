import type { APIRoute } from "astro";
import { enviarMailContacto } from "../../lib/enviarMailContacto";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  // Configuración de Mailgun

  try {
    // Enviar el correo
    const mailgunResponse = await enviarMailContacto(data);
    if (mailgunResponse === 200) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Datos enviados correctamente.",
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Hubo un problema con alguna de las operaciones.",
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error en servicesApi:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno del servidor.",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
