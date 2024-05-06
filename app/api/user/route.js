import connectMongoDB from "../../../lib/mongodb";
import { User, Project } from "../../../Models/DatabaseModels"; // Import your User and Project models
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId from mongodb


export async function POST(request) { 
    try {
  
  
      await connectMongoDB(); // Connect to MongoDB
  

      // const { type, data } = await request.json();

      
        // Parse form data from the request body
        const formData = await request.formData();
        const type = formData.get("type") ;
        const data = JSON.parse(formData.get("data")); // Parse JSON string

      if (type === "user") {
        // If the request is for creating a user
        const user = await User.create(data); // Create a new user using the provided data
        return NextResponse.json({ message: "User Created", user }, { status: 201 });
      } else if (type === "project") {
        // If the request is for creating a project
        const project = await Project.create(data); // Create a new project using the provided data
  
        // Check if createdBy field is present in project data
        if (!data.createdBy) {
          return NextResponse.json({ message: "Error: createdBy field is missing in project data" }, { status: 400 });
        }
  
        // Find the user who created the project
        const user = await User.findById(data.createdBy);
  
        if (!user) {
          return NextResponse.json({ message: "Error: User not found" }, { status: 404 });
        }
  
        // Add the project's ID to the user's projects array
        user.projects.push(project._id);
  
        // Save the user object back to the database
        await user.save();
  
        return NextResponse.json({ message: "Project Created and Associated with User", project }, { status: 201 });
      } else {
        // If the request type is not recognized
        return NextResponse.json({ message: "Invalid request type" }, { status: 400 });
      }
    } catch (error) {
      // If any error occurs during the process
      console.error("Error:", error);
      return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
    }
  }

//   export async function GET(request) {
//     try {
//         await connectMongoDB(); // Connect to MongoDB

//         const queryParams = new URLSearchParams(request.url.split("?")[1]); // Extract query parameters
//         const type = queryParams.get('type'); // Extract the type from the query parameters
//         const userId = queryParams.get('userId'); // Extract the userId from the query parameters
      
//         if (!type) {
//             return NextResponse.json({ message: "Type parameter is missing" }, { status: 400 });
//         }
      
//         if (type === "user") {
//             // If the request is for retrieving user data
//             const users = await User.find(); // Retrieve all users from the database
//             return NextResponse.json({ users }, { status: 200 });
//         } else if (type === "project") {
//             // If the request is for retrieving project data
//             let projects;
//             if (userId) {
//                 // If userId is provided, retrieve projects associated with the specified user
//                 projects = await Project.find({ createdBy: userId }); // Retrieve projects based on createdBy field
//             } else {
//                 // If userId is not provided, retrieve all projects
//                 projects = await Project.find(); // Retrieve all projects from the database
//             }
//             return NextResponse.json({ projects }, { status: 200 });
//         } else {
//             // If the request type is not recognized or if type is not provided
//             return NextResponse.json({ message: "Invalid request type" }, { status: 400 });
//         }
//     } catch (error) {
//         // If any error occurs during the process
//         console.error("Error:", error);
//         return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
//     }
// }

export async function GET(request) {
  try {
      await connectMongoDB(); // Connect to MongoDB

      const queryParams = new URLSearchParams(request.url.split("?")[1]); // Extract query parameters
      const type = queryParams.get('type'); // Extract the type from the query parameters
      const userId = queryParams.get('userId'); // Extract the userId from the query parameters
      const category = queryParams.get('category'); // Extract the category from the query parameters
    
      if (!type) {
          return NextResponse.json({ message: "Type parameter is missing" }, { status: 400 });
      }
    
      if (type === "user") {
          // If the request is for retrieving user data
          const users = await User.find(); // Retrieve all users from the database
          return NextResponse.json({ users }, { status: 200 });
      } else if (type === "project") {
          // If the request is for retrieving project data
          let projects;
          if (userId) {
              // If userId is provided, retrieve projects associated with the specified user
              projects = await Project.find({ createdBy: userId }); // Retrieve projects based on createdBy field
          } else if (category && category!="null") {
              // If category is provided, retrieve projects based on the specified category
              projects = await Project.find({ category: category }); // Retrieve projects based on category field
          } else {
              // If userId and category are not provided, retrieve all projects
              projects = await Project.find(); // Retrieve all projects from the database
          }
          return NextResponse.json({ projects }, { status: 200 });
      } else {
          // If the request type is not recognized or if type is not provided
          return NextResponse.json({ message: "Invalid request type" }, { status: 400 });
      }
  } catch (error) {
      // If any error occurs during the process
      console.error("Error:", error);
      return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
  }
}




export async function DELETE(request) {
    try {
      await connectMongoDB(); // Connect to MongoDB
  
      const urlParams = new URLSearchParams(request.nextUrl.search);

      const projectId = urlParams.get("projectId").toString();
      const userId = urlParams.get("userId").toString();

      console.log(`user id ${userId} projectId ${projectId}`)
      // Check if projectId and userId are provided

      if (!projectId || !userId) {
        return NextResponse.json({ message: "Error: projectId and userId are required" }, { status: 400 });
      }
  
      // Find the project by ID
      const project = await Project.findById(projectId);
  
      // Check if project exists
      if (!project) {
        return NextResponse.json({ message: "Error: Project not found" }, { status: 404 });
      }
  
      // Check if the user ID matches the createdBy field of the project
      if (project.createdBy != userId) {
        console.log(`${project.createdBy} and uid is ${userId}`)
        return NextResponse.json({ message: "Error: Unauthorized" }, { status: 401 });
      }
  
      // If user is authorized, delete the project
      await Project.findByIdAndDelete(projectId);

      // Add this line to remove the projectId from the user's projects array
    await User.updateOne({ _id: userId }, { $pull: { projects: projectId } });
  
      return NextResponse.json({ message: "Project Deleted" }, { status: 200 });
    } catch (error) {
      // If any error occurs during the process
      console.error("Error:", error);
      return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
    }
  }