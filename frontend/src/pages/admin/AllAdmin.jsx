import React from "react";
import DataTable from "../../components/Table";

const AllAdmin = () => {
  return (
    <section className="m-6 p-2 bg-white">
      <h2 className="text-gray font-bold text-xl mb-5">All Students</h2>
      <DataTable />
    </section>
  );
};

export default AllAdmin;
