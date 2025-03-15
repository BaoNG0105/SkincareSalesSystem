import { Button, Modal, List, Form, Input, Avatar } from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { getBlog } from "../../services/api.blog";
import { postBlog } from "../../services/api.blog";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Giải mã token

function BlogPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getBlog();
      setBlogs(data);
    };
    fetchPosts();
  }, []);

  const handleAdd = async (post) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ local storage
      if (!token) {
        // TH chưa login
        toast.error("Please login to add a blog post.");
        return;
      }
      const decodedToken = jwtDecode(token); // Giải mã token
      const userId = decodedToken.id; // Lấy id của user từ token

      const formData = {
        title: post.title,
        content: post.content,
        userId: userId, // Lấy userId từ token
        category: post.category,
      };

      await postBlog(formData); // Gửi formData đến backend
      // Fetch posts again after adding a new blog
      const data = await getBlog();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching user or posting blog:", error);
      toast.error("Failed to add blog. Please try again.");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-pink-100 via-pink-50 to-white">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-extrabold text-pink-800 mb-4 tracking-tight">
              Blogs
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Read our latest blog posts and stay updated on the latest skincare
              trends and tips
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-pink-800 mb-6">
            Latest Blog Posts
          </h2>

          <List
            itemLayout="vertical"
            dataSource={blogs}
            renderItem={(blog) => (
              <List.Item
                key={blog.key}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <List.Item.Meta
                  avatar={<Avatar src={blog.author.profileImage} />}
                  title={blog.title}
                  description={`By ${blog.author.userName} on ${blog.createdAt}`}
                />
                <div className="whitespace-pre-line">{blog.content}</div>
              </List.Item>
            )}
          />
          <Modal
            title={editingPost ? "Edit Post" : "Add Post"}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={() => {
              // Collect form data and call handleAdd
              const formData = {
                title: form.getFieldValue("title"),
                content: form.getFieldValue("content"),
                category: form.getFieldValue("category"),
                userId: form.getFieldValue("userId"),
              };
              handleAdd(formData);
              setIsOpen(false);
            }}
          >
            <Form form={form}>
              <Form.Item label="Title" name="title">
                <Input />
              </Form.Item>
              <Form.Item label="Content" name="content">
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsOpen(true)}
            className="mb-4"
          >
            Add Blog Post
          </Button>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
