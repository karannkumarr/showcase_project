"use client"
import Modal from "@/components/Modal";
import Link from "next/link";
import Image from "next/image";
import imageone from "../../assets/imageone.jpg";
import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
import { User } from "@/Models/DatabaseModels";
import Skeleton from 'react-loading-skeleton';


interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string; // Assuming avatarUrl is the URL of the user's avatar
  // Add other properties as needed
}

interface Project {
  _id: string;
  title: string;
  description: string;
  createdBy: string; // Assuming createdBy is the ID of the user who created the project
  image: string; // Assuming image is the URL of the project image
  githubUrl: string; // Assuming githubUrl is the URL of the project's GitHub repository
  liveSiteUrl: string; // Assuming liveSiteUrl is the URL of the project's live site
  category: string; // Assuming category is the category of the project
  // Add other properties as needed
}

const ProjectPage: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [creator, setCreator] = useState<User | null>(null);
  const [creatorProjects, setCreatorProjects] = useState<Project[]>([]);

//   useEffect(() => {
//     const fetchProjectData = async () => {
//       try {
//         // Fetch project data
//         const projectResponse = await fetch('/api/user?type=project');
//         if (!projectResponse.ok) {
//           throw new Error('Failed to fetch project data');
//         }
//         const projectData = await projectResponse.json();
        
//         // Find the project with the ID from URL parameters
//         const projectId = window.location.pathname.split('/').pop();
//         const projectWithId = projectData.projects.find((project: Project) => project._id === projectId);
        
//         if (!projectWithId) {
//           throw new Error('Project not found');
//         }
        
//         setProject(projectWithId);

//         // Fetch creator data
//         if (projectWithId.createdBy) {
//           const creatorResponse = await fetch(`/api/user?type=user&id=${projectWithId.createdBy}`);
//           if (!creatorResponse.ok) {
//             throw new Error('Failed to fetch creator data');
//           }
//           const creatorData = await creatorResponse.json();
//           if (creatorData.users.length > 0) {
//             setCreator(creatorData.users[0]);
//           }
//         }

//         // Fetch projects by the same creator
//         const creatorProjectsResponse = await fetch(`/api/user?type=project&userId=${projectWithId.createdBy}`);
//         if (!creatorProjectsResponse.ok) {
//           throw new Error('Failed to fetch creator projects');
//         }
//         const creatorProjectsData = await creatorProjectsResponse.json();
//         setCreatorProjects(creatorProjectsData.projects);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchProjectData();
//   }, []);


useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const category = queryParams.get('category');
  
        // Fetch project data based on the category if it exists
        let apiUrl = '/api/user?type=project';
        if (category) {
          apiUrl += `&category=${category}`;
        }
  
        const projectResponse = await fetch(apiUrl);
        if (!projectResponse.ok) {
          throw new Error('Failed to fetch project data');
        }
        const projectData = await projectResponse.json();
  
        // Find the project with the ID from URL parameters
        const projectId = window.location.pathname.split('/').pop();
        const projectWithId = projectData.projects.find((project: Project) => project._id === projectId);
  
        if (!projectWithId) {
          throw new Error('Project not found');
        }
  
        setProject(projectWithId);
  
        // Fetch creator data
        if (projectWithId.createdBy) {
          const creatorResponse = await fetch(`/api/user?type=user&id=${projectWithId.createdBy}`);
          if (!creatorResponse.ok) {
            throw new Error('Failed to fetch creator data');
          }
          const creatorData = await creatorResponse.json();
          if (creatorData.users.length > 0) {
            setCreator(creatorData.users[0]);
          }
        }
  
        // Fetch projects by the same creator
        const creatorProjectsResponse = await fetch(`/api/user?type=project&userId=${projectWithId.createdBy}`);
        if (!creatorProjectsResponse.ok) {
          throw new Error('Failed to fetch creator projects');
        }
        const creatorProjectsData = await creatorProjectsResponse.json();
        setCreatorProjects(creatorProjectsData.projects);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchProjectData();
  }, []);
  
  if (!project || !creator) {
    return <div>
      <Skeleton height={100} />
    <Skeleton height={100} />
    <Skeleton height={100} />
    </div>;
  }

  const renderLink = () => `/profile/${creator.id}`;

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={creator.avatarUrl}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {project.title}
            </p>

            <div className="user-info">
              <Link href={renderLink()}>
                {creator.name}
              </Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link href={`/?category=${project.category}`} className="text-primary-purple font-semibold"> 
                {project.category}
              </Link>
            </div>
          </div>
        </div>

        {/* Project actions for logged-in user */}
      </section>

      <section className="mt-14">
        <Image
          src={project.image}
          className="object-fit rounded-2xl"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">
          {project.description} 
        </p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link href={project.githubUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
            🖥 <span className="underline">Github</span> 
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link href={project.liveSiteUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
            🚀 <span className="underline">Live Site</span> 
          </Link>
        </div>
      </section>
    
      {/* Additional sections and components */}

      <section className="flexCenter w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-light-white-200" />
                <Link href={renderLink()} className="min-w-[82px] h-[82px]">
                    <Image
                        src={creator.avatarUrl}
                        className="rounded-full"
                        width={82}
                        height={82}
                        alt="profile image"
                    />
                </Link>
                <span className="w-full h-0.5 bg-light-white-200" />
            </section>

            <section className="flex flex-col mt-8 w-full">

            <div className="flexBetween">
                <p className="text-lg font-bold">
                    More by {creator.name}
                </p>
                <Link
                    href={`/profile/${creator.id}`}
                    className="text-primary-purple text-lg bold"
                >
                    View All
                </Link>
            </div>

            </section>

      <section className="projects-grid">
     

        {creatorProjects.map(project => (
    <ProjectCard
      key={project._id} // Use _id as the key
      id={project._id} // Use _id as the id
      image={project.image} // Use project.image for the image URL
      title={project.title} // Use project.title for the title
      name={creator.name} // Use creator.name for the name of the creator
      avatarUrl={creator.avatarUrl} // Use creator.avatarUrl for the avatar URL of the creator
      userId={project.createdBy || ''} // Use an appropriate fallback if createdBy is missing or undefined
    />
  ))}
</section>

    </Modal>


  );
};

export default ProjectPage;
