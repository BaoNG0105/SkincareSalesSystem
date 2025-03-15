import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../../services/api.product";
import { toast } from "react-toastify";
import {
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Card,
  Spin,
  Result,
  Space,
  Divider,
} from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  SwapOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compareProducts, setCompareProducts] = useState(() => {
    const saved = localStorage.getItem("compareProducts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("compareProducts", JSON.stringify(compareProducts));
  }, [compareProducts]);

  const handleCompareToggle = (product) => {
    setCompareProducts((prev) => {
      const isProductInCompare = prev.some(
        (p) => p.productId === product.productId
      );
      if (isProductInCompare) {
        return prev.filter((p) => p.productId !== product.productId);
      }
      if (prev.length >= 2) {
        toast.warning("Only 2 products can be compared!");
        return prev;
      }
      return [...prev, product];
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        if (productData) {
          setProduct(productData);
          const related = await getRelatedProducts(productData.category, id);
          setRelatedProducts(related.slice(0, 3));
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error details:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <Result
        status="error"
        title="Error"
        subTitle={error}
        extra={[
          <Button type="primary" key="back" onClick={() => navigate("/")}>
            Back to Home
          </Button>,
        ]}
      />
    );

  if (!product)
    return (
      <Result
        status="404"
        title="Product not found"
        extra={[
          <Button type="primary" key="back" onClick={() => navigate("/")}>
            Back to Home
          </Button>,
        ]}
      />
    );

  return (
    <div style={{ padding: "24px", background: "#f5f5f5", minHeight: "100vh" }}>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={12}>
          <Card>
            <div className="group relative" style={{ height: 450 }}>
              <img
                src={product.image}
                alt={product.productName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                }}
                className="hover:scale-150"
              />
              <Tag
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: 0.8,
                }}
              >
                Hover to zoom
              </Tag>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Title level={2}>{product.productName}</Title>

              <Title level={3} type="danger">
                {product.price.toLocaleString()} VND
              </Title>

              <Divider />

              <div>
                <Title level={4}>Description</Title>
                <Paragraph>{product.description}</Paragraph>
              </div>

              <Space>
                <Text>Status:</Text>
                <Tag color={product.status ? "success" : "error"}>
                  {product.status ? "In Stock" : "Out of Stock"}
                </Tag>
              </Space>

              <Space>
                <Text>Available:</Text>
                <Tag color="processing">{product.stockQuantity} items</Tag>
              </Space>

              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Button
                  icon={<SwapOutlined />}
                  type={
                    compareProducts.some(
                      (p) => p.productId === product.productId
                    )
                      ? "primary"
                      : "default"
                  }
                  block
                  onClick={() => handleCompareToggle(product)}
                >
                  {compareProducts.some(
                    (p) => p.productId === product.productId
                  )
                    ? "Added to compare"
                    : "Add to compare"}
                </Button>

                {compareProducts.length > 0 && (
                  <Button
                    icon={<SwapOutlined />}
                    type="primary"
                    block
                    onClick={() => navigate("/product-compare")}
                  >
                    Compare ({compareProducts.length} products)
                  </Button>
                )}

                <Button
                  icon={<ShoppingCartOutlined />}
                  type="default"
                  block
                  disabled={!product.status}
                >
                  Add to Cart
                </Button>

                <Button
                  icon={<DollarOutlined />}
                  type="primary"
                  danger
                  block
                  disabled={!product.status}
                >
                  Buy Now
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Related Products Section */}
      <div style={{ marginTop: 48 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          Related Products
        </Title>
        <Row gutter={[24, 24]}>
          {relatedProducts.map((relatedProduct) => (
            <Col xs={24} sm={12} md={8} key={relatedProduct.productId}>
              <Card
                hoverable
                cover={
                  <img
                    alt={relatedProduct.productName}
                    src={relatedProduct.image}
                    style={{
                      height: 200,
                      objectFit: "contain",
                      padding: 16,
                    }}
                  />
                }
                onClick={() =>
                  navigate(`/product-detail/${relatedProduct.productId}`)
                }
              >
                <Card.Meta
                  title={relatedProduct.productName}
                  description={
                    <Text type="danger" strong>
                      {relatedProduct.price.toLocaleString()} VND
                    </Text>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProductDetailPage;
