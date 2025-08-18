'use client';

import { fetchAllBlogs } from '@/service/blogService';
import { fetchAllProjects } from '@/service/projectService';
import { Blog } from '@/types/BlogType';
import { Project } from '@/types/ProjectType';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const [selectedEntity, setSelectedEntity] = useState<'project' | 'blog'>(
    'project'
  );
  const [selectedAction, setSelectedAction] = useState<
    'create' | 'update' | 'delete'
  >('create');

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [pendingProject, setPendingProject] = useState(false);
  const [errorProject, setErrorProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    github_link: '',
    tools: [''],
    imageURL: '',
    live_link: '',
  });
  const [modifyProject, setModifyProject] = useState({
    id: '',
    name: '',
    description: '',
    github_link: '',
    tools: [''],
    imageURL: '',
    live_link: '',
  });
  const [removeProject, setRemoveProject] = useState({ id: '' });

  // Blogs state
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pendingBlog, setPendingBlog] = useState(false);
  const [errorBlog, setErrorBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    date: '',
    medium_link: '',
    imageUrl: '',
  });
  const [modifyBlog, setModifyBlog] = useState({
    id: '',
    title: '',
    content: '',
    date: '',
    medium_link: '',
    imageUrl: '',
  });
  const [removeBlog, setRemoveBlog] = useState({ id: '' });

  // Loading and success states
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const addTool = (isNewProject: boolean = true) => {
    if (isNewProject) {
      setNewProject((prev) => ({ ...prev, tools: [...prev.tools, ''] }));
    } else {
      setModifyProject((prev) => ({ ...prev, tools: [...prev.tools, ''] }));
    }
  };

  const removeTool = (index: number, isNewProject: boolean = true) => {
    if (isNewProject) {
      setNewProject((prev) => ({
        ...prev,
        tools: prev.tools.filter((_, i) => i !== index),
      }));
    } else {
      setModifyProject((prev) => ({
        ...prev,
        tools: prev.tools.filter((_, i) => i !== index),
      }));
    }
  };

  // Auto-populate update forms when project/blog is selected
  const populateModifyProject = (projectId: string) => {
    const project = projects.find((p) => p._id === projectId);
    if (project) {
      setModifyProject({
        id: projectId,
        name: project.name,
        description: project.description,
        github_link: project.github_link,
        tools: [...project.tools],
        imageURL: project.imageURL,
        live_link: project.live_link ?? '',
      });
    }
  };

  const populateModifyBlog = (blogId: string) => {
    const blog = blogs.find((b) => b._id === blogId);
    if (blog) {
      setModifyBlog({
        id: blogId,
        title: blog.title,
        content: blog.content,
        date: blog.date,
        medium_link: blog.medium_link,
        imageUrl: blog.imageUrl,
      });
    }
  };

  // Show success messages
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Project CRUD operations
  const createProject = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const data = await response.json();
      const result = data.project;
      setProjects((prev) => [...prev, result]);
      showSuccess('Project created successfully!');

      // Reset form
      setNewProject({
        name: '',
        description: '',
        github_link: '',
        tools: [''],
        imageURL: '',
        live_link: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setErrorProject(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async () => {
    if (!modifyProject.id) {
      alert('Please select a project to update');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${modifyProject.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: modifyProject.name,
          description: modifyProject.description,
          github_link: modifyProject.github_link,
          tools: modifyProject.tools,
          imageURL: modifyProject.imageURL,
          live_link: modifyProject.live_link,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      const data = await response.json();
      const result = data.project;
      setProjects((prev) =>
        prev.map((project) =>
          project._id === modifyProject.id ? result : project
        )
      );
      showSuccess('Project updated successfully!');

      // Reset form
      setModifyProject({
        id: '',
        name: '',
        description: '',
        github_link: '',
        tools: [''],
        imageURL: '',
        live_link: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setErrorProject(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${removeProject.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setProjects((prev) =>
        prev.filter((project) => project._id !== removeProject.id)
      );
      showSuccess('Project deleted successfully!');

      // Reset form
      setRemoveProject({ id: '' });
    } catch (error) {
      console.error('Error:', error);
      setErrorProject(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Blog CRUD operations
  const createBlog = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }

      const data = await response.json();
      const result = data.blog;
      setBlogs((prev) => [...prev, result]);
      showSuccess('Blog created successfully!');

      // Reset form
      setNewBlog({
        title: '',
        content: '',
        date: '',
        medium_link: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setErrorBlog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBlog = async () => {
    if (!modifyBlog.id) {
      alert('Please select a blog to update');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/blogs/${modifyBlog.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: modifyBlog.title,
          content: modifyBlog.content,
          date: modifyBlog.date,
          medium_link: modifyBlog.medium_link,
          imageUrl: modifyBlog.imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      const data = await response.json();
      const result = data.blog;
      setBlogs((prev) =>
        prev.map((blog) => (blog._id === modifyBlog.id ? result : blog))
      );
      showSuccess('Blog updated successfully!');

      // Reset form
      setModifyBlog({
        id: '',
        title: '',
        content: '',
        date: '',
        medium_link: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setErrorBlog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlog = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/blogs/${removeBlog.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      setBlogs((prev) => prev.filter((blog) => blog._id !== removeBlog.id));
      showSuccess('Blog deleted successfully!');

      // Reset form
      setRemoveBlog({ id: '' });
    } catch (error) {
      console.error('Error:', error);
      setErrorBlog(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        setPendingProject(true);
        const data = await fetchAllProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setErrorProject(true);
      } finally {
        setPendingProject(false);
      }
    };

    getAllProjects();
  }, []);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        setPendingBlog(true);
        const data = await fetchAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setErrorBlog(true);
      } finally {
        setPendingBlog(false);
      }
    };

    getAllBlogs();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check', { credentials: 'include' });
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch (err) {
        setIsAuthenticated(false);
        console.log('Error:', err);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include', // important
      });

      if (!res.ok) throw new Error('Invalid password');

      // Directly set authenticated state
      setIsAuthenticated(true);
    } catch (err) {
      console.log('Error:', err);
      alert('Invalid password');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto h-[100vh]">
        <div className="flex justify-center items-center h-full">
          <div className="py-6 px-10 shadow-2xl rounded-2xl font-sans space-y-4">
            <h1 className="text-3xl font-bold text-slate-800">
              Login: Admin Portal
            </h1>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border-2 border-slate-300 rounded w-full"
            />
            <button
              onClick={handleLogin}
              className="bg-slate-800 cursor-pointer font-semibold text-white py-2 px-4 rounded w-full border-3 border-slate-800 hover:bg-white hover:text-slate-800"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center font-sans">
        <h1 className="text-5xl font-bold mb-10 underline">Admin Portal</h1>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-slate-100 border border-slate-400 text-slate-700 rounded">
          {successMessage}
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-14 font-sans">
        {/* Left Column: Projects and Blogs */}
        <div className="col-span-3">
          {/* Projects */}
          <div className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Projects</h2>
            {pendingProject && (
              <div className="text-slate-500">Loading projects...</div>
            )}
            {errorProject && (
              <div className="text-red-500">Error 404 not found</div>
            )}
            <ul className="list-disc pl-5">
              {projects.map((project) => (
                <li key={project._id} className="mb-4">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p>{project.description}</p>

                  <Link href={project.github_link} className="text-blue-600">
                    {project.github_link}
                  </Link>
                  <br />
                  <Link
                    href={project.imageURL}
                    className="text-slate-600 underline"
                  >
                    view image
                  </Link>
                  <br />
                  {project.live_link && (
                    <Link href={project.live_link} className="text-blue-600">
                      {project.live_link}
                    </Link>
                  )}
                  <ul className="flex flex-wrap mt-1">
                    {project.tools.map((tool: string, idx: number) => (
                      <li key={idx} className="inline-block mr-4">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* Blogs */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Blogs</h2>
            {pendingBlog && (
              <div className="text-slate-500">Loading blogs...</div>
            )}
            {errorBlog && (
              <div className="text-red-500">Error 404 not found</div>
            )}
            <ul className="list-disc pl-5">
              {blogs.map((blog) => (
                <li key={blog._id} className="mb-4">
                  <h3 className="font-semibold text-lg">{blog.title}</h3>
                  <p>{blog.content}</p>
                  <p className="text-slate-600 text-sm">{blog.date}</p>
                  <Link
                    href={blog.imageUrl}
                    className="text-slate-600 underline"
                  >
                    view image
                  </Link>
                  <br />
                  <Link href={blog.medium_link} className="text-blue-600">
                    {blog.medium_link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="space-y-8 col-span-2">
          <div className="flex mb-1 gap-2">
            <div className="flex-1">
              <label htmlFor="entity" className="block mb-1 font-medium">
                Select Entity:
              </label>
              <select
                value={selectedEntity}
                onChange={(e) =>
                  setSelectedEntity(e.target.value as 'project' | 'blog')
                }
                id="entity"
                className="w-full p-2 border border-slate-300 rounded"
              >
                <option value="project">Project</option>
                <option value="blog">Blog</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="action" className="block mb-1 font-medium">
                Select Action:
              </label>
              <select
                value={selectedAction}
                onChange={(e) =>
                  setSelectedAction(
                    e.target.value as 'create' | 'update' | 'delete'
                  )
                }
                id="action"
                className="w-full p-2 border border-slate-300 rounded"
              >
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleLogout}
                className="btn bg-slate-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Project Forms */}
          {selectedEntity === 'project' && (
            <div>
              {selectedAction === 'create' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createProject();
                  }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-semibold">Create New Project</h2>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) =>
                      setNewProject({ ...newProject, name: e.target.value })
                    }
                    placeholder="Project Name"
                    className="w-full p-2 border border-slate-300 rounded"
                    required
                  />
                  <textarea
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    placeholder="Project Description"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={newProject.imageURL}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        imageURL: e.target.value,
                      })
                    }
                    placeholder="Image Link"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={newProject.github_link}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        github_link: e.target.value,
                      })
                    }
                    placeholder="Github Link"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={newProject.live_link}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        live_link: e.target.value,
                      })
                    }
                    placeholder="Live Link"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  {/* Tools input */}
                  {newProject.tools.map((tool, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={tool}
                        onChange={(e) => {
                          const tools = [...newProject.tools];
                          tools[idx] = e.target.value;
                          setNewProject({ ...newProject, tools });
                        }}
                        className="flex-1 p-2 border border-slate-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeTool(idx, true)}
                        className="bg-slate-800 text-white px-20 rounded cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTool(true)}
                    className="bg-slate-800 text-white px-4 py-2 rounded w-full  cursor-pointer"
                  >
                    Add Tool
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-800 text-white px-4 py-2 rounded cursor-pointer w-full disabled:bg-slate-400 transition-all duration-200"
                  >
                    {isLoading ? 'Creating...' : 'Create Project'}
                  </button>
                </form>
              )}

              {selectedAction === 'update' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateProject();
                  }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-semibold">Update Project</h2>
                  <select
                    value={modifyProject.id}
                    onChange={(e) => {
                      setModifyProject({
                        ...modifyProject,
                        id: e.target.value,
                      });
                      if (e.target.value) {
                        populateModifyProject(e.target.value);
                      }
                    }}
                    className="w-full p-2 border border-slate-300 rounded"
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={modifyProject.name}
                    onChange={(e) =>
                      setModifyProject({
                        ...modifyProject,
                        name: e.target.value,
                      })
                    }
                    placeholder="New Project Name"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <textarea
                    value={modifyProject.description}
                    onChange={(e) =>
                      setModifyProject({
                        ...modifyProject,
                        description: e.target.value,
                      })
                    }
                    placeholder="New Project Description"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={modifyProject.imageURL}
                    onChange={(e) =>
                      setModifyProject({
                        ...modifyProject,
                        imageURL: e.target.value,
                      })
                    }
                    placeholder="New Image Link"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={modifyProject.github_link}
                    onChange={(e) =>
                      setModifyProject({
                        ...modifyProject,
                        github_link: e.target.value,
                      })
                    }
                    placeholder="New Github Link"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={modifyProject.live_link}
                    onChange={(e) =>
                      setModifyProject({
                        ...modifyProject,
                        live_link: e.target.value,
                      })
                    }
                    placeholder="New Live Link"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  {/* Tools input for modify */}
                  {modifyProject.tools.map((tool, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={tool}
                        onChange={(e) => {
                          const tools = [...modifyProject.tools];
                          tools[idx] = e.target.value;
                          setModifyProject({ ...modifyProject, tools });
                        }}
                        className="flex-1 p-2 border border-slate-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeTool(idx, false)}
                        className="bg-slate-800 text-white px-20 rounded cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTool(false)}
                    className="bg-slate-800 text-white px-4 py-2 rounded w-full cursor-pointer"
                  >
                    Add Tool
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-800 text-white px-4 py-2 rounded cursor-pointer w-full disabled:bg-slate-400"
                  >
                    {isLoading ? 'Updating...' : 'Update Project'}
                  </button>
                </form>
              )}

              {selectedAction === 'delete' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    deleteProject();
                  }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-semibold">Delete Project</h2>
                  <select
                    value={removeProject.id}
                    onChange={(e) => setRemoveProject({ id: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded"
                  >
                    <option value="">Select Project to Delete</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-600 text-white px-4 py-2 cursor-pointer rounded w-full disabled:bg-slate-300"
                  >
                    {isLoading ? 'Deleting...' : 'Delete Project'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Blog Forms */}
          {selectedEntity === 'blog' && (
            <div>
              {selectedAction === 'create' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createBlog();
                  }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold">Create New Blog</h2>
                  <input
                    type="text"
                    value={newBlog.title}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, title: e.target.value })
                    }
                    placeholder="Blog Title"
                    className="w-full p-2 border border-slate-300 rounded"
                    required
                  />
                  <textarea
                    value={newBlog.content}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, content: e.target.value })
                    }
                    placeholder="Blog Content"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="date"
                    value={newBlog.date}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, date: e.target.value })
                    }
                    className="w-full p-2 border border-slate-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    value={newBlog.medium_link}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, medium_link: e.target.value })
                    }
                    placeholder="Medium Link"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={newBlog.imageUrl}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, imageUrl: e.target.value })
                    }
                    placeholder="Image URL"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-500 text-white px-4 py-2 cursor-pointer rounded w-full disabled:bg-slate-300"
                  >
                    {isLoading ? 'Creating...' : 'Create Blog'}
                  </button>
                </form>
              )}

              {selectedAction === 'update' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateBlog();
                  }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold">Update Blog</h2>
                  <select
                    value={modifyBlog.id}
                    onChange={(e) => {
                      setModifyBlog({ ...modifyBlog, id: e.target.value });
                      if (e.target.value) {
                        populateModifyBlog(e.target.value);
                      }
                    }}
                    className="w-full p-2 border border-slate-300 rounded"
                  >
                    <option value="">Select Blog</option>
                    {blogs.map((blog) => (
                      <option key={blog._id} value={blog._id}>
                        {blog.title}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={modifyBlog.title}
                    onChange={(e) =>
                      setModifyBlog({ ...modifyBlog, title: e.target.value })
                    }
                    placeholder="New Blog Title"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <textarea
                    value={modifyBlog.content}
                    onChange={(e) =>
                      setModifyBlog({ ...modifyBlog, content: e.target.value })
                    }
                    placeholder="New Blog Content"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="date"
                    value={modifyBlog.date}
                    onChange={(e) =>
                      setModifyBlog({ ...modifyBlog, date: e.target.value })
                    }
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={modifyBlog.medium_link}
                    onChange={(e) =>
                      setModifyBlog({
                        ...modifyBlog,
                        medium_link: e.target.value,
                      })
                    }
                    placeholder="New Medium Link"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={modifyBlog.imageUrl}
                    onChange={(e) =>
                      setModifyBlog({ ...modifyBlog, imageUrl: e.target.value })
                    }
                    placeholder="New Image URL"
                    className="w-full p-2 border border-slate-300 rounded"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-500 text-white px-4 py-2 cursor-pointer rounded w-full disabled:bg-slate-300"
                  >
                    {isLoading ? 'Updating...' : 'Update Blog'}
                  </button>
                </form>
              )}

              {selectedAction === 'delete' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    deleteBlog();
                  }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold">Delete Blog</h2>
                  <select
                    value={removeBlog.id}
                    onChange={(e) => setRemoveBlog({ id: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded"
                  >
                    <option value="">Select Blog to Delete</option>
                    {blogs.map((blog) => (
                      <option key={blog._id} value={blog._id}>
                        {blog.title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-600 text-white px-4 py-2 cursor-pointer rounded w-full disabled:bg-slate-300"
                  >
                    {isLoading ? 'Deleting...' : 'Delete Blog'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
