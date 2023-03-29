import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tag, TagType } from "../types";

// https://api.stackexchange.com/2.3/tags?page=1&pagesize=10&order=desc&sort=popular&inname=ajax&site=stackoverflow

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.stackexchange.com/2.3/" }),
  tagTypes: ["tag"],
  endpoints: (builder) => ({
    tags: builder.query<Tag[], { inname: string }>({
      query: ({ inname }) =>
        `tags?page=1&pagesize=10&order=desc&sort=popular&inname=${encodeURIComponent(
          inname
        )}&site=stackoverflow`,
      transformResponse(response: TagType, meta, arg) {
        return response.items;
      },
      keepUnusedDataFor: 300,
      providesTags: (result, error, { inname }) =>
        result
          ? [
              ...result.map(({ name }) => ({
                type: "tag" as const,
                id: inname + "-" + name,
              })),
              "tag",
            ]
          : ["tag"],
    }),
  }),
});
export const { useTagsQuery } = tagApi;
