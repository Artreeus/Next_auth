"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

// Interfaces
interface Blog {
  _id?: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
}

interface Project {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  liveLink: string;
  technologies: string[];
}

// Base API URL
const API_BASE_URL = "https://portfolio-backend001.vercel.app/api";

// Blog CRUD Component
export const BlogCRUD: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentBlog, setCurrentBlog] = useState<Blog>({
    title: "",
    content: "",
    imageUrl: "",
    category: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  // Create Blog
  const createBlog = async () => {
    try {
      await axios.post(`${API_BASE_URL}/blogs`, currentBlog);
      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error("Error creating blog", error);
    }
  };

  // Update Blog
  const updateBlog = async () => {
    try {
      await axios.put(`${API_BASE_URL}/blogs/${currentBlog._id}`, currentBlog);
      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error("Error updating blog", error);
    }
  };

  // Delete Blog
  const deleteBlog = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  // Edit Blog
  const editBlog = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsEditing(true);
  };

  // Reset Form
  const resetForm = () => {
    setCurrentBlog({
      title: "",
      content: "",
      imageUrl: "",
      category: "",
    });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Blog Management</h2>

      {/* Blog Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return isEditing ? updateBlog() : createBlog();
        }}
        className="mb-4 space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={currentBlog.title}
          onChange={(e) =>
            setCurrentBlog({ ...currentBlog, title: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={currentBlog.content}
          onChange={(e) =>
            setCurrentBlog({ ...currentBlog, content: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={currentBlog.imageUrl}
          onChange={(e) =>
            setCurrentBlog({ ...currentBlog, imageUrl: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={currentBlog.category}
          onChange={(e) =>
            setCurrentBlog({ ...currentBlog, category: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Blog" : "Create Blog"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Blog List */}
      <div className="grid gap-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{blog.title}</h3>
              <p>{blog.category}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => editBlog(blog)}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBlog(blog._id!)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Project CRUD Component
export const ProjectCRUD: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>({
    title: "",
    description: "",
    imageUrl: "",
    liveLink: "",
    technologies: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [techInput, setTechInput] = useState("");

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  // Create Project
  const createProject = async () => {
    try {
      await axios.post(`${API_BASE_URL}/projects`, currentProject);
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error creating project", error);
    }
  };

  // Update Project
  const updateProject = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/projects/${currentProject._id}`,
        currentProject
      );
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error updating project", error);
    }
  };

  // Delete Project
  const deleteProject = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

  // Edit Project
  const editProject = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  // Add Technology
  const addTechnology = () => {
    if (techInput && !currentProject.technologies.includes(techInput)) {
      setCurrentProject({
        ...currentProject,
        technologies: [...currentProject.technologies, techInput],
      });
      setTechInput("");
    }
  };

  // Remove Technology
  const removeTechnology = (tech: string) => {
    setCurrentProject({
      ...currentProject,
      technologies: currentProject.technologies.filter((t) => t !== tech),
    });
  };

  // Reset Form
  const resetForm = () => {
    setCurrentProject({
      title: "",
      description: "",
      imageUrl: "",
      liveLink: "",
      technologies: [],
    });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Project Management</h2>

      {/* Project Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isEditing) {
            updateProject();
          } else {
            createProject();
          }
        }}
        
        className="mb-4 space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={currentProject.title}
          onChange={(e) =>
            setCurrentProject({ ...currentProject, title: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={currentProject.description}
          onChange={(e) =>
            setCurrentProject({
              ...currentProject,
              description: e.target.value,
            })
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={currentProject.imageUrl}
          onChange={(e) =>
            setCurrentProject({ ...currentProject, imageUrl: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Live Link"
          value={currentProject.liveLink}
          onChange={(e) =>
            setCurrentProject({ ...currentProject, liveLink: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        {/* Technologies Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add Technology"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {currentProject.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-blue-100 px-2 py-1 rounded flex items-center"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Project" : "Create Project"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Project List */}
      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => editProject(project)}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(project._id!)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export both components to fix the linting error
const App = { BlogCRUD, ProjectCRUD };
export default App;
