import {useEffect, useState} from 'react';
import {Alert, Col, Space, Typography, Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import Confetti from 'react-confetti';
import axios from 'axios';

import {useAppState} from '@figment-secret/hooks';

const {Text} = Typography;

const Connect = () => {
  const {state, dispatch} = useAppState();
  const chainId = 'Secret';

  const [version, setVersion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    if (version) {
      dispatch({
        type: 'SetNetwork',
        network: version,
      });
    }
  }, [version, setVersion]);

  const getConnection = async () => {
    setFetching(true);
    setError(null);
    setVersion(null);
    try {
      const response = await axios.post(`/api/secret/connect`, state);
      setVersion(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col>
      {version && (
        <Confetti numberOfPieces={500} tweenDuration={1000} gravity={0.05} />
      )}
      <Space direction="vertical" size="large">
        <Space direction="horizontal" size="large">
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={getConnection}
            loading={fetching}
            size="large"
          />
          {version ? (
            <Alert
              message={
                <Space>
                  Connected to {chainId}:<Text code>version {version}</Text>
                </Space>
              }
              type="success"
              showIcon
            />
          ) : (
            <Alert
              message={
                <Space>
                  Connected to {chainId}:<Text code>error: {error}</Text>
                </Space>
              }
              type="error"
              showIcon
            />
          )}
        </Space>
      </Space>
    </Col>
  );
};

export default Connect;
