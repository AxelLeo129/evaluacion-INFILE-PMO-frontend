/**
 * Interfaz que representa la respuesta de inicio de sesión.
 *
 * Esta interfaz define la estructura del objeto que se recibe como respuesta
 * del servidor al realizar una solicitud de inicio de sesión exitosa.
 */
export interface LoginResponse {
  token: string;
}
