import React, { useState, useEffect } from 'react';
import { Upload, Button } from 'antd';

const FileUploader = ({
  onChange,
  folder,
  onUpload,
  value,
  loading,
  ...rest
}, ref) => {
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (value) {
      setFileList([{ url: value, thumbUrl: value }]);
    }
  }, [value]);

  const handleBeforeUpload = (file) => {
    onUpload(folder, file)
      .then((url) => {
        onChange(url);
        setFileList([{ ...file, thumbUrl: url, url }]);
      });
    return false;
  };

  return (
    <div>
      <Upload
        beforeUpload={handleBeforeUpload}
        multiple={false}
        listType="picture"
        showUploadList={false}
        ref={ref}
        {...rest}
      >
        <Button loading={loading} icon="upload">
          Select File
        </Button>
      </Upload>
      {
        fileList.filter((el) => el).length > 0
          ? fileList.map((file) => (
            <div className="custom-upload-list" key={file.url}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <img src={file.url} alt="" />
              </a>
            </div>
          )) : null
      }
    </div>
  );
};

export default React.forwardRef(FileUploader);
