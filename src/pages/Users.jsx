import AdminTableOperations from "../features/admin/AdminTableOperations";
import UsersTable from "../features/admin/UsersTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function NewUsers() {
  return <>
    <Row type="horizontal">
      <Heading as="h1">All Users</Heading>
      <AdminTableOperations />
    </Row>
    <UsersTable />
  </>
}

export default NewUsers;
