import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../CrearProyecto/cproyectos.css';
import URL from '../../constants/api';
import { useNavigate } from'react-router-dom';
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
function EditU() {
  const { id } = useParams();

  const [usuario, setUsuario] = useState({
    email: '',
    password: '',
    nombre: '',
    documento: '',
    ficha: '',
    rol: '',
    gestor: '',
  });
  const navigate = useNavigate();
  const [fichas, setFichas] = useState([]);
  const [roles, setRoles] = useState([]);
  const [gestores, setGestores] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`${URL.API}/api/v1/rol`),
      axios.get(`${URL.API}/api/v1/ficha`),
      axios.get(`${URL.API}/login/${id}`)
    ]).then(([rolesRes, fichasRes, userRes]) => {
      const rolesList = rolesRes.data.roles;
      const fichasList = fichasRes.data.fichas;
      const user = userRes.data.user;
      setRoles(rolesList);
      setFichas(fichasList);
      // Rol
      let rolId = '';
      if (user.rol) {
        if (typeof user.rol === 'object' && user.rol !== null && user.rol._id) {
          rolId = user.rol._id;
        } else if (typeof user.rol === 'string') {
          const foundById = rolesList.find(r => r._id === user.rol);
          if (foundById) rolId = foundById._id;
          else {
            const foundByName = rolesList.find(r => r.name.trim().toLowerCase() === user.rol.trim().toLowerCase());
            if (foundByName) rolId = foundByName._id;
            else rolId = '';
          }
        }
      }
      console.log('Usuario recibido:', user);
      console.log('Roles disponibles:', rolesList);
      console.log('Fichas disponibles:', fichasList);
      // Ficha
      let fichaId = '';
      console.log('user.ficha:', user.ficha);
      console.log('fichas:', fichasList);
      if (user.ficha) {
        if (typeof user.ficha === 'object' && user.ficha !== null && user.ficha._id) {
          fichaId = user.ficha._id;
        } else if (typeof user.ficha === 'string') {
          const foundFichaById = fichasList.find(f => f._id === user.ficha);
          if (foundFichaById) fichaId = foundFichaById._id;
          else {
            const foundFichaByName = fichasList.find(f => f.nombre.trim().toLowerCase() === user.ficha.trim().toLowerCase());
            if (foundFichaByName) fichaId = foundFichaByName._id;
            else fichaId = user.ficha;
          }
        }
      }
      // Si no se encontró el rol, usar el primer rol de la lista (opcional)
      let rolFinal = rolId;
      if (!rolFinal && rolesList.length > 0) {
        rolFinal = rolesList[0]._id;
      }
      // Si no se encontró la ficha, usar la primera ficha de la lista (opcional)
      let fichaFinal = fichaId;
      if (!fichaFinal && fichasList.length > 0) {
        fichaFinal = fichasList[0]._id;
      }
        // Asegura que nombre y documento se actualicen correctamente
        const nuevoUsuario = {
          ...user,
          nombre: user.nombre || '',
          documento: user.documento || '',
          rol: rolFinal,
          ficha: fichaFinal
        };
      console.log('Depuración: usuario.rol =', nuevoUsuario.rol, '| usuario.ficha =', nuevoUsuario.ficha);
      setUsuario(nuevoUsuario);
    });
    // Gestores
    axios.get(`${URL.API}/api/v1/gestor`)
      .then(res => setGestores(res.data.gestors));
  }, [id]);

  const handleInputChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando formulario de edición de usuario...'); // Verifica que handleSubmit se ejecuta
    // Enviar el _id del rol seleccionado
    const usuarioActualizado = {
      nombre: usuario.nombre,
      documento: usuario.documento,
      rol: usuario.rol,
      ficha: usuario.ficha,
    };
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(
        `${URL.API}/api/v1/login/${id}`,
        usuarioActualizado,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Usuario actualizado');
      navigate('/users');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert('Error: ' + err.response.data.message);
      } else {
        alert('Error al actualizar usuario');
      }
      console.log(err);
    }
  };

  return (
    <Container fluid className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className='carddddd' style={{ borderRadius: '1rem' }}>
            <Card.Body className='p-4'>
              <h2 className="fw-bold mb-2 text-uppercase text-center">Editar Usuario</h2>
              <p className="text-dark-50 mb-4 text-center">Actualice el rol del Usuario</p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        value={usuario.email}
                        onChange={handleInputChange}
                        
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        name="nombre"
                        value={usuario.nombre}
                        onChange={handleInputChange}
                        
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDocumento">
                      <Form.Label>Documento</Form.Label>
                      <Form.Control
                        name="documento"
                        value={usuario.documento}
                        onChange={handleInputChange}
                        
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="formRol">
                      <Form.Label>Rol</Form.Label>
                      <Form.Select
                        name="rol"
                        value={usuario.rol || ''}
                        onChange={handleInputChange}
                        disabled={roles.length === 0}
                      >
                        {roles.length === 0 && <option>Cargando roles...</option>}
                        {roles.length > 0 && usuario.rol === '' && <option value="">Seleccione un rol</option>}
                        {roles.map(r => (
                          <option key={r._id} value={r._id}>{r.name}</option>
                        ))}
                        {roles.length > 0 && usuario.rol && !roles.some(r => r._id === usuario.rol) && (
                          <option value={usuario.rol}>{usuario.rol} (no encontrado)</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGestor">
                      <Form.Label>Gestor</Form.Label>
                      <Form.Select
                        name="gestor"
                        value={usuario.gestor}
                        onChange={handleInputChange}
                        
                      >
                        {gestores.map(g => (
                          <option key={g._id} value={g._id}>{g.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFicha">
                      <Form.Label>Ficha</Form.Label>
                      <Form.Select
                        name="ficha"
                        value={usuario.ficha || ''}
                        onChange={handleInputChange}
                        disabled={fichas.length === 0}
                      >
                        {fichas.length === 0 && <option>Cargando fichas...</option>}
                        {fichas.length > 0 && usuario.ficha === '' && <option value="">Seleccione una ficha</option>}
                        {fichas.map(f => (
                          <option key={f._id} value={f._id}>{f.nombre}</option>
                        ))}
                        {fichas.length > 0 && usuario.ficha && !fichas.some(f => f._id === usuario.ficha) && (
                          <option value={usuario.ficha}>{usuario.ficha} (no encontrada)</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  <Button variant='primary' type='submit'>
                    Actualizar Usuario
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditU;
