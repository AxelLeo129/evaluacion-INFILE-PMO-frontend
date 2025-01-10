import { Component, signal } from '@angular/core';
import { AuthService } from './services/auth.service';

/**
 * Componente principal de la aplicación.
 *
 * Este componente sirve como el punto de entrada principal de la aplicación Angular.
 * Gestiona el estado de autenticación del usuario mediante el servicio `AuthService`.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isLoggedIn$ = this.authService.isLoggedIn;

  /**
   * Constructor del componente `AppComponent`.
   *
   * @param {AuthService} authService - Servicio de autenticación utilizado para
   * gestionar el estado de inicio de sesión del usuario.
   */
  constructor(private authService: AuthService) {}

}
