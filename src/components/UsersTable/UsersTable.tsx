import { FC, useEffect, useState } from "react";
import { Button, Modal, Space, Table } from "antd";
import { User, userData } from "../../interfaces/User";
import ApiUserService from "../../services/ApiUserService";
import { UsersTableProps } from "./UsersTable.props";
import UserCreateForm from "../UserFroms/UserCreateForm/UserCreateForm";
import UserUpdateForm from "../UserFroms/UserUpdateForm/UserUpdateForm";

const UsersTable: FC<UsersTableProps> = ({
  isCreateModalVisible,
  onCreateModalClose,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserrId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Action",
      key: "action",
      render: (record: User) => (
        <Space>
          <Button type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await ApiUserService.getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleDelete = (userId: number) => {
    setSelectedUserId(userId);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await ApiUserService.userDelete(selectedUserrId);
      await fetchUsers();

      Modal.success({
        content: "Car deleted successfully",
        centered: true,
      });
    } catch (error) {
      Modal.error({
        content: `Failed to delete car: ${error}`,
        centered: true,
      });
    } finally {
      setLoading(false);
      setSelectedUserId(null);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalVisible(true);
  };

  const confirmEdit = async (user: User) => {
    try {
      setLoading(true);
      await ApiUserService.updateUser(user);

      await fetchUsers();
      Modal.success({
        content: "User updated successfully",
        centered: true,
      });
      setIsEditModalVisible(false);
    } catch (error) {
      Modal.error({
        content: `Failed to update user: ${error}`,
        centered: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmCreate = async (user: userData) => {
    try {
      setLoading(true);
      await ApiUserService.addUser(user);

      await fetchUsers();
      Modal.success({
        content: "User create successfully",
        centered: true,
      });
    } catch (error) {
      Modal.error({
        content: `Failed to create user: ${error}`,
        centered: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Table
        dataSource={users}
        columns={columns}
        rowKey={(record) => record.id.toString()}
        style={{ fontFamily: "Roboto", fontSize: 20 }}
      />

      <Modal
        title="Confirm Delete"
        open={!!selectedUserrId}
        onOk={confirmDelete}
        onCancel={() => setSelectedUserId(null)}
        confirmLoading={loading}
        centered
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>

      <Modal
        title="Update User"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        confirmLoading={loading}
        footer={false}
        centered
      >
        <UserUpdateForm
          user={selectedUser}
          onSave={confirmEdit}
          onCancel={() => setIsEditModalVisible(false)}
        />
      </Modal>

      <Modal
        title="Add user"
        open={isCreateModalVisible}
        onCancel={() => onCreateModalClose()}
        confirmLoading={loading}
        footer={false}
        centered
      >
        <UserCreateForm
          onSave={confirmCreate}
          onCancel={() => onCreateModalClose()}
        />
      </Modal>
    </div>
  );
};

export default UsersTable;
