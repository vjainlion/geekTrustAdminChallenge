import React from "react";
import Modal from "react-modal";

const EditUserDetails = ({
  shouldShowEditUserModal,
  toggleModalVisiblity,
  customerDetails,
  onModalSubmit
}) => {
  function closeModal() {
    toggleModalVisiblity(false);
  }

  const onSubmit = () => {
    const newName = document.getElementById("name").value;
    const newEmail = document.getElementById("email").value;
    const newRole = document.getElementById("role").value;
    onModalSubmit({
      id: customerDetails.id,
      name: newName,
      email: newEmail,
      role: newRole
    });
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={shouldShowEditUserModal}
        onRequestClose={closeModal}
        contentLabel="Edit user details"
      >
        <p class="h3 text-center">{`Edit details for Customer ID:  ${customerDetails.id}`}</p>
        <div class="container mt-5">
          <div class="row">
            <div class="col-md-6 offset-md-3">
              <form>
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter your new name"
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email:</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter your new email"
                  />
                </div>
                <div class="form-group">
                  <label for="role">Role:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="role"
                    placeholder="Enter your new role"
                  />
                </div>
              </form>
              <button class="btn btn-primary mx-2" onClick={onSubmit}>
                Submit
              </button>
              <button class="btn btn-primary" onClick={closeModal}>
                close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditUserDetails;
