import { useEffect, useState} from "react";


import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  // useEffect(function(){
  //   getCabins().then((data)=>console.log(data))
  // },[])
  const [showForm,setShowForm]=useState(false)
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
    </Row>
    <Row type="horizontal">
      <CabinTable />
    </Row>
      <Button onClick={()=>setShowForm(!showForm)}>Open Form</Button>
    
    {
      showForm && <CreateCabinForm/>
    }
    </>
    
  );
}

export default Cabins;
