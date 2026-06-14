import React, { useState } from "react";
import { SelectParticipantsModal } from "../SelectParticipantsModal/SelectParticipantsModal"; 
import { ConfirmGroupModal } from "../ConfirmGroupModal/ConfirmGroupModal"; 

interface ICreateGroupModalsProps {
    visible: boolean;
    onClose: () => void;
}

export function CreateGroupModals({ visible, onClose }: ICreateGroupModalsProps) {
    const [creationStep, setCreationStep] = useState<1 | 2>(1);
    const [groupName, setGroupName] = useState<string>("");
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [groupAvatarUri, setGroupAvatarUri] = useState<string | null>(null);

    const handleToggleSelectFriend = (userId: number) => {
        setSelectedUserIds((previousIds) =>
            previousIds.includes(userId)
                ? previousIds.filter((id) => id !== userId)
                : [...previousIds, userId]
        );
    };

    const handleRemoveParticipant = (userId: number) => {
        setSelectedUserIds((previousIds) => previousIds.filter((id) => id !== userId));
    };

    const handleCloseModals = () => {
        setCreationStep(1);
        setGroupName("");
        setSelectedUserIds([]);
        setGroupAvatarUri(null);
        onClose();
    };

    return (
        <>
            <SelectParticipantsModal
                visible={visible && creationStep === 1}
                onClose={handleCloseModals}
                selectedUserIds={selectedUserIds}
                onToggleSelectFriend={handleToggleSelectFriend}
                onNextStep={() => setCreationStep(2)}
            />

            <ConfirmGroupModal
                mode="create"
                visible={visible && creationStep === 2}
                onClose={handleCloseModals}
                onBackStep={() => setCreationStep(1)}
                groupName={groupName}
                setGroupName={setGroupName}
                selectedUserIds={selectedUserIds}
                onRemoveParticipant={handleRemoveParticipant}
                avatarUri={groupAvatarUri}
                onChangeAvatar={setGroupAvatarUri}
            />
        </>
    );
}