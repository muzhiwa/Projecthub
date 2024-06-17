import React from "react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";


export default function NewButton(props) {
  return (
    <Link to={props.path}>
      <Button background="#ccc">{props.text}</Button>
    </Link>
  );
}
