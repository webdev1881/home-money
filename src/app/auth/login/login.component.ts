import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Message } from 'src/app/shared/models/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';



@Component({
  selector: 'hmy-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;




  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
     ) { }

  ngOnInit() {
      this.message = new Message('danger', '');

      this.route.queryParams.subscribe( (params) => {
        if ( params.nowCanLogin ) {
            this.showMessage( 'Теперь Вы можете зайти', 'success' );
        }
      } );

      this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(1)])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
  }

  clearMessage() {
    this.message.text  = '';
  }

  onSubmit() {
    const dataForm = this.form.value;
    this.usersService.getUserByEmail(dataForm.email).subscribe( (user: User ) => {
      user = user[0]; // без map в usersService
      if (user) {
        if ( user.password === dataForm.password ) {
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(user ));
          this.authService.login();
          this.router.navigate(['/system', 'bill']);
        } else {
          this.showMessage('Пароль не верный');
        }
      } else {
        this.showMessage('Такого пользователя не существует');
      }
    } );

  }

}
