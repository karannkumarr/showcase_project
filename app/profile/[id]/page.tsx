"use client"

import ProfilePage from '@/components/ProfilePage';
import { useState, useEffect } from 'react';

type Props = {
    params: {
        id: string,
    },
}

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
  

const UserProfile = ({ params }: Props) => {
    const [project, setProject] = useState<Project | null>(null);
    const [creator, setCreator] = useState<User | null>(null);
    const [creatorProjects, setCreatorProjects] = useState<Project[]>([]);
    
    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                // Fetch project data based on the project ID from params
                const projectResponse = await fetch(`/api/user?type=project&projectId=${params.id}`);
                if (!projectResponse.ok) {
                    throw new Error('Failed to fetch project data');
                }
                const projectData = await projectResponse.json();
                const projectWithId = projectData.projects[0]; // Assuming projects array contains only one project with the specified ID

                if (!projectWithId) {
                    throw new Error('Project not found');
                }
                setProject(projectWithId);

                // Fetch creator data
                const creatorResponse = await fetch(`/api/user?type=user&userId=${projectWithId.createdBy}`);
                if (!creatorResponse.ok) {
                    throw new Error('Failed to fetch creator data');
                }
                const creatorData = await creatorResponse.json();
                if (creatorData.users.length > 0) {
                    setCreator(creatorData.users[0]);
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
    }, [params.id]);

    return <ProfilePage  />;
}

export default UserProfile;
