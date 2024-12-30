"use client";
import React from "react";
import EyeIcon from "./EyeIcon"; 
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const columns = [
  { name: "ID", uid: "id" },
  { name: "STATUS", uid: "status" },
  { name: "AMOUNT", uid: "amount" },
  { name: "VIEW", uid: "view" }, 
];
console.log("Welcome to drops")
const DropOnlyTable = ({ payments, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white";
      case "succeeded":
        return "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white";
      case "failed":
        return "bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-black";
    }
  };
  console.log("drop payments",payments)
  const filteredPayments = payments.filter(
    (payment) =>
      payment.pickupDetails?.serviceType?.toLowerCase() === "droponly"
  );

  return (
    <div className="p-2">
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
        <Table
          aria-label="Drop Only Table"
          className="table-auto w-full text-left text-sm text-gray-600 dark:text-gray-300"
        >
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            {columns.map((col) => (
              <TableColumn
                key={col.uid}
                className="px-4 py-2 text-sm font-semibold uppercase text-gray-700 dark:text-gray-200"
              >
                {col.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="even:bg-gray-50 odd:bg-white dark:even:bg-gray-800 dark:odd:bg-gray-900"
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.uid}
                      className="px-4 py-3 text-sm font-medium dark:text-gray-300"
                    >
                      {col.uid === "status" ? (
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-md ${getStatusColor(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </span>
                      ) : col.uid === "amount" ? (
                        <span className="font-bold text-gray-800 dark:text-gray-100">{`$${payment.amount}`}</span>
                      ) : col.uid === "view" ? (
                        <EyeIcon onClick={() => onViewDetails(payment.id)} />
                      ) : (
                        payment[col.uid] || "-"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-300"
                >
                  No data available for Drop Only.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DropOnlyTable;
