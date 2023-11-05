import Heading from "../ui/Heading";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm"

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>
        <UpdateUserDataForm/>

      {/* <Row>
        <Heading as="h4">Update user data</Heading>
      </Row> */}

      {/* <Row>
        <Heading as="h4">Update password</Heading>
        <UpdatePasswordForm/>
      </Row> */}
    </>
  );
}

export default Account;
