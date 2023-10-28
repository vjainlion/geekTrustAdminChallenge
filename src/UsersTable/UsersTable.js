import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { getUsersTableColumn } from "./UserTable.helpers";

// It contains configurations related to Table
const pagination = paginationFactory({
  page: 1,
  sizePerPage: 10,
  lastPageText: ">>",
  firstPageText: "<<",
  nextPageText: ">",
  prePageText: "<",
  showTotal: true,
  alwaysShowAllBtns: true
});

const UsersTable = (props) => {
  const {
    currentUsers,
    selectUserIds,
    selectedUserIds,
    handleEditUserDetails,
    handleDelete
  } = props;

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    classes: "selection-row",
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log("row is ", row, isSelect);
      if (!isSelect) {
        selectUserIds(
          selectedUserIds.filter((selectedUserId) => selectedUserId !== row.id)
        );
      } else {
        selectUserIds([...selectedUserIds, row.id]);
      }
    },

    onSelectAll: (isSelect, rows = [], e) => {
      if (!isSelect) {
        selectUserIds([]);
      } else {
        selectUserIds([...selectedUserIds, ...rows.map((row) => row.id)]);
      }
    }
  };

  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={currentUsers}
      columns={getUsersTableColumn(handleEditUserDetails, handleDelete)}
      pagination={pagination}
      selectRow={selectRow}
    />
  );
};

export default UsersTable;
