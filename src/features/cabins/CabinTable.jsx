import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import ServerError from "../../ui/ServerError";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const CabinTable = () => {
  const { isLoading, cabins = [], isError } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("filter") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);


  const sortBy = searchParams.get('sortBy') || 'name-asc'

  const [field , direction ] = sortBy.split("-")
  switch (field) {
    case "name":
      filteredCabins.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "regularPrice" :
      filteredCabins.sort((a,b) => a.regularPrice - b.regularPrice)
      break;
    case "maxCapacity":
      filteredCabins.sort((a,b) => a.maxCapacity - b.maxCapacity)
      break
    default:
      break;
  }

  direction === "asc" ? filteredCabins : filteredCabins.reverse()

  if (isError) return <ServerError />;
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin._id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
};

export default CabinTable;
