import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const url = "https://api.quotes.cebrokers.com.ar/api/brands";
    const response = await fetch(url);
    const data = await response.json();
    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al obtener marcas" }), {
      status: 500,
    });
  }
};
