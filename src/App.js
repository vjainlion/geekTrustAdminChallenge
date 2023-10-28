// App.js
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import axios from "axios";

import EditUserDetails from "./EditUserDetails";
import SearchBar from "./SearchBar";
import UsersTable from "./UsersTable";

function App() {
  const [products, setArray] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [rowInfoToEdit, setRowInfoToEdit] = useState({});
  const [shouldShowEditUserModal, toggleModalVisibility] = useState(false);
  const [searchedText, onSearchTextChange] = useState("");
  const [selectedUserIds, selectUserIds] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      baseURL:
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    }).then((res) => {
      const userData = res.data;
      setArray(userData);
      setSearchedProducts(userData);
    });
  }, []);

  const handleDelete = (rowId, name) => {
    const filteredData = searchedProducts.filter(
      (product) => product.id !== rowId
    );
    setSearchedProducts(filteredData);
  };

  const handleDeleteSelected = () => {
    const selectedUsersSet = new Set(selectedUserIds);
    const filteredData = searchedProducts.filter(
      (product) => !selectedUsersSet.has(product.id)
    );
    setSearchedProducts(filteredData);
  };

  const handleEditUserDetails = (rowInfo) => {
    console.log("rowInfo is", rowInfo);
    setRowInfoToEdit(rowInfo);
    toggleModalVisibility(true);
  };

  const onModalSubmit = (newCustomerDetails) => {
    const { id } = newCustomerDetails;
    const newProducts = searchedProducts.map((product) => {
      if (product.id === id) {
        return { ...product, ...newCustomerDetails };
      }
      return product;
    });
    setSearchedProducts(newProducts);
  };

  const handleSearch = (value) => {
    const valueToSearch = value ?? searchedText;
    const filteredData = products.filter(
      (item) =>
        item.name.toLowerCase().includes(valueToSearch.toLowerCase()) ||
        item.role.toLowerCase().includes(valueToSearch.toLowerCase()) ||
        item.email.toLowerCase().includes(valueToSearch.toLowerCase())
    );
    setSearchedProducts(filteredData);
  };

  return (
    <div className="App">
      <h5>Admin UI Challenge</h5>
      <SearchBar
        onSearchTextChange={onSearchTextChange}
        handleSearch={handleSearch}
      />
      <UsersTable
        currentUsers={searchedProducts}
        selectUserIds={selectUserIds}
        selectedUserIds={selectedUserIds}
        handleEditUserDetails={handleEditUserDetails}
        handleDelete={handleDelete}
      />
      <button
        className="btn btn-danger btn-xl"
        onClick={() => handleDeleteSelected()}
      >
        Delete Selected
      </button>
      {/* EditUserDetails is a Modal to edit user details */}
      <EditUserDetails
        shouldShowEditUserModal={shouldShowEditUserModal}
        toggleModalVisiblity={toggleModalVisibility}
        customerDetails={rowInfoToEdit}
        onModalSubmit={onModalSubmit}
      />
    </div>
  );
}

export default App;
