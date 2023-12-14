/**
 * Combinar paths
 *
 * @param {string} parent
 * @param {string} child
 * @returns {string}
 */
export const combinePaths = (parent, child) =>
  `${parent.replace(/\/$/, "")}/${child.replace(/^\//, "")}`;

/**
 * Construir recursivamente rutas para cada elemento de navegación
 *
 * @param routes
 * @param {string} parentPath
 * @returns {*}
 */
export const buildPaths = (routes, parentPath = "") =>
  routes.map((route) => {
    const path = combinePaths(parentPath, route.path);

    return {
      ...route,
      path,
      ...(route.routes && { routes: buildPaths(route.routes, path) }),
    };
  });

/**
 * Proporcione recursivamente referencia principal para cada elemento de navegación
 *
 * @param routes
 * @param parentRoute
 * @returns {*}
 */
export const setupParents = (routes, parentRoute = null) =>
  routes.map((route) => {
    const withParent = {
      ...route,
      ...(parentRoute && { parent: parentRoute }),
    };

    return {
      ...withParent,
      ...(withParent.routes && {
        routes: setupParents(withParent.routes, withParent),
      }),
    };
  });

/**
 * Convertir árbol de navegación en array
 *
 * @param routes
 * @returns {any[]}
 */
export const flattenRoutes = (routes) =>
  routes
    .map((route) => [route.routes ? flattenRoutes(route.routes) : [], route])
    .flat(Infinity);

/**
 * Combina todas las funciones anteriores juntas
 *
 * @param routes
 * @returns {any[]}
 */
export const generateAppRoutes = (routes) => {
  return flattenRoutes(setupParents(buildPaths(routes)));
};

/**
 * Proporciona la ruta desde la raíz hasta el elemento.
 *
 * @param route
 * @returns {any[]}
 */
export const pathTo = (route) => {
  if (!route.parent) {
    return [route];
  }

  return [...pathTo(route.parent), route];
};
