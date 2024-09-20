import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { z } from 'zod';
import { Observable, lastValueFrom, map } from 'rxjs';

const BlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  contentPreview: z.string(),
  author: z.string(),
  likes: z.number(),
  comments: z.number(),
  likedByMe: z.boolean(),
  createdByMe: z.boolean(),
  headerImageUrl: z.string().optional(),
});

const BlogArraySchema = z.array(BlogSchema);

const EntriesSchema = z.object({
  data: BlogArraySchema,
  pageIndex: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  maxPageSize: z.number(),
});

export type Blog = z.infer<typeof BlogSchema>;

export type Entries = z.infer<typeof EntriesSchema>;

const CreatedBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreatedBlog = z.infer<typeof CreatedBlogSchema>;

const QueryParamsSchema = z.union([
  z.object({
    pageIndex: z.string(),
    pageSize: z.string(),
    searchstring: z.string().optional(),
  }),
  z.object({ searchstring: z.string() }),
  z.object({}),
]);

type QueryParams = z.infer<typeof QueryParamsSchema>;

@Injectable({
  providedIn: 'root',
})
export class BlogBackendService {
  private httpClient = inject(HttpClient);

  getBlogPosts(queryParams?: QueryParams): Observable<Entries> {
    const parsedQueryParams = QueryParamsSchema.parse(queryParams);
    const httpParams = Object.keys(parsedQueryParams).reduce(
      (params, key) =>
        params.set(key, parsedQueryParams[key as keyof QueryParams]),
      new HttpParams(),
    );

    return this.httpClient
      .get<Entries>(`${environment.serviceUrl}/entries`, { params: httpParams })
      .pipe(map((entries) => EntriesSchema.parse(entries)));
  }

  addBlog(blog: CreatedBlog) {
    CreatedBlogSchema.parse(blog);
    return lastValueFrom(
      this.httpClient.post(`${environment.serviceUrl}/entries`, blog),
    );
  }

  likeBlog(id: number, likedByMe: boolean) {
    return this.httpClient.put(
      `${environment.serviceUrl}/entries/${id}/like-info`,
      {
        likedByMe: !likedByMe,
      },
    );
  }
}
