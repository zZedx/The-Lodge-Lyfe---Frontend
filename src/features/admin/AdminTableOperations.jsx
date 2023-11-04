import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function AdminTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="users"
        options={[
          { value: "all", label: "All" },
          { value: "isAdmin", label: "Admin" },
          { value: "isNotAdmin", label: "Not Admin" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Name (A - Z)" },
          { value: "name-desc", label: "Name (Z - A)" },
        ]}
      />
    </TableOperations>
  );
}

export default AdminTableOperations;
