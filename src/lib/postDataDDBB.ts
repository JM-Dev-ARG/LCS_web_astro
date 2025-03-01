export async function postDataDDBB(data: FormData) {
  let keyValuePairs = [];
  for (var pair of data.entries()) {
    keyValuePairs.push(pair[0] + "=" + pair[1]);
  }

  let formDataString = keyValuePairs.join("&");
  try {
    fetch(import.meta.env.DATA_BASE, {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return new Response(
      JSON.stringify({
        message: "Success",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
