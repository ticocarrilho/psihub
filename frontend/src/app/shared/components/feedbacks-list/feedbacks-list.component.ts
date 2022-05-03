import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeedbacksService } from '../../services/feedbacks.service';

@Component({
  selector: 'app-feedbacks-list',
  templateUrl: './feedbacks-list.component.html',
  styleUrls: ['./feedbacks-list.component.scss']
})
export class FeedbacksListComponent implements OnInit {

  loading = false;
  currentPage = 1;
  totalPages = 0;
  throttle = 0;
  distance = 2;
  feedbacks: any[] = [];
  
  constructor(private feedbacksService: FeedbacksService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.feedbacks = [];
    this.loading = true;
    this.feedbacksService.getFeedbacks(this.currentPage)
      .subscribe({
        next: (data) => {
          this.totalPages = Math.ceil(data.count/10)
          this.feedbacks = data.rows;
        },
        error: (err) => {
          this.toastr.error('Não foi carregar os feedbacks.')
        }
      }).add(() => this.loading = false);
  }

  onScroll() {
    this.currentPage++;
    this.feedbacksService.getFeedbacks(this.currentPage)
    .subscribe({
      next: (data: any) => {
        this.feedbacks.push(...data.rows);
      },
      error: () => {
        this.toastr.error('Não foi possível carregar os feedbacks.')
      }
    });
  }

}
