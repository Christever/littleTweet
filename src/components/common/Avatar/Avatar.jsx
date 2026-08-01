import { Avatar } from "primereact/avatar";

export default function AvatarUser({ pseudo, avatarUrl }) {
  const initials = pseudo ? pseudo.slice(0, 2).toUpperCase() : "??";

  return (
    <>
      <Avatar
        shape="circle"
        label={!avatarUrl ? initials : null}
        image={avatarUrl}
        className="bg-teal-600 text-white"
      />
    </>
  );
}
