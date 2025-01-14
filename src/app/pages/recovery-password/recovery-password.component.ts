import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterResponse } from '../../models/auth';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.css'
})
export class RecoveryPasswordComponent {

  public loading: boolean = false;
  public form: FormGroup;
  private pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
   * Constructor del componente.
   *
   * @param authService Servicio de autenticación para manejar las solicitudes de inicio de sesión.
   * @param route Servicio para manejar rutas activas y obtener parámetros.
   * @param router Servicio para la navegación entre rutas.
   */
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.form = this.createFormGroup();
  }

  /**
   * Crea un grupo de formulario para el inicio de sesión.
   *
   * Define los campos `email` y `password` con sus respectivas validaciones.
   *
   * @returns Un objeto `FormGroup` configurado.
   */
  createFormGroup(): FormGroup {
    return new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(this.pattern)])
    });
  }

  /**
   * Maneja el proceso de inicio de sesión.
   *
   * Este método:
   * - Muestra un indicador de carga.
   * - Envía las credenciales a través del servicio de autenticación.
   * - Navega a la URL de retorno si el inicio de sesión es exitoso.
   * - Maneja errores en caso de fallo.
   */
  submit(): void {
    this.loading = true;
    const form = this.form.value;
    this.authService.recoveryPassword(form.email).then((response: RegisterResponse) => {
      this.router.navigateByUrl("/login");
    }).catch((error) => {
      console.error(error);
    }).finally(() => {this.loading = false;});
  }

  /**
   * Obtiene el control del formulario para el campo de correo electrónico.
   *
   * @returns El control del formulario asociado al campo `email`.
   */
  get email() { return this.form.get('email'); }

}
