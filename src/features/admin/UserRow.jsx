import styled from "styled-components";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import { HiLockClosed, HiTrash, HiUser } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ConfirmModal from "../../ui/ConfirmModal";
import useDeleteUser from "./useDeleteUser";
import useUpdateRole from "./useUpdateRole";

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Img = styled.img`
  display: block;
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserRow({ user }) {
    const {
        _id: userId,
        name,
        email,
        isAdmin,
        profilePic
    } = user

    const { status: deleteStatus, deleteUser } = useDeleteUser()
    const { status: updateStatus, updateRole } = useUpdateRole()

    const statusToTagName = {
        true: "green",
        "false": "silver",
    };

    function makeAdmin(onCloseModal) {
        updateRole({ id: userId, isAdmin: true }, {
            onSettled: () => {
                onCloseModal?.();
            },
        })
    }
    function removeAdmin(onCloseModal) {
        updateRole({ id: userId, isAdmin: false }, {
            onSettled: () => {
                onCloseModal?.();
            },
        })
    }

    function onDeleteUser(onCloseModal){
        deleteUser(userId , {
            onSettled : onCloseModal
        })
    }

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
                                Make Admin
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
                            onConfirm={onDeleteUser}
                            disabled={deleteStatus === "pending"}
                        ></ConfirmDelete>
                    </Modal.Window>
                    <Modal.Window name={"add-admin"}>
                        <ConfirmModal heading={"Add Admin"}
                            subHeading={"Make this user a admin ?"}
                            onConfirm={makeAdmin}
                            disabled={updateStatus === "pending"}
                            type="primary"
                            buttonText={"Add"} />
                    </Modal.Window>
                    <Modal.Window name={"remove-admin"}>
                        <ConfirmModal heading={"Remove Admin"}
                            subHeading={"Remove admin role from this user ?"}
                            onConfirm={removeAdmin}
                            disabled={updateStatus === "pending"}
                            type="danger"
                            buttonText={"Remove"} />
                    </Modal.Window>
                </Menus.Menu>
            </Modal>
        </Table.Row>
    );
}

export default UserRow;
