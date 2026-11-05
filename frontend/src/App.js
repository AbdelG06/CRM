import { useEffect, useState } from "react";
import Header from "./components/Header";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient
} from "./services/clientService";
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [message, setMessage] = useState("Chargement...");

  useEffect(() => {
    getClients()
      .then((data) => {
        setClients(data);
        setMessage("");
      })
      .catch((error) => setMessage(error.message));
  }, []);

  async function ajouterClient(nouveauClient) {
    try {
      const clientCree = await createClient(nouveauClient);
      setClients((clientsActuels) => [clientCree, ...clientsActuels]);
      setMessage("Client ajouté !");
      return true;
    } catch (error) {
      setMessage(error.message);
      return false;
    }
  }

  async function changerStatut(id, statut) {
    try {
      const clientModifie = await updateClient(id, { statut });
      setClients((clientsActuels) =>
        clientsActuels.map((client) =>
          client._id === id ? clientModifie : client
        )
      );
      setMessage("Statut modifié !");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function supprimerClient(id) {
    if (!window.confirm("Supprimer ce client ?")) {
      return;
    }

    try {
      await deleteClient(id);
      setClients((clientsActuels) =>
        clientsActuels.filter((client) => client._id !== id)
      );
      setMessage("Client supprimé !");
    } catch (error) {
      setMessage(error.message);
    }
  }

  const rechercheNormalisee = recherche.toLowerCase();
  const clientsFiltres = clients.filter((client) =>
    `${client.nom} ${client.email}`.toLowerCase().includes(rechercheNormalisee)
  );

  return (
    <main className="container">
      <Header total={clients.length} />
      <section className="panel">
        <h2>Ajouter un client</h2>
        <ClientForm onAjouter={ajouterClient} />
      </section>
      {message && <p className="message">{message}</p>}
      <section className="panel">
        <div className="list-heading">
          <h2>Clients</h2>
          <input
            className="recherche"
            placeholder="Rechercher par nom ou email..."
            value={recherche}
            onChange={(event) => setRecherche(event.target.value)}
          />
        </div>
        <ClientList
          clients={clientsFiltres}
          onChangerStatut={changerStatut}
          onSupprimer={supprimerClient}
        />
      </section>
    </main>
  );
}

export default App;
