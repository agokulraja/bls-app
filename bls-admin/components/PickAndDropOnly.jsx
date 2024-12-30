"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import EyeIcon from "./EyeIcon"; 

const columns = [
  { name: "ID", uid: "id" },
  { name: "STATUS", uid: "status" },
  { name: "AMOUNT", uid: "amount" },
  { name: "PICKUP NAME", uid: "pickupName" },
  { name: "PICKUP CONTACT", uid: "pickupContactNo" },
  { name: "PICKUP EMAIL", uid: "pickupEmail" },
  { name: "VIEW", uid: "view" }
];

const PickAndDropTable = ({ payments, onViewDetails }) => {
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

  const filteredPayments = payments.filter(
    (payment) => payment.pickupDetails?.serviceType?.toLowerCase() === "pickanddrop"
  );

  return (
    <div className="p-2">

   
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
      <Table aria-label="Pick and Drop Payments Table" className="border-collapse dark:border-gray-600 w-full">
      <TableHeader className="bg-gray-100 dark:bg-gray-800">
            {columns.map((col) => (
              <TableColumn key={col.uid} className="px-4 py-2 text-sm font-semibold uppercase text-gray-700 dark:text-gray-200">
                {col.name}
              </TableColumn>
            ))}
          </TableHeader>
        <TableBody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <TableRow key={payment.id} className="even:bg-gray-50 odd:bg-white dark:even:bg-gray-800 dark:odd:bg-gray-900">
                {columns.map((col) => (
                  <TableCell
                    key={col.uid}
                    className={`dark:text-white px-4 py-3 text-sm ${col.uid === "status" ? "text-center" : "sm:text-left"}`}
                  >
                    {col.uid === "status" && (
                      <div className={`inline-block px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </div>
                    )}
                    {col.uid === "amount" && (
                      <div className="font-bold">${payment.amount}</div>
                    )}
                    {col.uid === "id" && payment.id}
                    {col.uid === "pickupName" && payment.pickupDetails?.pickupName}
                    {col.uid === "pickupContactNo" && payment.pickupDetails?.pickupContactNo}
                    {col.uid === "pickupEmail" && payment.pickupDetails?.pickupEmail}
                    {col.uid === "view" && (
                      <div className="flex justify-center">
                        <EyeIcon onClick={() => onViewDetails(payment.id)} className="cursor-pointer" />
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center dark:text-white py-4">
                No data available for Pick and Drop.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </div>
  );
};

export default PickAndDropTable;
