import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterResponse } from '../../models/auth';

/**
 * Componente para el registro de nuevos usuarios.
 *
 * Este componente maneja el formulario de registro, validaciones y la comunicación
 * con el servicio de autenticación para registrar nuevos usuarios.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public loading: boolean = false;
  public form: FormGroup;
  private pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.form = this.createFormGroup();
  }

  /**
   * Crea y configura el formulario de registro.
   *
   * @returns Un grupo de formulario con validaciones para los campos de registro.
   */
  createFormGroup(): FormGroup {
    return new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'repeatPassword': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'name': new FormControl('', [Validators.required]),
    });
  }

  /**
   * Maneja la acción de registro de un nuevo usuario.
   *
   * Realiza la solicitud al servicio de autenticación y redirige al usuario a la página de inicio de sesión
   * en caso de éxito. Muestra errores en la consola en caso de fallo.
   */
  signUp(): void {
    this.loading = true;
    const form = this.form.value;
    this.authService.register(form.email, form.name, form.password, form.repeatPassword).then((response: RegisterResponse) => {
      this.router.navigateByUrl('/login');
    }).catch((error: any) => {
      console.error(error);
    }).finally(() => {this.loading = false;});
  }

  /**
   * Getter para el campo `email` del formulario.
   */
  get email() { return this.form.get('email'); }

  /**
   * Getter para el campo `name` del formulario.
   */
  get name() { return this.form.get('name'); }

  /**
   * Getter para el campo `password` del formulario.
   */
  get password() { return this.form.get('password'); }

  /**
   * Getter para el campo `repeatPassword` del formulario.
   */
  get repeatPassword() { return this.form.get('repeatPassword'); }

}
