import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';

type Model = {
  data: {
    id: number;
    title: string;
    contentPreview: string;
    author: string;
    likes: number;
    comments: number;
    likedByMe: boolean;
    createdByMe: boolean;
    headerImageUrl?: string | undefined;
  }[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  maxPageSize: number;
};

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [],
  templateUrl: './overview-page.component.html',
})
export class OverviewPageComponent {

  model = input.required<Model>();

}
