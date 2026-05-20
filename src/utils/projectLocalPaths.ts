export const PROJECT_LOCAL_PREFIXES: Record<number, { prefix: string; count: number }> = {
  1: { prefix: 'oficinas_capacitacion', count: 5 },
  2: { prefix: 'trincheras_electricas', count: 4 },
  3: { prefix: 'area_lactancia', count: 6 },
  4: { prefix: 'mantenimiento_electrico', count: 5 },
  5: { prefix: 'cocina_alacena', count: 5 },
  6: { prefix: 'enfermeria_exterior', count: 7 },
  7: { prefix: 'descarga_exterior', count: 6 },
  8: { prefix: 'cochera_celaya', count: 6 },
  9: { prefix: 'elevador_almacen', count: 7 },
  10: { prefix: 'pintura_interior', count: 9 },
  11: { prefix: 'trampa_grasas', count: 6 },
  12: { prefix: 'bodega_almacenamiento', count: 11 },
  13: { prefix: 'terraza', count: 7 },
  14: { prefix: 'monumento_institucional', count: 8 },
  15: { prefix: 'sala_orgullo_lince', count: 6 },
  16: { prefix: 'sala_titulacion', count: 6 },
  17: { prefix: 'tienda_3b', count: 6 },
  18: { prefix: 'sala_titulacion_campus2', count: 11 },
  19: { prefix: 'casa_habitacion', count: 11 },
  20: { prefix: 'rehau_celaya', count: 1 },
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