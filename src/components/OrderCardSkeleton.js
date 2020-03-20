import React from 'react';
import { Skeleton, Card, Icon } from 'antd';

const { Meta } = Card;


const OrderCardSkeleton = () => (
  <Card
    style={{ width: 300, margin: 10 }}
    actions={[
      <Icon type="eye" />,
      <Icon type="check-circle" />,
    ]}
  >
    <Skeleton loading="true" active>
      <Meta
        title="Card title"
        description="This is the description"
      />
    </Skeleton>
  </Card>
)

export default OrderCardSkeleton;
