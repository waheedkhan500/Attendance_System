import React from "react";

import { FaTrashAlt, FaEdit } from "react-icons/fa";

const TableItem = ({
  id,
  studentId,
  name,
  cousre,
  status,
  onDelete,
  onEdit,
}) => {
  return (
    <tr className="font-normal text-lg border-b border-gray uppercase">
      <td>{id}</td>
      <td>{studentId}</td>
      <td className="text-Teals font-normal text-lg">{name}</td>
      <td>{cousre}</td>
      <td>{status}</td>
      <td className="flex gap-4 justify-center items-center pt-2">
        <FaEdit
          className="text-green-600 cursor-pointer"
          onClick={() => {
            onEdit(id);
          }}
        />

        <FaTrashAlt
          className="text-red-700 cursor-pointer"
          onClick={() => onDelete(id)}
        />
      </td>
    </tr>
  );
};

export default TableItem;
