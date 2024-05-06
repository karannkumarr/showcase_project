// Home.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import imageone from "../app/assets/imageone.jpg";
import Categories from '@/components/Categories';
import { useSearchParams } from 'next/navigation';

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

  var searchParams = useSearchParams()
  var categories = searchParams.get("category") || null

  const [projects, setProjects] = useState<Project[]>([]); // Specify the type of projects as Project[]

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/user?type=project&category=${categories}`); // Send request with query parameter
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        console.log('Response data:', data); // Log the response data
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects();
  }, [categories]);
  

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories/>
   
  <section className="projects-grid">
  {projects.map(project => (
  <ProjectCard
    key={project._id} // Use _id as the key
    id={project._id} // Use _id as the id
    image={ project.image }
    title={`${project.title}`} // Use _id in the title
    name={"Karan"}
    avatarUrl={project.image}
    userId={project.createdBy|| ''} // Use an appropriate fallback if createdBy or id is missing or undefined
  />
))}

      </section>
      
    </section>
  );
};

export default Home;
