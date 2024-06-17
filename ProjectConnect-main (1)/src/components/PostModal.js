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

export default function PostModal({isOpen, onClose, existingTitle, existingDesc, existingInfo, existingInterest, existingID}) {
console.log(existingID)
   
    const [projectTitle, setProjTitle] = React.useState(existingTitle || "");
    const [projectDesc, setProjDesc] = React.useState(existingDesc || "");
    const [contactInfo, setContInfo] = React.useState(existingInfo || "");
    const [fieldInterest, setFieldInterest] = React.useState(existingInterest || "");
    const [wordCount, setWordCount] = React.useState(0);

     // Function to prevent closing the modal when clicking outside
    const handleOutsideClick = (e) => {
    e.stopPropagation();
     };

     const buttonClick = () => {
        const user = localStorage.getItem("user")
        console.log(user)
          set(ref(database, existingID ? `posts/${existingID}` : "posts/" + uuidv4()), { name: user, projectTitle, projectDesc, contactInfo, fieldInterest }).then( () => {
            // Success.
         } ).catch( (error) => {
           console.log(error);
         } );
          onClose();
         // setPosts([...posts, { name, projectTitle, projectDesc, contactInfo, fieldInterest }]);
        };

    const updateProjTitle = (event) => {
            setProjTitle(event.target.value);
          };
        
          const updateProjDesc = (event) => {
            setProjDesc(event.target.value);
          };
          const handleDescriptionChange = (event) => {
            const text = event.target.value;
            setProjDesc(text);
            const words = text.trim().split(/\s+/).filter(word => word.length > 0);
            setWordCount(words.length);
          };
          const updateContactInfo = (event) => {
            setContInfo(event.target.value);
          };
        
          const updateFieldInterest = (event) => {
            console.log(event)
            setFieldInterest(event);
          };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center" onClick={handleOutsideClick} isDismissable={false}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add a Project!</ModalHeader>
          <ModalBody>
            <Input label="Project Title" placeholder="Enter your project's title" variant="bordered" onChange={updateProjTitle} value={projectTitle} />
            <Input label="Project Description" placeholder="Tell people more about your project!" variant="bordered" onChange={handleDescriptionChange} value={projectDesc}/>
            <div className="word-count">Word count: {wordCount}</div>
            <Input label="Contact Info" placeholder="How would you like people to reach out to you?" variant="bordered" onChange={updateContactInfo} value={contactInfo}/>
            <Autocomplete label="Select a field of interest" className="autocomplete" onSelectionChange={updateFieldInterest} value={fieldInterest} >
              {majors.map((major) => (
                <AutocompleteItem key={major.value} value={major.value}>
                  {major.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>Close</Button>
            <Button color="danger" onPress={buttonClick}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}