import { apiSlice } from "./apiSlice";

const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        withCredntials: true,
        credentials: "include",
        body: data,
      }),
    }),

    addNewStudent: builder.mutation({
      query: (data) => ({
        url: "/add/new",
        method: "PUT",
        body: data,
      }),
    }),

    updateStudent: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (userId) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
    }),
    checkIn: builder.mutation({
      query: (userId) => ({
        url: `/${userId}/present`,
        method: "POST",
      }),
    }),
    checkOut: builder.mutation({
      query: (userId) => ({
        url: `/${userId}/absent`,
        method: "POST",
      }),
    }),
    getAllStudents: builder.query({
      query: () => ({ url: `/`, method: "GET" }),
    }),
    getUserDetail: builder.query({
      query: (userId) => ({ url: `/${userId}` }),
      keepUnusedDataFor: 5,
    }),
    logout: builder.mutation({
      query: () => ({ url: "/logout", method: "POST" }),
    }),
    getUserStatus: builder.query({
      query: (userId) => ({ url: `${userId}/status`, method: "POST" }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAllStudentsQuery,
  useAddNewStudentMutation,
  useCheckInMutation,
  useCheckOutMutation,
  useDeleteStudentMutation,
  useLogoutMutation,
  useUpdateStudentMutation,
  useGetUserDetailQuery,
  useGetUserStatusQuery,
} = studentApiSlice;
