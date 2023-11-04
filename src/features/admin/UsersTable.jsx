import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from '../../ui/Spinner'
import ServerError from '../../ui/ServerError'
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

import { PAGE_SIZE } from "../../utils/constants";
import useUsers from "./useUsers";
import UserRow from "./UserRow";

function UsersTable() {
  const { isLoading, users = [], isError } = useUsers()
  const [searchParams] = useSearchParams()
  const sortBy = searchParams.get('sortBy') || 'name-asc'
  const [field, value] = sortBy.split("-")

  const page = searchParams.get('page') || 1

  const slicedUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if(field === "name") slicedUsers.sort((a, b) => a.name.localeCompare(b.name));
  value === "asc" ? users : slicedUsers.reverse()

  if (isLoading) return <Spinner />
  if (isError) return <ServerError />

  return (
    <Menus>
      <Table columns="0.5fr 1.5fr 4fr 0.8fr 3.2rem">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={slicedUsers}
          render={(user) => (
            <UserRow key={user._id} user={user} />
          )}
        />
        <Table.Footer>
          <Pagination count={users.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UsersTable;
