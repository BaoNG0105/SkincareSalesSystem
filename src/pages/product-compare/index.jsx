import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Card, Typography, Tag, Empty } from "antd";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ProductComparePage = () => {
  const navigate = useNavigate();
  const [compareProducts, setCompareProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("compareProducts");
    if (saved) {
      setCompareProducts(JSON.parse(saved));
    }
  }, []);

  const removeProduct = (productId) => {
    const newProducts = compareProducts.filter(
      (p) => p.productId !== productId
    );
    setCompareProducts(newProducts);
    localStorage.setItem("compareProducts", JSON.stringify(newProducts));
  };

  if (compareProducts.length === 0) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Empty
          description={
            <Title level={3} style={{ color: "#C91F50" }}>
              There are no products to compare
            </Title>
          }
        >
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            size="large"
            onClick={() => navigate("/")}
          >
            Back to shopping
          </Button>
        </Empty>
      </div>
    );
  }

  const columns = [
    {
      title: "Product Details",
      dataIndex: "feature",
      key: "feature",
      width: "20%",
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
    ...compareProducts.map((product) => ({
      title: (
        <Card
          bordered={false}
          style={{ textAlign: "center" }}
          bodyStyle={{ padding: 12 }}
        >
          <div style={{ marginBottom: 16 }}>
            <img
              src={product.image}
              alt={product.productName}
              style={{
                width: 200,
                height: 200,
                objectFit: "contain",
              }}
            />
          </div>
          <Typography.Title level={5} ellipsis={{ rows: 2 }}>
            {product.productName}
          </Typography.Title>
          <Typography.Text type="danger" strong style={{ fontSize: 18 }}>
            {product.price.toLocaleString()} VND
          </Typography.Text>
          <div style={{ marginTop: 12 }}>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeProduct(product.productId)}
            >
              Remove
            </Button>
          </div>
        </Card>
      ),
      dataIndex: product.productId,
      key: product.productId,
      width: `${80 / compareProducts.length}%`,
    })),
  ];

  const data = [
    {
      key: "description",
      feature: "Description",
      ...compareProducts.reduce(
        (acc, product) => ({
          ...acc,
          [product.productId]: (
            <Typography.Paragraph ellipsis={{ rows: 4 }}>
              {product.description}
            </Typography.Paragraph>
          ),
        }),
        {}
      ),
    },
    {
      key: "status",
      feature: "Status",
      ...compareProducts.reduce(
        (acc, product) => ({
          ...acc,
          [product.productId]: (
            <Tag color={product.status ? "success" : "error"}>
              {product.status ? "In Stock" : "Out of Stock"}
            </Tag>
          ),
        }),
        {}
      ),
    },
    {
      key: "stockQuantity",
      feature: "Stock Quantity",
      ...compareProducts.reduce(
        (acc, product) => ({
          ...acc,
          [product.productId]: (
            <Tag color="processing">{product.stockQuantity} products</Tag>
          ),
        }),
        {}
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Product Comparison
      </Title>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        scroll={{ x: true }}
      />
    </div>
  );
};

export default ProductComparePage;
