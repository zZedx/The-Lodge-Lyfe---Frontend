import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField={"filter"}
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
        defaultActive="all"
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Name (A-Z)" },
          { value: "name-desc", label: "Name (Z-A)" },
          { value: "regularPrice-asc", label: "Price (low-high)" },
          { value: "regularPrice-desc", label: "Price (high-low)" },
          { value: "maxCapacity-asc", label: "Capacity (low-high)" },
          { value: "maxCapacity-desc", label: "Capacity (high-low)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
