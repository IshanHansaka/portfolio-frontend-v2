'use client';

import { fetchAllBlogs } from '@/service/blogService';
import { fetchAllProjects } from '@/service/projectService';
import { Blog } from '@/types/BlogType';
import { Project } from '@/types/ProjectType';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminPortal() {
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

  const addTool = (tools: string[]) => tools.push('');
  const removeTool = (tools: string[], index: number) => tools.splice(index, 1);

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const createProject = () => console.log('Create Project', newProject);
  const updateProject = () => console.log('Update Project', modifyProject);
  const deleteProject = () => console.log('Delete Project', removeProject);

  const createBlog = () => console.log('Create Blog', newBlog);
  const updateBlog = () => console.log('Update Blog', modifyBlog);
  const deleteBlog = () => console.log('Delete Blog', removeBlog);

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center font-sans">
        <h1 className="text-5xl font-bold mb-10 underline">Admin Portal</h1>
      </div>

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
                <li key={project.name} className="mb-4">
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
                <li key={blog.title} className="mb-4">
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
                className="btn bg-slate-500 text-white px-4 py-2 rounded"
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
                        onClick={() => removeTool(newProject.tools, idx)}
                        className="bg-slate-800 text-white px-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTool(newProject.tools)}
                    className="bg-slate-800 text-white px-4 py-2 rounded w-full"
                  >
                    Add Tool
                  </button>
                  <button
                    type="submit"
                    className="bg-slate-800 text-white px-4 py-2 rounded w-full"
                  >
                    Create Project
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
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                  <textarea
                    value={newBlog.content}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, content: e.target.value })
                    }
                    placeholder="Blog Content"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="date"
                    value={newBlog.date}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, date: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    value={newBlog.medium_link}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, medium_link: e.target.value })
                    }
                    placeholder="Medium Link"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Create Blog
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
