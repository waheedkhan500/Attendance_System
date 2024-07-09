import React from "react";

import TableItem from "./TableItem";

const DataTable = ({ list, editStudendsHandler, deleteStudendsHandler }) => {
  return (
    <div className="mt-3">
      <table className="w-full text-gray">
        <thead className="border-b border-gray">
          <tr className="text-lg font-bold">
            <td>ID</td>
            <td>Student's ID</td>
            <td>Name</td>
            <td>Course</td>
            <td>Status</td>
            <td className="flex justify-center">Actions</td>
          </tr>
        </thead>
        <tbody>
          {list.map((student) => {
            return (
              <TableItem
                key={student.id}
                {...student}
                onDelete={deleteStudendsHandler}
                onEdit={editStudendsHandler}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
