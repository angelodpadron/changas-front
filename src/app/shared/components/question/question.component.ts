import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { QuestionOverview } from 'src/app/core/models/question/question-overview';
import { QuestionService } from 'src/app/core/services/questions/question.service';
import { BaseComponent } from 'src/app/pages/base-component';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Customer } from 'src/app/core/models/customer/customer.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent extends BaseComponent implements OnInit {
  @Input() changa_id!: string;

  form!: FormGroup;
  questionOverview! : QuestionOverview;
  currentCustomer!: Customer;
  queries: QuestionOverview[] = [];
  subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private authService: AuthService,
    private router:Router
  ) { super()}

  ngOnInit() {
    this.getUserAuthenticated();
    console.log(this.currentCustomer.name);
    this.initializeForm();
    this.loadQueries();
  }

  private loadQueries() {
    this.subscription = this.questionService.getAllQueries().subscribe({
      next: (response: ApiResponse<QuestionOverview[]>) => {
        if (response.success) {
          this.queries = response.data;
          //this.loaded = true;
          console.log(response.data)
        } else {
          console.error(response.error?.message);
        }
      },
      error: (e) => console.error('Error requesting data: ', e),
    });
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      message:''
    })

  }
  private getUserAuthenticated() {
    this.authService.getUserAuthenticated().subscribe({
      next: (user) => {
        if (user) {
          this.currentCustomer = user;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  sendQuery(){
    if (!this.form.valid) {
      console.error('Query form is invalid');
      return;
    }

    this.questionOverview = this.form.value["message"];
    
    this.questionService.sendQuery(this.questionOverview, this.changa_id).subscribe({
      next: (response: ApiResponse<QuestionOverview>) => {
        console.log('Query creada', response);
        
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.presentErrorToastFromResponse(error);
        console.error('Error sending question', error);
      },
    })
  }
}
