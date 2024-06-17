import React from "react";
import { Card, CardHeader, CardBody, Avatar, useDisclosure } from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {EditIcon} from './EditIcon';
import PenIcon from "../images/PenIcon.png"
import PostModal from "./PostModal"

export default function ProjCard(props) {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(props.id)
  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600 proj-card-title">{props.projName}</h4>
            <h5 className="text-small tracking-tight text-default-400">{props.userName}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p className="proj-card-desc">{props.projDesc}</p>
        <span className="pt-2 proj-card-contact">{props.userContact}</span>
        {/* Display the field of interest */}
        <div className="proj-card-field">
          <strong>Field of Interest: </strong>{props.fieldOfInterest}
        </div>
        {localStorage.getItem("user") === props.userName && (<Button className="edit-button" size="sm" color="warning" onPress={onOpen} endContent={<EditIcon/>}>
        Edit your post
      </Button>)
}  
  <PostModal  isOpen={isOpen} onClose={onClose} existingID={props.id} existingDesc={props.projDesc} existingInfo={props.userContact} existingInterest={props.fieldOfInterest} existingTitle={props.projName} />  
      </CardBody>
    </Card>
  );
}