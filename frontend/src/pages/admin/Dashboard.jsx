import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "../../slices/studentApiSlice";

import SummeryGrid from "../../components/SummeryGrid";
import DataTable from "../../components/Table";

const Dashboard = () => {
  const navigate = useNavigate();
  const [deleteStudent] = useDeleteStudentMutation();

  const {
    data: students,
    isLoading,
    error,
    refetch,
  } = useGetAllStudentsQuery();

  const deleteStudendsHandler = async (id) => {
    if (window.confirm("Are you sure do you want to delete this Student")) {
      try {
        await deleteStudent(id);
        toast.success("Student deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };
  const editStudendsHandler = (id) => {
    navigate(`/admin/${id}/edit`);
  };

  useEffect(() => {
    refetch();
  }, [students]);

  return (
    <section className="flex flex-col gap-4 p-4">
      {students && <SummeryGrid totalStudent={students.users.length} />}
      <div className="flex gap-4 w-full">
        <div className="bg-white px-4 pt-3 pb-4 rounded-md  flex-1">
          <strong className="text-gray font-medium text-xl mb-5">
            Recently Added Students
          </strong>
          {isLoading ? (
            <h2 className="mt-4 text-center">Please wait....</h2>
          ) : error ? (
            <p>{error?.data?.message}</p>
          ) : (
            students && (
              <DataTable
                list={students.users}
                deleteStudendsHandler={deleteStudendsHandler}
                editStudendsHandler={editStudendsHandler}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
