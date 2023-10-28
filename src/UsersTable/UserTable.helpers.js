export const getUsersTableColumn = (handleEditUserDetails, handleDelete) => [
  { dataField: "name", text: "Name" },
  { dataField: "email", text: "Email" },
  { dataField: "role", text: "Role" },
  {
    dataField: "edit",
    text: "Edit",
    formatter: (cellContent, row) => {
      return (
        <button
          className="btn btn-primary btn-xl"
          onClick={() => handleEditUserDetails(row)}
        >
          Edit
        </button>
      );
    }
  },
  {
    dataField: "remove",
    text: "Remove",
    formatter: (cellContent, row) => {
      return (
        <button
          className="btn btn-danger btn-xl"
          onClick={() => handleDelete(row.id, row.name)}
        >
          Delete
        </button>
      );
    }
  }
];
