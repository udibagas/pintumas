import React from "react";
import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";

type SaveButtonProps = {
  label: string;
};

const SaveButton: React.FC<SaveButtonProps> = ({ label }) => {
  return (
    <Button icon={<SaveOutlined />} color="default" variant="solid" form='form' htmlType="submit">
      {label || 'Save'}
    </Button>
  );
};

export default SaveButton;
