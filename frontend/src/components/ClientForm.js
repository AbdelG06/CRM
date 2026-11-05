import { useState } from "react";

const initialForm = {
  nom: "",
  email: "",
  telephone: "",
  entreprise: ""
};

function ClientForm({ onAjouter }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const reussi = await onAjouter(form);
    if (reussi) {
      setForm(initialForm);
    }
  }

  return (
    <form className="client-form" onSubmit={handleSubmit}>
      <input
        name="nom"
        placeholder="Nom complet"
        value={form.nom}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="telephone"
        placeholder="Téléphone"
        value={form.telephone}
        onChange={handleChange}
      />
      <input
        name="entreprise"
        placeholder="Entreprise"
        value={form.entreprise}
        onChange={handleChange}
      />
      <button type="submit">Ajouter le client</button>
    </form>
  );
}

export default ClientForm;
