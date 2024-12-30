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
  { name: "PICKUP NAME", uid: "pickupName" },
  { name: "PICKUP CONTACT", uid: "pickupContactNo" },
  { name: "PICKUP EMAIL", uid: "pickupEmail" },
  { name: "VIEW", uid: "view" }
];

const PickUpOnlyTable = ({ payments, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          backgroundImage: "linear-gradient(to right, #FBBF24, #F59E0B, #D97706)", // Yellow gradient
          color: "#FFFFFF",
        };
      case "succeeded":
        return {
          backgroundImage: "linear-gradient(to right, #34D399, #10B981, #059669)", // Green gradient
          color: "#FFFFFF",
        };
      case "failed":
        return {
          backgroundImage: "linear-gradient(to right, #F87171, #EF4444, #B91C1C)", // Red gradient
          color: "#FFFFFF",
        };
      default:
        return {
          backgroundImage: "linear-gradient(to right, #E5E7EB, #D1D5DB, #9CA3AF)", // Gray gradient
          color: "#000000",
        };
    }
  };

  const filteredPayments = payments.filter(
    (payment) => payment.pickupDetails?.serviceType?.toLowerCase() === "pickonly"
  );

  return (
    <div className="p-2">
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
      <Table aria-label="Pick Up Table" className="table-auto w-full text-left text-sm text-gray-600 dark:text-gray-300">
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
                    <TableCell key={col.uid} className="px-4 py-3 text-sm font-medium dark:text-gray-300">
                      {col.uid === "status" ? (
                        <div
                          style={{
                            ...getStatusColor(payment.status),
                            padding: "5px 10px",
                            borderRadius: "15px",
                            display: "inline-block",
                            textAlign: "center",
                          }}
                        >
                          {payment.status}
                        </div>
                      ) : col.uid === "amount" ? (
                        <div className="font-bold text-gray-800 dark:text-gray-100">{`$${payment.amount}`}</div>
                      ) : col.uid === "id" ? (
                        payment.id
                      ) : col.uid === "pickupName" ? (
                        payment.pickupDetails?.pickupName
                      ) : col.uid === "pickupContactNo" ? (
                        payment.pickupDetails?.pickupContactNo
                      ) : col.uid === "pickupEmail" ? (
                        payment.pickupDetails?.pickupEmail
                      ) : col.uid === "view" ? (
                        <EyeIcon onClick={() => onViewDetails(payment.id)} />
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300"
                >
                  No data available for Pick-Up Only.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PickUpOnlyTable;
