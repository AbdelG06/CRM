const API_URL = process.env.REACT_APP_API_URL;

async function readResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Une erreur est survenue");
  }
  return data;
}

export async function getClients() {
  return readResponse(await fetch(API_URL));
}

export async function createClient(client) {
  return readResponse(
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client)
    })
  );
}

export async function updateClient(id, modifications) {
  return readResponse(
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifications)
    })
  );
}

export async function deleteClient(id) {
  return readResponse(await fetch(`${API_URL}/${id}`, { method: "DELETE" }));
}
