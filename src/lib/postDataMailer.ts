import MailerLite from "@mailerlite/mailerlite-nodejs";

export default async function postDataMailer(data: FormData) {
  function getGroupId(data: string) {
    switch (data) {
      case "patrimoniales":
        return `${import.meta.env.MAILER_PATRIMONIALES_GROUP_ID}`;
      case "personas":
        return `${import.meta.env.MAILER_PERSONAS_GROUP_ID}`;
      case "viajes":
        return `${import.meta.env.MAILER_VIAJES_GROUP_ID}`;
      default:
        return `${import.meta.env.MAILER_APRENDE_GROUP_ID}`;
    }
  }
  const formatDate = (date: Date) => {
    const pad = (num: number) => num.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Meses van de 0-11
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const mailerlite = new MailerLite({
    api_key: import.meta.env.MAILER_LITE_API_TOKEN,
  });
  const origen = String(data.get("Origen"));
  const email = String(data.get("Email"));
  const nombre = String(data.get("Nombre"));
  const apellido = String(data.get("Apellido"));
  const telefono = String(data.get("Telefono"));
  const grupo = String(getGroupId(origen));

  const params = {
    email: email,
    fields: {
      name: nombre,
      last_name: apellido,
      phone: telefono,
    },
    groups: [grupo],
    subscribed_at: `${formatDate(new Date())}`,
    ip_address: null,
    opted_in_at: null, // yyyy-MM-dd HH:mm:ss
    optin_ip: null,
    unsubscribed_at: null, // yyyy-MM-dd HH:mm:ss
  };

  const result = await mailerlite.subscribers
    .createOrUpdate(params)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      if (error.response) return error.response.data;
    });

  return result;
}
