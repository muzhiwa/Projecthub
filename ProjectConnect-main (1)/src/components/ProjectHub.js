import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import ProjCard from "./ProjCard";
import { majors } from "../data/majors";
import NewButton from "./Button";
import AdvicePg from "./AdvicePg";
import "../styles.css"; // Import your CSS file here
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { v4 as uuidv4 } from 'uuid';
import PostModal from "./PostModal"


const firebaseConfig = {
  apiKey: "AIzaSyA4VG8k0mCLH_QfvXh-VgpG99cvQ9OxC3U",
  authDomain: "project-connect-fd448.firebaseapp.com",
  projectId: "project-connect-fd448",
  storageBucket: "project-connect-fd448.appspot.com",
  messagingSenderId: "17840502960",
  appId: "1:17840502960:web:d879c7173bbc7475cae375",
  measurementId: "G-4K72Q8CJMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set, onValue} from "firebase/database"
// Get the reference of the database.
const database = getDatabase();


export default function ProjectHub() {
  React.useEffect(() => {
    const postsRef = ref(database, 'posts/');
  onValue(postsRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data)
  if( !!data ) {
    setPosts(Object.entries(data));
  } else {
    console.log('Data not found');
  }  
});
  }, [])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = React.useState([]);
  const [name, setName] = React.useState('');
  const [projectTitle, setProjTitle] = React.useState('');
  const [projectDesc, setProjDesc] = React.useState('');
  const [contactInfo, setContInfo] = React.useState('');
  const [fieldInterest, setFieldInterest] = React.useState('');

  // Function to prevent closing the modal when clicking outside
  const handleOutsideClick = (e) => {
    e.stopPropagation();
  };

  const buttonClick = () => {
  const user = localStorage.getItem("user")
  console.log(user)
    set(ref(database, 'posts/' + uuidv4()), { name: user, projectTitle, projectDesc, contactInfo, fieldInterest }).then( () => {
      // Success.
   } ).catch( (error) => {
     console.log(error);
   } );
    onClose();
   // setPosts([...posts, { name, projectTitle, projectDesc, contactInfo, fieldInterest }]);
  };

  const updateName = (event) => {
    setName(event.target.value);
  };

  const updateProjTitle = (event) => {
    setProjTitle(event.target.value);
  };

  const updateProjDesc = (event) => {
    setProjDesc(event.target.value);
  };

  const updateContactInfo = (event) => {
    setContInfo(event.target.value);
  };

  const updateFieldInterest = (event) => {
    console.log(event)
    setFieldInterest(event);
  };

  return (
    <div className="project-hub-container">
      <h1 className="projects-title">Projects</h1>
      <h2 className="passion-project-text">Choose to get involved with somebody’s passion project, or start your own! The choice is yours! :)</h2>
      <Button onPress={onOpen} className="add-project-button">Add Your Project!</Button>
      <PostModal  isOpen={isOpen} onClose={onClose}/>

      {/* Wrap the ProjCard components with the proj-card-container div */}
      <div className="proj-card-container">
        {posts.map((post, index) => (
          <ProjCard
            key={post[0]} // Add key prop to avoid warning
            id={post[0]}
            projName={post[1].projectTitle}
            userName={post[1].name}
            projDesc={post[1].projectDesc}
            userContact={post[1].contactInfo}
            fieldOfInterest={post[1].fieldInterest}
          />
        ))}
      </div>
      
      <div className="coffee-brown-button">
        <NewButton text="Project Advice!" path="/AdvicePage" />
      </div>
    </div>
  );
}
