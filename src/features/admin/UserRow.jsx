import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import { HiLockClosed, HiTrash, HiUser } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ConfirmModal from "../../ui/ConfirmModal";

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Img = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
`

function UserRow({ user }) {
    const {
        _id: userId,
        name,
        email,
        isAdmin,
        profilePic
    } = user

    const statusToTagName = {
        true: "green",
        "false": "silver",
    };

    console.log(isAdmin)

    return (
        <Table.Row>
            <Img src={profilePic} alt="" />
            <Name>{name}</Name>
            <p>{email}</p>
            <Tag type={statusToTagName[`${isAdmin}`]}>{isAdmin ? "Admin" : "User"}</Tag>
            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={userId} />
                    <Menus.List id={userId}>
                        {!isAdmin && <Modal.Open opens={"add-admin"}>
                            <Menus.Button icon={<HiLockClosed />}>
                                Add Admin
                            </Menus.Button>
                        </Modal.Open>}
                        {isAdmin && <Modal.Open opens={"remove-admin"}>
                            <Menus.Button icon={<HiUser />}>
                                Remove Admin
                            </Menus.Button>
                        </Modal.Open>}
                        <Modal.Open opens={"delete"}>
                            <Menus.Button icon={<HiTrash />}>
                                Delete User
                            </Menus.Button>
                        </Modal.Open>
                    </Menus.List>
                    <Modal.Window name={"delete"}>
                        <ConfirmDelete
                            resourceName={"user"}
                            onConfirm={() => { }}
                            disabled={true}
                        ></ConfirmDelete>
                    </Modal.Window>
                    <Modal.Window name={"add-admin"}>
                        <ConfirmModal heading={"Add Admin"}
                            subHeading={"Make this user a admin ?"}
                            onConfirm={() => { }}
                            disabled={true}
                            type="primary" 
                            buttonText={"Add"}/>
                    </Modal.Window>
                    <Modal.Window name={"remove-admin"}>
                        <ConfirmModal heading={"Remove Admin"}
                            subHeading={"Remove admin role from this user ?"}
                            onConfirm={() => { }}
                            disabled={true}
                            type="danger" 
                            buttonText={"Remove"}/>
                    </Modal.Window>
                </Menus.Menu>
            </Modal>
        </Table.Row>
    );
}

export default UserRow;
