import "./UserProfile.css";

const UserProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="user-profile-iconss">
          <img
            src="https://via.placeholder.com/100"
            alt="Perfil"
            className="profile-icons"
          />
          <span className="user-name">Usuario</span>
          <span>
            <a href="/user/profile/edit" className="editar-perfil">
              Editar perfil
            </a>
          </span>
        </div>
        <div className="profile-nav">
          <ul>
            <li>
              <a href="/user/profile/edit">Mi cuenta</a>
            </li>
            <li>
              <a href="#">Mis compras</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Tabla Estática */}
      <div className="user-data-table">
        <h2>Mis Productos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Imagenes</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Producto 1</td>
              <td><img src="https://via.placeholder.com/50" alt="Imagen Producto 1" className="table-image" /></td>
              <td>Activo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Producto 2</td>
              <td><img src="https://via.placeholder.com/50" alt="Imagen Producto 2" className="table-image" /></td>
              <td>Inactivo</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Producto 3</td>
              <td><img src="https://via.placeholder.com/50" alt="Imagen Producto 3" className="table-image" /></td>
              <td>Activo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfilePage;
