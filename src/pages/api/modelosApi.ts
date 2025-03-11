import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const marca = url.searchParams.get("marca"); // Obtiene la marca de los query params

  if (!marca) {
    return new Response(
      JSON.stringify({ error: "Falta la marca en la petición" }),
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.quotes.cebrokers.com.ar/api/models/${marca}`
    );
    if (!response.ok) throw new Error("Error al obtener los modelos");

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al obtener modelos" }), {
      status: 500,
    });
  }
};
