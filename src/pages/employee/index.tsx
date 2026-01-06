import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Avatar,
  Space,
  App,
  Empty,
  Card,
  Select,
  Switch,
  Statistic,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PrinterOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  toggleEmployeeStatus,
  updateEmployee,
} from "../../services/employeeService";
import EmployeeForm from "./EmployeeForm";
import { Employee, GenderFilter, StatusFilter } from "../../types/employee";
import dayjs from "dayjs";

const { Search } = Input;

const EmployeeManagement: React.FC = () => {
  const { modal, message } = App.useApp();

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchText, setSearchText] = useState("");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [editState, setEditState] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });

  // Fetch employee list Query
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["employeeList"],
    queryFn: () => getEmployees(),
  });

  // Fetch single employee details Query
  const { data: employeeData, isFetching: employeeLoading } = useQuery({
    queryKey: ["employeeDetails", editState.id],
    queryFn: () => getEmployee(editState.id!),
    enabled: !!editState.id,
  });

  // Update employee Mutation
  const updateEmployeeMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Employee> }) =>
      updateEmployee(id, data),
    onSuccess: () => {
      message.success("Employee updated successfully");
      handleCloseForm();
      refetch();
    },
    onError: () => message.error("Failed to update employee"),
  });

  // Create new employee Mutation
  const createEmployeeMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      message.success("Employee created successfully");
      handleCloseForm();
      refetch();
    },
    onError: () => message.error("Failed to create employee"),
  });

  // Delete employee Mutation
  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      message.success("Employee deleted successfully");
      refetch();
    },
    onError: () => message.error("Failed to delete employee"),
  });

  // Toggle status Mutation
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      toggleEmployeeStatus(id, isActive),
    onSuccess: () => {
      message.success("Status updated successfully");
      refetch();
    },
    onError: () => message.error("Failed to update status"),
  });

  // Open edit form
  const handleEdit = (record: Employee) => {
    setEditState({ open: true, id: record.id });
  };

  // Confirm and delete employee
  const handleDelete = (record: Employee) => {
    modal.confirm({
      title: "Are you sure you want to delete this employee?",
      content: `${record.fullName}`,
      okText: "Delete",
      cancelText: "Cancel",
      okType: "danger",
      centered: true,
      onOk: () =>
        new Promise((resolve) => {
          deleteEmployeeMutation.mutate(record.id, {
            onSettled: () => resolve(true),
          });
        }),
    });
  };

  // Handle create/update form submission
  const handleSubmit = (values: any) => {
    if (editState.id) {
      updateEmployeeMutation.mutate({ id: editState.id, data: values });
    } else {
      createEmployeeMutation.mutate(values);
    }
  };

  // Close modal form
  const handleCloseForm = () => setEditState({ open: false, id: null });

  // Handle status toggle
  const handleStatusToggle = (checked: boolean, record: Employee) => {
    toggleStatusMutation.mutate({ id: record.id, isActive: checked });
  };

  // Print employee list
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const employees = filteredEmployees.length > 0 ? filteredEmployees : (data?.data || []);
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee List</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            img { width: 50px; height: 50px; object-fit: cover; border-radius: 50%; }
          </style>
        </head>
        <body>
          <h1>Employee List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Profile</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>State</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${employees
                .map(
                  (emp: Employee) => `
                <tr>
                  <td>${emp.id}</td>
                  <td><img src="${emp.profileImage || ""}" alt="${emp.fullName}" onerror="this.style.display='none'" /></td>
                  <td>${emp.fullName}</td>
                  <td>${emp.gender}</td>
                  <td>${dayjs(emp.dateOfBirth).format("MMM DD, YYYY")}</td>
                  <td>${emp.state}</td>
                  <td>${emp.isActive ? "Active" : "Inactive"}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Filter and search employees
  useEffect(() => {
    // Handle API response structure: response.data.data or response.data
    const employees = data?.data?.data || data?.data || [];
    let filtered = Array.isArray(employees) ? employees : [];

    // Apply search filter
    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter((emp: Employee) =>
        emp.fullName.toLowerCase().includes(search)
      );
    }

    // Apply gender filter
    if (genderFilter !== "All") {
      filtered = filtered.filter((emp: Employee) => emp.gender === genderFilter);
    }

    // Apply status filter
    if (statusFilter !== "All") {
      const isActive = statusFilter === "Active";
      filtered = filtered.filter((emp: Employee) => emp.isActive === isActive);
    }

    setFilteredEmployees(filtered);
  }, [data, searchText, genderFilter, statusFilter]);

  // Calculate statistics
  const employees = data?.data?.data || data?.data || [];
  const employeesList = Array.isArray(employees) ? employees : [];
  const totalEmployees = employeesList.length || 0;
  const activeEmployees =
    employeesList.filter((emp: Employee) => emp.isActive).length || 0;
  const inactiveEmployees = totalEmployees - activeEmployees;

  const columns: ColumnsType<Employee> = [
    {
      title: "Employee ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Profile Image",
      dataIndex: "profileImage",
      key: "profileImage",
      width: 100,
      align: "center",
      render: (image: string, ) => (
        <Avatar
          src={image || undefined}
          size={50}
          icon={!image ? <UserAddOutlined /> : undefined}
        />
      ),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 100,
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: 120,
      render: (date: string) => dayjs(date).format("MMM DD, YYYY"),
      sorter: (a, b) =>
        dayjs(a.dateOfBirth).unix() - dayjs(b.dateOfBirth).unix(),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      width: 120,
    },
    {
      title: "Active / Inactive",
      dataIndex: "isActive",
      key: "isActive",
      width: 130,
      render: (isActive: boolean, record: Employee) => (
        <Switch
          checked={isActive}
          onChange={(checked) => handleStatusToggle(checked, record)}
          loading={toggleStatusMutation.isPending}
        />
      ),
    },
    {
      title: "Actions",
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            loading={
              deleteEmployeeMutation.isPending && record.id === editState.id
            }
            onClick={() => handleDelete(record)}
            size="small"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Summary Cards */}
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Employees"
              value={totalEmployees}
              valueStyle={{ color: "#3C83F6" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Active Employees"
              value={activeEmployees}
              valueStyle={{ color: "#10b981" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Inactive Employees"
              value={inactiveEmployees}
              valueStyle={{ color: "#ef4444" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Employee List Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Employee Management
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              onClick={handlePrint}
              disabled={filteredEmployees.length === 0}
            >
              Print
            </Button>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => setEditState({ open: true, id: null })}
            >
              Add Employee
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Search
            placeholder="Search employees by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={setSearchText}
            style={{ width: "100%", maxWidth: 300 }}
            size="large"
            allowClear
          />
          <Select
            placeholder="Filter by Gender"
            value={genderFilter}
            onChange={(value) => setGenderFilter(value as GenderFilter)}
            style={{ width: "100%", maxWidth: 200 }}
            size="large"
          >
            <Select.Option value="All">All Genders</Select.Option>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
          <Select
            placeholder="Filter by Status"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value as StatusFilter)}
            style={{ width: "100%", maxWidth: 200 }}
            size="large"
          >
            <Select.Option value="All">All Status</Select.Option>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </div>

        {/* Employee Table */}
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          loading={isFetching}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} employees`,
          }}
          scroll={{ x: 1400 , y:150 }}
          locale={{
            emptyText: (
              <div className="flex flex-col justify-center items-center py-8 text-gray-400">
                <Empty description="No Employees Found" />
              </div>
            ),
          }}
        />
      </div>

      {/* Employee Form Modal */}
      <EmployeeForm
        open={editState.open}
        onSubmit={handleSubmit}
        onClose={handleCloseForm}
        employeeData={employeeData?.data?.data || employeeData?.data || null}
        loading={
          updateEmployeeMutation.isPending || createEmployeeMutation.isPending
        }
        employeeLoading={employeeLoading}
      />
    </div>
  );
};

export default EmployeeManagement;

