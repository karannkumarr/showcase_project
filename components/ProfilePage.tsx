
import Image from 'next/image'

import Link from 'next/link'
import Button from "./Button";
import ProjectCard from './ProjectCard';
import { ProjectInterface, UserProfile } from '@/common.types';
interface User {
    _id: string;
    name: string;
    email: string;
    avatarUrl: string;
    description?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    projects?: string[]; // Assuming projects are represented as an array of strings (IDs)
}


interface Project {
    _id: string | undefined;
    title: string;
    description: string;
    createdBy: string; // Assuming createdBy is the ID of the user who created the project
    image: string; // Assuming image is the URL of the project image
    githubUrl: string; // Assuming githubUrl is the URL of the project's GitHub repository
    liveSiteUrl: string; // Assuming liveSiteUrl is the URL of the project's live site
    category: string; // Assuming category is the category of the project
    // Add other properties as needed
  }


 

    

const ProfilePage = (
    // { user }: Props
    
) => {
      var user:User= {
        _id:"6637c3c83fb71dbe918a81f6",
        name:"Karan Kumar",
        avatarUrl:"https://randomuser.me/api/portraits/men/36.jpg",
        email:"karan@wondmobility.co.in",

    }
   return(
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
        <section className="flexBetween max-lg:flex-col gap-10 w-full">
            <div className='flex items-start flex-col w-full'>
                <Image src={user.avatarUrl} width={100} height={100} className="rounded-full" alt="user image" />
                <p className="text-4xl font-bold mt-10">{user?.name}</p>
                <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">I’m Founder of WOND 👋</p>
                
                <div className="flex mt-8 gap-5 w-full flex-wrap">
                    <Button 
                        title="Follow" 
                        leftIcon="/plus-round.svg" 
                        bgColor="bg-light-white-400 !w-max" 
                        textColor="text-black-100" 
                    />
                    <Link href={`mailto:${user?.email}`}>
                        <Button title="Connect with me" leftIcon="/email.svg" />
                    </Link>
                </div>
            </div>

          
                <Image
                    src="/profile-post.png"
                    width={739}
                    height={554}
                    alt="project image"
                    className='rounded-xl'
                />
            
       </section>

       <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
           <p className="w-full text-left text-lg font-semibold">Recent Work</p>
           
           <div className="profile_projects">
                {/* {user.projects.map(
                    ( project ) => (
                        <ProjectCard
                            key={`${project?.id}`}
                            id={project?.id}
                            image={project?.image}
                            title={project?.title}
                            name={user.name}
                            avatarUrl={user.avatarUrl}
                            userId={user.id}
                        />
                    )
                )} */}
            </div>
       </section>
   </section>
)
}

export default ProfilePage