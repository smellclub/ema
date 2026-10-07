/**
 * Texto de botón que "rueda" al pasar el mouse: sale hacia arriba y entra una copia desde abajo.
 * El CSS está en globals.css (.roll). La copia es aria-hidden para que los lectores de pantalla no lo lean dos veces.
 */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}
