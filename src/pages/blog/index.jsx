import { Button, Modal, List, Form, Input, Avatar } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

function BlogPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [posts, setPosts] = useState([
    {
      key: "1",
      title: "Identifying Your Skin Type",
      author: "Alice Johnson",
      date: "2025-03-11",
      content: `Understanding your skin type is key to an effective skincare routine. 
      The five main skin types—normal, dry, oily, combination, and sensitive—each require different care.`,
      avatar: "https://via.placeholder.com/150",
    },
    {
      key: "2",
      title: "How to Choose the Right Sunscreen",
      author: "Bob Brown",
      date: "2025-03-10",
      content:
        "Choosing the right sunscreen can be challenging. Here are some tips...",
      avatar: "https://via.placeholder.com/150",
    },
    {
      key: "3",
      title: "Top 10 Skincare Products for 2025",
      author: "Alice Johnson",
      date: "2025-03-10",
      content:
        "Discover the best skincare products to keep your skin glowing and healthy...",
      avatar: "https://via.placeholder.com/150",
    },
  ]);

  const handleAdd = (post) => {
    setPosts([...posts, { ...post, key: posts.length + 1 }]);
  };

  const handleUpdate = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.key === updatedPost.key ? updatedPost : post))
    );
  };

  const handleDelete = (key) => {
    setPosts(posts.filter((post) => post.key !== key));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative bg-pink-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-pink-800 mb-6">
            Blogs
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Read our latest blog posts and stay updated on the latest skincare
            trends and tips
          </p>
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
            dataSource={posts}
            renderItem={(post) => (
              <List.Item
                key={post.key}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <List.Item.Meta
                  avatar={<Avatar src={post.avatar} />}
                  title={post.title}
                  description={`By ${post.author} on ${post.date}`}
                />
                <div className="whitespace-pre-line">{post.content}</div>
              </List.Item>
            )}
          />
          <Modal
            title={editingPost ? "Edit Post" : "Add Post"}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={() => setIsOpen(false)}
          >
            <Form>
              <Form.Item label="Title" name="title">
                <Input />
              </Form.Item>
              <Form.Item label="Author" name="author">
                <Input />
              </Form.Item>
              <Form.Item label="Content" name="content">
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="Avatar URL" name="avatar">
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
