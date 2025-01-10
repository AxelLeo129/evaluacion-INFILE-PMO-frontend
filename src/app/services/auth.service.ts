import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginResponse } from '../models/auth';
import { apiURL } from '../environments/environment';

/**
 * Servicio de autenticación.
 *
 * Proporciona métodos para manejar el inicio de sesión, el cierre de sesión, y la verificación del estado de autenticación.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = signal(false);

  /**
   * Constructor del servicio de autenticación.
   *
   * Inicializa el estado de autenticación basado en la existencia de un token almacenado.
   *
   * @param http Cliente HTTP para realizar solicitudes al backend.
   */
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    this.loggedIn.set(!!token);
  }

  /**
   * Inicia sesión del usuario.
   *
   * Envía las credenciales del usuario al backend y devuelve una promesa con la respuesta del servidor.
   *
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @returns Una promesa que resuelve con la respuesta de inicio de sesión.
   */
  login(email: string, password: string): Promise<LoginResponse | any> {
    return this.http.post<LoginResponse>(apiURL + '/users/login', { email, password }).toPromise();
  }

  /**
   * Verifica si el usuario está autenticado.
   *
   * Basado en la existencia de un token en el almacenamiento de sesión.
   *
   * @returns `true` si el usuario está autenticado, de lo contrario `false`.
   */
  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('authToken');
    return !!token; // Devuelve `true` si el token existe
  }

  /**
   * Devuelve la señal que representa el estado de autenticación del usuario.
   *
   * @returns La señal `loggedIn`.
   */
  isLoggedInSignal() {
    return this.loggedIn;
  }

  /**
   * Guarda el token de autenticación.
   *
   * Almacena el token en el almacenamiento de sesión y actualiza el estado de autenticación.
   *
   * @param token Token de autenticación.
   */
  saveToken(token: string): void {
    sessionStorage.setItem('authToken', token);
    this.loggedIn.set(true);
  }

  /**
   * Cierra la sesión del usuario.
   *
   * Elimina el token de autenticación del almacenamiento de sesión y actualiza el estado de autenticación.
   */
  logout(): void {
    sessionStorage.removeItem('authToken');
    this.loggedIn.set(false);
  }

}
