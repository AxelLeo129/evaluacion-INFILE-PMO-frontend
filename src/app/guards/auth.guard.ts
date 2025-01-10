import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard de autenticación para rutas protegidas.
 *
 * Este guard verifica si el usuario está autenticado antes de permitir el acceso
 * a rutas protegidas. Si el usuario no está autenticado, lo redirige a la página
 * de inicio de sesión.
 *
 * @param {ActivatedRouteSnapshot} route - Información sobre la ruta activa que se está intentando activar.
 * @param {RouterStateSnapshot} state - Información sobre el estado del router, incluyendo la URL de destino.
 * @returns {boolean} - Retorna `true` si el usuario está autenticado y puede acceder a la ruta.
 *                      Si no está autenticado, retorna `false` y redirige al inicio de sesión.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el servicio de enrutamiento

  if (authService.isLoggedIn()) {
    return true; // Permite el acceso si el usuario está autenticado
  }

  // Redirige al inicio de sesión si no está autenticado
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
