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

    fetch(import.meta.env.DATA_BASE, {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
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

/* document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission
  document.getElementById("message").textContent = "Submitting..";
  document.getElementById("message").style.display = "block";
  document.getElementById("submit-button").disabled = true;

  // Collect the form data
  var formData = new FormData(this);
  var keyValuePairs = [];
  for (var pair of formData.entries()) {
    keyValuePairs.push(pair[0] + "=" + pair[1]);
  }

  var formDataString = keyValuePairs.join("&");

  // Send a POST request to your Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycbz_aHKLvz6LO3NT9y9HS9FuIlQ8NZadn2fHcn66HBaT7nheUKF3jJ6eaUN9piFKiD4l/exec",
    {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    }
  )
    .then(function (response) {
      // Check if the request was successful
      if (response) {
        return response; // Assuming your script returns JSON response
      } else {
        throw new Error("Failed to submit the form.");
      }
    })
    .then(function (data) {
      // Display a success message
      document.getElementById("message").textContent =
        "Data submitted successfully!";
      document.getElementById("message").style.display = "block";
      document.getElementById("message").style.backgroundColor = "green";
      document.getElementById("message").style.color = "beige";
      document.getElementById("submit-button").disabled = false;
      document.getElementById("form").reset();

      setTimeout(function () {
        document.getElementById("message").textContent = "";
        document.getElementById("message").style.display = "none";
      }, 2600);
    })
    .catch(function (error) {
      // Handle errors, you can display an error message here
      console.error(error);
      document.getElementById("message").textContent =
        "An error occurred while submitting the form.";
      document.getElementById("message").style.display = "block";
    });
});
 */
