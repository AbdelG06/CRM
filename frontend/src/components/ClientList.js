function ClientList({ clients, onChangerStatut, onSupprimer }) {
  if (clients.length === 0) {
    return <p className="empty">Aucun client à afficher.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th>Statut</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td className="name-cell">{client.nom}</td>
              <td>{client.email}</td>
              <td>{client.entreprise || "—"}</td>
              <td>
                <select
                  value={client.statut}
                  onChange={(event) =>
                    onChangerStatut(client._id, event.target.value)
                  }
                >
                  <option value="prospect">Prospect</option>
                  <option value="client">Client</option>
                  <option value="inactif">Inactif</option>
                </select>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => onSupprimer(client._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;
