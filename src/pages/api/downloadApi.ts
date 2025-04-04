import type { APIRoute } from "astro";
import postDataMailer from "../../lib/postDataMailer";
import { postDataDDBB } from "../../lib/postDataDDBB";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  try {
    const mailerResponse = await postDataMailer(data);
    const dbResponse = await postDataDDBB(data);

    if (
      (mailerResponse === 200 || mailerResponse === 201) &&
      dbResponse.status === 200
    ) {
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
          mailerResponse,
          dbResponse,
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
