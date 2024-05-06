"use client"

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

import Categories from '@/components/Categories';

interface User {
  id: string;
  name: string;
  avatarUrl: string;
  // Add other properties as needed
}

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  createdBy: string; // Assuming createdBy is the ID of the user who created the project
}

const Home = () => {
  // Function to extract query parameters from URL
  const getQueryParam = (name: string): string | null => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }
    return null;
  };

  // Extracting category from URL
  const categories = getQueryParam("category");

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/user?type=project&category=${categories || ''}`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        console.log('Response data:', data);
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects();
  }, [categories]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="flexStart flex-col paddings mb-16">
        <Categories/>
        <section className="projects-grid">
          {projects.map(project => (
            <ProjectCard
              key={project._id}
              id={project._id}
              image={project.image}
              title={`${project.title}`}
              name={"Karan"}
              avatarUrl={project.image}
              userId={project.createdBy || ''}
            />
          ))}
        </section>
      </section>
    </Suspense>
  );
};

export default Home;
