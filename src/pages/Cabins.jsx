import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getAllCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(()=>{
    getAllCabins().then(data => console.log(data))
  },[])
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
