import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../services/comments/comments.service';
import { CommonModule } from '@angular/common';
import { CommentCreateComponent } from './comment-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CommentCreateComponent],
  exports: [CommentCreateComponent],
  providers: [CommentsService]
})
export class CommentCreateModule { }
