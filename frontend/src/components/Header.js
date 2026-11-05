function Header({ total }) {
  return (
    <header>
      <div>
        <p className="eyebrow">CRM · Atlas Digital</p>
        <h1>Mon CRM</h1>
      </div>
      <div className="total">
        <strong>{total}</strong>
        <span>client(s)</span>
      </div>
    </header>
  );
}

export default Header;
