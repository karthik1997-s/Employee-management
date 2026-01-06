import {
  Button,
  Drawer,
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Upload,
  App,
  Switch,
} from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import type { UploadFile } from "antd";
import { Employee } from "../../types/employee";
import { US_STATES } from "../../constants/states";
import dayjs from "dayjs";

type EmployeeFormProps = {
  open: boolean;
  employeeData: Employee | null;
  onClose: () => void;
  onSubmit: (values: any) => void;
  loading: boolean;
  employeeLoading: boolean;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  open,
  employeeData,
  onClose,
  onSubmit,
  loading,
  employeeLoading,
}) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Convert image to base64
  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image upload
  const handleImageChange = async (info: any) => {
    const file = info.file;
    if (file) {
      try {
        const base64 = await getBase64(file.originFileObj || file);
        setImagePreview(base64);
        form.setFieldValue("profileImage", base64);
        setFileList([file]);
      } catch (error) {
        message.error("Failed to process image");
      }
    }
  };

  // Submit function
  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      dateOfBirth: values.dateOfBirth
        ? dayjs(values.dateOfBirth).format("YYYY-MM-DD")
        : values.dateOfBirth,
    };
    onSubmit(formattedValues);
    form.resetFields();
    setImagePreview("");
    setFileList([]);
  };

  // Close function
  const handleClose = () => {
    onClose();
    form.resetFields();
    setImagePreview("");
    setFileList([]);
  };

  useEffect(() => {
    if (employeeData) {
      form.setFieldsValue({
        fullName: employeeData.fullName,
        gender: employeeData.gender,
        dateOfBirth: dayjs(employeeData.dateOfBirth),
        state: employeeData.state,
        profileImage: employeeData.profileImage,
        isActive: employeeData.isActive,
      });
      if (employeeData.profileImage) {
        setImagePreview(employeeData.profileImage);
      } else {
        setImagePreview("");
      }
      setFileList([]);
    } else {
      form.setFieldsValue({
        isActive: true,
      });
      setImagePreview("");
      setFileList([]);
    }
  }, [employeeData, form]);

  return (
    <Drawer
      loading={employeeLoading}
      title={
        <div className="flex flex-row justify-between items-center">
          <div className="text-lg font-semibold text-black">
            {employeeData?.id ? "Edit" : "Add"} Employee
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <CloseOutlined className="text-base" />
          </div>
        </div>
      }
      closable={false}
      destroyOnClose
      open={open}
      width={500}
      footer={
        <div className="flex justify-end gap-2 py-2">
          <Button
            onClick={handleClose}
            className="!h-9 !px-4 !rounded-md !text-sm"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={loading}
            className="!h-9 !px-4 !rounded-md !text-sm font-medium bg-blue-500 hover:bg-blue-600"
          >
            Submit
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        name="employeeForm"
        layout="vertical"
        className="w-full"
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="fullName"
              label={<span className="text-sm font-medium">Full Name</span>}
              rules={[
                { required: true, message: "Please enter full name" },
                { min: 2, message: "Full name must be at least 2 characters" },
                {
                  max: 100,
                  message: "Full name must not exceed 100 characters",
                },
              ]}
            >
              <Input placeholder="John Doe" size="large" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="gender"
              label={<span className="text-sm font-medium">Gender</span>}
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select Gender" size="large">
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="dateOfBirth"
              label={
                <span className="text-sm font-medium">Date of Birth</span>
              }
              rules={[{ required: true, message: "Please select date of birth" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                size="large"
                format="YYYY-MM-DD"
                maxDate={dayjs()}
                placeholder="Select Date of Birth"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="state"
              label={<span className="text-sm font-medium">State</span>}
              rules={[{ required: true, message: "Please select state" }]}
            >
              <Select
                placeholder="Select State"
                size="large"
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={US_STATES.map((state) => ({
                  label: state,
                  value: state,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="profileImage"
              label={
                <span className="text-sm font-medium">Profile Image</span>
              }
              rules={[
                { required: true, message: "Please upload profile image" },
              ]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleImageChange}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />} size="large" block>
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md border"
                />
              </div>
            )}
          </Col>

          <Col span={24}>
            <Form.Item
              name="isActive"
              label={
                <span className="text-sm font-medium">Status</span>
              }
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                size="default"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EmployeeForm;

