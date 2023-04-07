import React, {useState} from 'react';
import { Modal, Image } from 'antd';
//import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function ImgButton({imagePath}) {

// const imagePath=imagePath;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

return <>
    <button type="button" className="btn btn-primary btn-option" onClick={showModal}>圖片</button>
    <Modal centered width={1000} open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
		  {/* <Image src={`https://twowayiot.com/${imgPath}`} width={960} height={540} /> */}
      <Image src={imagePath} width={960} height={540} />
    </Modal>
            </>
}
export default ImgButton