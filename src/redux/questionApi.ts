import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item, Trending } from "../types";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.stackexchange.com/2.3/" }),
  tagTypes: ["question"],
  endpoints: (builder) => ({
    questions: builder.query<Item[], { tagged: string; page?: number }>({
      query: ({ tagged, page = 1 }) =>
        `questions?page=${page}&pagesize=20&order=desc&sort=activity&tagged=${encodeURIComponent(
          tagged
        )}&site=stackoverflow`,
      transformResponse(response: Trending, meta, arg) {
        return response.items.map((item) => ({
          ...item,
          unique_question_id:
            item.question_id + "@" + (Math.random() + "").slice(-8),
        }));
      },
      keepUnusedDataFor: 300,
      providesTags: (result, error, { tagged }) =>
        result
          ? [
              ...result.map(({ unique_question_id }) => ({
                type: "question" as const,
                id: tagged + "-" + unique_question_id,
              })),
              "question",
            ]
          : ["question"],
    }),
  }),
});
export const { useQuestionsQuery } = questionApi;
