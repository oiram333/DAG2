export const PROJECT_LOCAL_PREFIXES: Record<number, { prefix: string; count: number }> = {
  1: { prefix: 'oficinas_capacitacion', count: 6 },
  2: { prefix: 'trincheras_electricas', count: 3 },
  3: { prefix: 'area_lactancia', count: 5 },
  4: { prefix: 'mantenimiento_electrico', count: 4 },
  5: { prefix: 'cocina_alacena', count: 4 },
  6: { prefix: 'enfermeria_exterior', count: 6 },
  7: { prefix: 'descarga_exterior', count: 5 },
  8: { prefix: 'cochera_celaya', count: 5 },
  9: { prefix: 'elevador_almacen', count: 6 },
  10: { prefix: 'pintura_interior', count: 8 },
  11: { prefix: 'trampa_grasas', count: 5 },
  12: { prefix: 'bodega_almacenamiento', count: 9 },
  13: { prefix: 'terraza', count: 6 },
  14: { prefix: 'monumento_institucional', count: 6 },
  15: { prefix: 'sala_orgullo_lince', count: 5 },
  16: { prefix: 'sala_titulacion', count: 5 },
  17: { prefix: 'tienda_3b', count: 5 },
  18: { prefix: 'sala_titulacion_campus2', count: 9 },
  19: { prefix: 'casa_habitacion', count: 8 },
  20: { prefix: 'rehau_celaya', count: 8 },
};

export function getLocalImagePaths(projectId: number): string[] {
  const p = PROJECT_LOCAL_PREFIXES[projectId];
  if (!p || p.count === 0) return [];
  const base = __BASE_PATH__ || '/';
  return Array.from(
    { length: p.count },
    (_, i) => `${base}projects/${p.prefix}_${i + 1}.jpg`
  );
}