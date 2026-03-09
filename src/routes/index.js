import autoresRoutes from './autores.routes.js';
import editorasRoutes from './editoras.routes.js';

export function routes(app) {
  app.route('/').get((_req, res) => {
    res.send({ titulo: 'Curso de Testes' });
  });

  app.use(autoresRoutes);
  app.use(editorasRoutes);
}
