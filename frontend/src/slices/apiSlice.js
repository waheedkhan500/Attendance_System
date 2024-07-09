import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1/student",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery: baseQuery,

  tagTypes: ["Student"],
  endpoints: (builder) => ({}),
});
